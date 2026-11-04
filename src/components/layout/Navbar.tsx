"use client";

import { useEffect, useRef, useState } from "react";
import { ChapterMenu } from "@/components/layout/ChapterMenu";
import { JourneyProgress } from "@/components/layout/JourneyProgress";
import type { DialogHandle } from "@/components/ui/Dialog";
import { chapterById, navShortcuts } from "@/data/navigation";
import { site } from "@/data/site";
import { useActiveChapter } from "@/hooks/useActiveChapter";
import { onScrollFrame } from "@/lib/scroll-engine";
import { cx, pad } from "@/lib/utils";

/** The persistent top bar: wordmark, current chapter, shortcuts and the Chapters menu. */
export function Navbar() {
  const active = useActiveChapter();
  const [shown, setShown] = useState(active);
  const [solid, setSolid] = useState(false);
  const menu = useRef<DialogHandle>(null);

  // the chapter label fades out, swaps, and fades back in
  useEffect(() => {
    if (shown === active) return;
    const t = window.setTimeout(() => setShown(active), 220);
    return () => clearTimeout(t);
  }, [active, shown]);

  useEffect(() => onScrollFrame(({ y }) => setSolid(y > 24)), []);

  const current = chapterById(shown);

  return (
    <>
      <header className={cx("nav", solid && "solid")}>
        <a className="wordmark" href="#beginning" aria-label={`${site.name} — back to the beginning`}>
          <span className="wm-mark" aria-hidden="true">
            <svg viewBox="0 0 64 64">
              <path d="M14 46V18l18 20 18-20v28" />
            </svg>
          </span>
          <span className="wm-name">{site.name}</span>
        </a>
        <p className={cx("nav-chapter", shown !== active && "swap")} aria-hidden="true">
          <span className="nav-num">{pad(current.number)}</span>
          <i />
          <span>{current.title}</span>
        </p>
        <nav className="nav-links" aria-label="Shortcuts">
          {navShortcuts.map((s) => (
            <a key={s.chapter} href={`#${s.chapter}`} className={cx("nav-short", active === s.chapter && "active")}>
              {s.label}
            </a>
          ))}
          <button
            type="button"
            className="nav-menu"
            aria-haspopup="dialog"
            onClick={(e) => menu.current?.open(e.currentTarget)}
          >
            <span className="nm-lines" aria-hidden="true">
              <i />
              <i />
            </span>
            <span className="nm-text">Chapters</span>
          </button>
        </nav>
        <JourneyProgress />
      </header>
      <ChapterMenu ref={menu} />
    </>
  );
}
