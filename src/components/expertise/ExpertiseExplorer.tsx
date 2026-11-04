"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { useProjectViewer } from "@/components/projects/ProjectViewerContext";
import { Icon } from "@/components/ui/Icon";
import { useMediaQuery, usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { cx, hasFinePointer, pad } from "@/lib/utils";
import type { SkillCategory, SkillItem } from "@/types";

interface Props {
  categories: SkillCategory[];
  projectNames: Record<string, string>;
}

/**
 * Tabs → skill list → evidence plate. On desktop, hovering a skill previews it;
 * on phones the plate opens directly under the chosen skill, like an accordion.
 */
export function ExpertiseExplorer({ categories, projectNames }: Props) {
  const [cat, setCat] = useState(0);
  const [item, setItem] = useState(0);
  // the plate shows `shown`; while it differs from `item` the plate fades (".swap")
  const [shown, setShown] = useState(0);
  const mobile = useMediaQuery("(max-width: 760px)");
  const reduced = usePrefersReducedMotion();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const { openProject } = useProjectViewer();

  useEffect(() => {
    if (shown === item) return;
    const t = window.setTimeout(() => setShown(item), reduced ? 0 : 200);
    return () => clearTimeout(t);
  }, [item, shown, reduced]);

  const category = categories[cat];

  function selectCategory(i: number, focus = false) {
    setCat(i);
    setItem(0);
    setShown(0);
    if (focus) tabRefs.current[i]?.focus();
  }

  function onTabKey(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const step = e.key === "ArrowRight" ? 1 : -1;
    selectCategory((cat + step + categories.length) % categories.length, true);
  }

  const plate = (
    <Plate swapping={shown !== item} skill={category.items[shown]} projectNames={projectNames} onOpenProject={openProject} />
  );

  return (
    <>
      <div className="xp-tabs" role="tablist" aria-label="Expertise categories" onKeyDown={onTabKey}>
        {categories.map((c, i) => (
          <button
            key={c.id}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            type="button"
            className="xp-tab"
            role="tab"
            id={`xpTab${i}`}
            aria-controls="xpPanel"
            aria-selected={i === cat}
            tabIndex={i === cat ? 0 : -1}
            onClick={() => selectCategory(i)}
          >
            <b>{pad(i + 1)}</b>
            {c.label}
          </button>
        ))}
      </div>

      <div className="xp-body" id="xpPanel" role="tabpanel" aria-labelledby={`xpTab${cat}`}>
        <p className={cx("xp-intro", category.learning && "learning")}>{category.intro}</p>
        <ol className="xp-list">
          {category.items.map((it, i) => (
            <li key={it.code}>
              <button
                type="button"
                className="xp-item"
                aria-current={i === item}
                aria-expanded={i === item}
                onClick={() => setItem(i)}
                onPointerEnter={() => {
                  if (!mobile && hasFinePointer()) setItem(i);
                }}
              >
                <span className="xc">{it.code}</span>
                <span>{it.name}</span>
                <span className="xa" aria-hidden="true" />
              </button>
              {mobile && i === item ? plate : null}
            </li>
          ))}
        </ol>
        {!mobile ? plate : null}
      </div>
    </>
  );
}

function Plate({
  skill,
  swapping,
  projectNames,
  onOpenProject,
}: {
  skill: SkillItem;
  swapping: boolean;
  projectNames: Record<string, string>;
  onOpenProject: (id: string, from?: HTMLElement | null) => void;
}): ReactNode {
  return (
    <div className={cx("xp-plate", swapping && "swap")} aria-live="polite">
      <p className="xp-code">{skill.code}</p>
      <h3 className="xp-name">{skill.name}</h3>
      <p className="xp-ev">{skill.evidence}</p>
      <p className="xp-src">{skill.source}</p>
      {skill.projects?.length ? (
        <div className="xp-links">
          {skill.projects.map((id) => (
            <button key={id} type="button" onClick={(e) => onOpenProject(id, e.currentTarget)}>
              See it in {projectNames[id] ?? id} <Icon name="arrow" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
