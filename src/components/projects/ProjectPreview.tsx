"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useImperativeHandle, useRef, useState, type Ref } from "react";
import { Icon } from "@/components/ui/Icon";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { cx } from "@/lib/utils";
import type { Project } from "@/types";

type Device = "desktop" | "tablet" | "mobile";

const DEVICES: { id: Device; label: string; icon: "desktop" | "tablet" | "phone" }[] = [
  { id: "desktop", label: "Desktop width", icon: "desktop" },
  { id: "tablet", label: "Tablet width", icon: "tablet" },
  { id: "mobile", label: "Phone width", icon: "phone" },
];

export interface ProjectPreviewHandle {
  /** Leaves full screen if it is on. Returns true when something was closed. */
  exitFullscreen: () => boolean;
}

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const EASE = [0.22, 0.61, 0.36, 1] as const;

/**
 * The live preview: a browser frame around a same-origin <iframe> of the real prototype.
 * Device widths, reload, open in a new tab, and full screen (in-window, plus native
 * full screen where the browser allows it). Only the current project is ever loaded.
 */
export function ProjectPreview({ ref, project, direction }: { ref?: Ref<ProjectPreviewHandle>; project: Project; direction: number }) {
  const browserRef = useRef<HTMLDivElement>(null);
  const [device, setDevice] = useState<Device>("desktop");
  const [cssFull, setCssFull] = useState(false);
  const [nativeFull, setNativeFull] = useState(false);
  const [reloads, setReloads] = useState(0);
  const [loadedKey, setLoadedKey] = useState<string | null>(null);
  const reduced = usePrefersReducedMotion();

  const frameKey = `${project.id}:${reloads}`;
  const loaded = loadedKey === frameKey;
  const isFull = cssFull || nativeFull;

  // if a prototype never fires `load` (slow network), reveal it anyway after 9s
  useEffect(() => {
    const t = window.setTimeout(() => setLoadedKey(frameKey), 9000);
    return () => clearTimeout(t);
  }, [frameKey]);

  useEffect(() => {
    const onChange = () => {
      const on = document.fullscreenElement === browserRef.current;
      setNativeFull(on);
      if (!on) setCssFull(false);
    };
    document.addEventListener("fullscreenchange", onChange);
    return () => {
      document.removeEventListener("fullscreenchange", onChange);
      if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    };
  }, []);

  useImperativeHandle(ref, () => ({
    exitFullscreen() {
      if (!cssFull && !nativeFull) return false;
      if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
      setCssFull(false);
      return true;
    },
  }));

  function toggleFullscreen() {
    if (isFull) {
      if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
      setCssFull(false);
      return;
    }
    setCssFull(true);
    const el = browserRef.current;
    if (el?.requestFullscreen && document.fullscreenEnabled) el.requestFullscreen().catch(() => {});
  }

  const name = project.shortName ?? project.name;
  const openHref = project.liveUrl ?? project.previewUrl;

  return (
    <div ref={browserRef} className={cx("browser", cssFull && "is-full")} data-device={device}>
      <div className="b-bar">
        <span className="b-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="b-url">
          <Icon name="lock" />
          <span>{project.liveUrl ?? project.previewUrl}</span>
        </span>
        <div className="b-tools">
          <div className="b-devices" role="group" aria-label="Preview width">
            {DEVICES.map((d) => (
              <button key={d.id} type="button" aria-pressed={device === d.id} aria-label={d.label} onClick={() => setDevice(d.id)}>
                <Icon name={d.icon} />
              </button>
            ))}
          </div>
          <button type="button" className="b-tool" aria-label="Reload project" onClick={() => setReloads((n) => n + 1)}>
            <Icon name="reload" />
          </button>
          <a
            className="b-tool"
            href={openHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={project.liveUrl ? "Visit the live site" : "Open this project on its own"}
          >
            <Icon name="out" />
          </a>
          <button type="button" className="b-tool" aria-label={isFull ? "Exit full screen" : "Full screen"} onClick={toggleFullscreen}>
            <Icon name={isFull ? "shrink" : "expand"} />
          </button>
        </div>
      </div>

      <div className="b-view">
        <div className="b-screen">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={project.id}
              className="b-slide"
              custom={direction}
              variants={{
                enter: (d: number) => ({ opacity: 0, x: d * 60 }),
                center: { opacity: 1, x: 0, transition: { opacity: { duration: reduced ? 0 : 0.45, ease: EASE }, x: { duration: reduced ? 0 : 0.7, ease: EASE_OUT } } },
                exit: (d: number) => ({ opacity: 0, x: -d * 60, transition: { duration: reduced ? 0 : 0.38, ease: EASE } }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <iframe
                key={frameKey}
                src={project.previewUrl}
                title={`${project.name} — live project`}
                allow={project.allow || undefined}
                onLoad={() => window.setTimeout(() => setLoadedKey(frameKey), 250)}
              />
              <div className={cx("b-load", loaded && "done")}>
                <Image src={project.screenshot} alt="" fill sizes="(max-width: 900px) 100vw, 60vw" />
                <p>
                  <span className="spin" aria-hidden="true" />
                  <span>Opening {name}…</span>
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
