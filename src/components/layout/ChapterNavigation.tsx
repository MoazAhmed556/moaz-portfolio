"use client";

import { chapters } from "@/data/navigation";
import { useActiveChapter } from "@/hooks/useActiveChapter";
import { pad } from "@/lib/utils";

/** The journey rail on the right edge (desktop): one dot per chapter, filled up to --jp. */
export function ChapterNavigation() {
  const active = useActiveChapter();
  return (
    <nav className="rail" aria-label="Journey progress">
      <span className="rail-track" aria-hidden="true">
        <span />
      </span>
      <ol>
        {chapters.map((c) => (
          <li key={c.id}>
            <a href={`#${c.id}`} className={c.id === active ? "active" : undefined} aria-current={c.id === active ? "step" : undefined}>
              <span className="rail-n">{pad(c.number)}</span>
              <span className="rail-name">{c.title}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
