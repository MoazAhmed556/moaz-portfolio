"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useProjectViewer } from "@/components/projects/ProjectViewerContext";
import { Icon } from "@/components/ui/Icon";
import { useMediaQuery, usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { onScrollFrame, requestScrollFrame } from "@/lib/scroll-engine";
import { clamp, cssVars, pad, prefersReducedMotion, scrollToY } from "@/lib/utils";
import type { Project } from "@/types";

/** Wide screens get the pinned, sideways exhibition. Must match the media query in styles/chapters/projects.css. */
const PIN_QUERY = "(min-width: 1024px) and (min-height: 560px)";

let hashRealigned = false;
/**
 * Direct links such as /#lens: the browser scrolls to the chapter before the pinned
 * exhibition gets its full height, which then pushes later chapters down. Once the
 * height is set, scroll to the linked chapter again (only once, right after page load).
 */
function realignHashTarget(exhibit: HTMLElement) {
  if (hashRealigned) return;
  hashRealigned = true;
  const id = decodeURIComponent(window.location.hash.slice(1));
  if (!id || id.startsWith("project/") || performance.now() > 6000) return;
  const target = document.getElementById(id);
  if (target && exhibit.compareDocumentPosition(target) & Node.DOCUMENT_POSITION_FOLLOWING) {
    target.scrollIntoView({ behavior: "instant", block: "start" });
  }
}

/**
 * The exhibition. On wide screens the section is pinned and the rooms travel sideways
 * as you scroll; each room leans in or out with its distance from the centre (--lp, --ad).
 * On tablets and phones the rooms simply stack.
 */
export function ProjectGallery({ projects }: { projects: Project[] }) {
  const exhibitRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const roomRefs = useRef<(HTMLElement | null)[]>([]);
  const enterRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const travel = useRef(0);
  const [active, setActive] = useState(0);
  const wide = useMediaQuery(PIN_QUERY);
  const reduced = usePrefersReducedMotion();
  const pinned = wide && !reduced;
  const { openProject, registerGallery } = useProjectViewer();

  // pinned layout: the section is as tall as the sideways travel, the track follows scroll
  useEffect(() => {
    const exhibit = exhibitRef.current;
    const track = trackRef.current;
    if (!pinned || !exhibit || !track) return;
    const rooms = roomRefs.current.filter((r): r is HTMLElement => !!r);

    // travel = how far the track moves so that the last room ends exactly centred
    const layout = () => {
      const lastRoom = rooms[rooms.length - 1];
      const lastCenter = lastRoom ? lastRoom.offsetLeft + lastRoom.offsetWidth / 2 : 0;
      travel.current = Math.max(0, lastCenter - track.clientWidth / 2);
      exhibit.style.height = `${Math.round(travel.current * 1.05 + window.innerHeight)}px`;
      requestScrollFrame();
    };
    layout();
    realignHashTarget(exhibit);
    // re-measure whenever the track or any room changes size (fonts, styles, window)
    const ro = new ResizeObserver(layout);
    ro.observe(track);
    rooms.forEach((room) => ro.observe(room));
    window.addEventListener("load", layout);

    const stop = onScrollFrame(({ vh }) => {
      const r = exhibit.getBoundingClientRect();
      const p = clamp(-r.top / Math.max(1, r.height - vh));
      track.style.transform = `translate3d(${(-p * travel.current).toFixed(1)}px, 0, 0)`;
      const vw = track.clientWidth;
      const mid = vw / 2;
      let best = 0;
      let bestD = Infinity;
      rooms.forEach((room, i) => {
        const rr = room.getBoundingClientRect();
        const off = clamp((rr.left + rr.width / 2 - mid) / vw, -1.2, 1.2);
        room.style.setProperty("--lp", off.toFixed(3));
        room.style.setProperty("--ad", Math.min(1, Math.abs(off)).toFixed(3));
        if (Math.abs(off) < bestD) {
          bestD = Math.abs(off);
          best = i;
        }
      });
      setActive(best);
    });

    return () => {
      stop();
      ro.disconnect();
      window.removeEventListener("load", layout);
      exhibit.style.height = "";
      track.style.transform = "";
      rooms.forEach((room) => {
        room.style.removeProperty("--lp");
        room.style.removeProperty("--ad");
      });
    };
  }, [pinned]);

  /** Scroll so that room i is centred (pinned) or in view (stacked). */
  const goRoom = useCallback(
    (index: number, focusEnter = false) => {
      const i = clamp(index, 0, projects.length - 1);
      const exhibit = exhibitRef.current;
      const room = roomRefs.current[i];
      if (!exhibit || !room) return;
      if (pinned) {
        const center = room.offsetLeft + room.offsetWidth / 2 - (trackRef.current?.clientWidth ?? window.innerWidth) / 2;
        const p = clamp(center / Math.max(1, travel.current));
        const top = exhibit.getBoundingClientRect().top + window.scrollY;
        scrollToY(top + p * (exhibit.offsetHeight - window.innerHeight));
      } else {
        room.scrollIntoView({ behavior: prefersReducedMotion() ? "instant" : "smooth", block: "center" });
      }
      if (focusEnter) window.setTimeout(() => enterRefs.current[i]?.focus({ preventScroll: true }), 600);
    },
    [pinned, projects.length],
  );

  useEffect(() => registerGallery(goRoom), [registerGallery, goRoom]);

  return (
    <div className="exhibit" ref={exhibitRef} data-progress="pin">
      <div className="exhibit-stage">
        <div className="exhibit-track" ref={trackRef}>
          {projects.map((p, i) => (
            <article
              key={p.id}
              className="rx"
              ref={(el) => {
                roomRefs.current[i] = el;
              }}
              style={cssVars({ "--tint": p.tint, "--accent": p.accent })}
              aria-labelledby={`rxName${i}`}
            >
              <span className="rx-num" aria-hidden="true">
                {pad(i + 1)}
              </span>
              <div className="rx-visual">
                <div className="rx-browser">
                  <div className="rx-bar" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                    <span>{p.previewUrl}</span>
                  </div>
                  <Image src={p.screenshot} alt={`${p.name} — desktop view`} width={790} height={494} sizes="(max-width: 1100px) 92vw, 46vw" />
                </div>
                <div className="rx-phone">
                  <Image src={p.screenshotMobile} alt={`${p.name} — phone view`} width={390} height={844} sizes="(max-width: 760px) 30vw, 14vw" />
                </div>
              </div>
              <div className="rx-info">
                <p className="rx-ind">{p.industry}</p>
                <h3 className="rx-name" id={`rxName${i}`}>
                  {p.name}
                </h3>
                <p className="rx-tag">{p.tagline}</p>
                <ul className="rx-stats">
                  {p.stats.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
                <div className="rx-ctas">
                  <button
                    type="button"
                    className="btn btn-ink"
                    data-magnetic
                    ref={(el) => {
                      enterRefs.current[i] = el;
                    }}
                    onClick={(e) => openProject(i, e.currentTarget)}
                  >
                    Enter the project <Icon name="arrow" />
                  </button>
                  <a className="text-link" href={p.liveUrl ?? p.previewUrl} target="_blank" rel="noopener noreferrer">
                    {p.liveUrl ? "Visit the live site" : "Open on its own"} <Icon name="out" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="exhibit-hud wrap">
          <div className="hud-now" aria-live="polite">
            <b>{pad(active + 1)}</b>
            <span> / {pad(projects.length)}</span>
            <span className="hud-name">{projects[active]?.name}</span>
          </div>
          <div className="hud-steps" role="group" aria-label="Go to project">
            {projects.map((p, i) => (
              <button key={p.id} type="button" aria-label={`${pad(i + 1)} — ${p.name}`} aria-current={i === active} onClick={() => goRoom(i)}>
                {pad(i + 1)}
              </button>
            ))}
          </div>
          <div className="hud-arrows">
            <button type="button" className="round" aria-label="Previous project" onClick={() => goRoom(active - 1)}>
              <Icon name="left" />
            </button>
            <button type="button" className="round" aria-label="Next project" onClick={() => goRoom(active + 1)}>
              <Icon name="right" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
