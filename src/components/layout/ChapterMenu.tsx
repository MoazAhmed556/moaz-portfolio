"use client";

import type { Ref } from "react";
import { Dialog, type DialogHandle } from "@/components/ui/Dialog";
import { Icon } from "@/components/ui/Icon";
import { chapters, menuLinks } from "@/data/navigation";
import { useActiveChapter } from "@/hooks/useActiveChapter";
import { pad } from "@/lib/utils";

/** Full-screen list of the eight chapters, opened from the "Chapters" button. */
export function ChapterMenu({ ref }: { ref: Ref<DialogHandle> }) {
  const active = useActiveChapter();

  return (
    <Dialog ref={ref} className="menu-dlg" aria-label="Chapters">
      <div className="menu-inner">
        <div className="menu-top">
          <p className="ch-label">The Journey</p>
          <button type="button" className="round" data-close aria-label="Close chapters">
            <Icon name="close" />
          </button>
        </div>
        <ol className="menu-list">
          {chapters.map((c) => (
            <li key={c.id}>
              <a href={`#${c.id}`} data-close className={c.id === active ? "active" : undefined} aria-current={c.id === active ? "location" : undefined}>
                <span className="ml-n">{pad(c.number)}</span>
                <span className="ml-t">{c.title}</span>
                <span className="ml-d">{c.blurb}</span>
              </a>
            </li>
          ))}
        </ol>
        <div className="menu-foot">
          {menuLinks.map((l) => (
            <a key={l.chapter} className={l.primary ? "btn btn-ink" : "btn btn-line"} href={`#${l.chapter}`} data-close>
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </Dialog>
  );
}
