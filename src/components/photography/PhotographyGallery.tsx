"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { PhotographyItem } from "@/components/photography/PhotographyItem";
import { PhotographyLightbox, type LightboxHandle } from "@/components/photography/PhotographyLightbox";
import { onScrollFrame, requestScrollFrame } from "@/lib/scroll-engine";
import { clamp, cx, pad, prefersReducedMotion } from "@/lib/utils";
import type { Photo, PhotoCollection } from "@/types";

const STRIP_QUERY = "(max-width: 900px)";

/**
 * The compact photography exhibition: filter buttons, then one collection per row
 * (a swipeable filmstrip on phones and portrait tablets), and the lightbox.
 * `head` is the chapter title block, rendered on the server.
 */
export function PhotographyGallery({ head, collections, photos }: { head: ReactNode; collections: PhotoCollection[]; photos: Photo[] }) {
  const [filter, setFilter] = useState<string>("all");
  const [stripPos, setStripPos] = useState<Record<string, number>>({});
  const wrapRef = useRef<HTMLDivElement>(null);
  const lightbox = useRef<LightboxHandle>(null);

  // gentle parallax on desktop: each photograph floats at its own depth
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const strip = window.matchMedia(STRIP_QUERY);
    return onScrollFrame(({ vh }) => {
      if (prefersReducedMotion() || strip.matches) return;
      wrap.querySelectorAll<HTMLElement>(".ph").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        el.style.setProperty("--pp", clamp((r.top + r.height / 2 - vh / 2) / vh, -1, 1).toFixed(3));
      });
    });
  }, []);

  const visible = photos.filter((p) => filter === "all" || p.collection === filter);
  const collectionName = (id: string) => collections.find((c) => c.id === id)?.name ?? "";

  function choose(next: string) {
    setFilter(next);
    // after React has applied the filter, bring the first visible collection into view
    requestAnimationFrame(() => {
      const first = wrapRef.current?.querySelector<HTMLElement>(".lc:not(.hide)");
      if (first && first.getBoundingClientRect().top < 0) {
        first.scrollIntoView({ behavior: prefersReducedMotion() ? "instant" : "smooth", block: "start" });
      }
      requestScrollFrame();
    });
  }

  function onStripScroll(collectionId: string, wall: HTMLElement) {
    let idx = 0;
    Array.from(wall.children).forEach((it, i) => {
      if ((it as HTMLElement).offsetLeft - wall.scrollLeft < wall.clientWidth * 0.5) idx = i;
    });
    setStripPos((s) => (s[collectionId] === idx ? s : { ...s, [collectionId]: idx }));
  }

  return (
    <>
      <div className="wrap lens-head">
        {head}
        <div className="lens-filters" role="group" aria-label="Filter the collection" data-reveal="frame">
          <button type="button" className="lf" aria-pressed={filter === "all"} onClick={() => choose("all")}>
            All <span>{photos.length}</span>
          </button>
          {collections.map((c) => (
            <button key={c.id} type="button" className="lf" aria-pressed={filter === c.id} onClick={() => choose(c.id)}>
              {c.name} <span>{photos.filter((p) => p.collection === c.id).length}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="lens-collections" ref={wrapRef}>
        {collections.map((c) => {
          const list = photos.filter((p) => p.collection === c.id);
          return (
            <section key={c.id} className={cx("lc", filter !== "all" && filter !== c.id && "hide")} data-col={c.id} aria-labelledby={`lc-${c.id}`}>
              <div className="wrap">
                <header className="lc-head">
                  <span className="lc-num" aria-hidden="true">
                    {c.numeral}
                  </span>
                  <div>
                    <h3 className="lc-name" id={`lc-${c.id}`}>
                      {c.name}
                    </h3>
                    <p className="lc-line">{c.line}</p>
                  </div>
                  <p className="lc-count">{pad(list.length)} photographs</p>
                </header>
                <div className="lc-wall" onScroll={(e) => onStripScroll(c.id, e.currentTarget)}>
                  {list.map((photo) => {
                    const number = photos.indexOf(photo) + 1;
                    return (
                      <PhotographyItem
                        key={photo.id}
                        photo={photo}
                        number={number}
                        onOpen={(el) => lightbox.current?.open(visible, visible.indexOf(photo), el)}
                      />
                    );
                  })}
                </div>
                <p className="lc-swipe" aria-hidden="true">
                  <span>
                    <b>{pad((stripPos[c.id] ?? 0) + 1)}</b> / {pad(list.length)}
                  </span>
                  <span>Swipe to explore →</span>
                </p>
              </div>
            </section>
          );
        })}
      </div>

      <PhotographyLightbox ref={lightbox} collectionName={collectionName} />
    </>
  );
}
