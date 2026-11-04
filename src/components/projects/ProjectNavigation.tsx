"use client";

import { useEffect, useRef, type KeyboardEvent } from "react";
import { Icon } from "@/components/ui/Icon";
import { pad } from "@/lib/utils";
import type { Project } from "@/types";

/** The viewer's top bar: back to the exhibition, "04 / 08", a jump list, previous / next. */
export function ProjectNavigation({
  projects,
  index,
  jumpOpen,
  onJumpOpenChange,
  onBack,
  onSelect,
  onPrevious,
  onNext,
  backRef,
}: {
  projects: Project[];
  index: number;
  jumpOpen: boolean;
  onJumpOpenChange: (open: boolean) => void;
  onBack: () => void;
  onSelect: (index: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  backRef: React.Ref<HTMLButtonElement>;
}) {
  const listRef = useRef<HTMLUListElement>(null);
  const jumpBtn = useRef<HTMLButtonElement>(null);
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  // focus the current project when the list opens
  useEffect(() => {
    if (!jumpOpen) return;
    listRef.current?.querySelector<HTMLButtonElement>('button[aria-current="true"]')?.focus();
  }, [jumpOpen]);

  function onListKey(e: KeyboardEvent<HTMLUListElement>) {
    const items = Array.from(listRef.current?.querySelectorAll("button") ?? []);
    const k = items.indexOf(document.activeElement as HTMLButtonElement);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      items[(k + 1) % items.length]?.focus();
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      items[(k - 1 + items.length) % items.length]?.focus();
    }
  }

  return (
    <div className="v-top">
      <button ref={backRef} type="button" className="v-back" onClick={onBack}>
        <Icon name="left" />
        <span>Back to the exhibition</span>
      </button>
      <p className="v-now">
        <b>{pad(index + 1)}</b>
        <span> / {pad(projects.length)}</span>
      </p>
      <div className="v-ctrl">
        <div className="v-jump">
          <button
            ref={jumpBtn}
            type="button"
            className="v-jump-btn"
            aria-expanded={jumpOpen}
            aria-controls="vJumpList"
            onClick={() => onJumpOpenChange(!jumpOpen)}
          >
            All projects <Icon name="chevron" />
          </button>
          <ul className="v-jump-list" id="vJumpList" ref={listRef} hidden={!jumpOpen} onKeyDown={onListKey}>
            {projects.map((p, i) => (
              <li key={p.id}>
                <button
                  type="button"
                  aria-current={i === index}
                  onClick={() => {
                    onJumpOpenChange(false);
                    jumpBtn.current?.focus();
                    if (i !== index) onSelect(i);
                  }}
                >
                  <span>{pad(i + 1)}</span>
                  {p.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <button type="button" className="round v-arrow" aria-label={`Previous project: ${previous.name}`} onClick={onPrevious}>
          <Icon name="left" />
        </button>
        <button type="button" className="round v-arrow" aria-label={`Next project: ${next.name}`} onClick={onNext}>
          <Icon name="right" />
        </button>
      </div>
    </div>
  );
}
