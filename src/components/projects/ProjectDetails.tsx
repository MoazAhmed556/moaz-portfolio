"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import type { Project } from "@/types";

/** The information panel beside the live preview, with previous / next at the bottom. */
export function ProjectDetails({
  project,
  previous,
  next,
  onPrevious,
  onNext,
}: {
  project: Project;
  previous: Project;
  next: Project;
  onPrevious: () => void;
  onNext: () => void;
}) {
  const panel = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (panel.current) panel.current.scrollTop = 0;
  }, [project.id]);

  const d = reduced ? 0 : 1;

  return (
    <aside className="v-info" ref={panel}>
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0, transition: { opacity: { duration: 0.4 * d }, y: { duration: 0.5 * d, ease: [0.16, 1, 0.3, 1] } } }}
          exit={{ opacity: 0, y: 10, transition: { duration: 0.3 * d } }}
        >
          <p className="v-ind">{project.industry}</p>
          <h2 className="v-title" id="vTitle">
            {project.name}
          </h2>
          <p className="v-tag">{project.tagline}</p>
          <ul className="v-stats">
            {project.stats.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <section className="v-block">
            <h3>Overview</h3>
            <p>{project.description}</p>
          </section>
          <section className="v-block">
            <h3>My role</h3>
            <p>{project.role}</p>
          </section>
          <section className="v-block">
            <h3>Design objectives</h3>
            <ul className="v-list">
              {project.objectives.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          </section>
          <section className="v-block">
            <h3>Key features</h3>
            <ul className="v-list">
              {project.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </section>
          <section className="v-block">
            <h3>Verified technologies</h3>
            <ul className="v-tech">
              {project.tech.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <p className="v-small">Checked against the project&apos;s source code.</p>
          </section>
          <section className="v-block">
            <h3>Palette</h3>
            <ul className="v-pal">
              {project.colors.map((c) => (
                <li key={c}>
                  <span style={{ background: c }} />
                  {c.toUpperCase()}
                </li>
              ))}
            </ul>
          </section>
          <section className="v-block">
            <h3>Preview notes</h3>
            <p>{project.notes}</p>
            <p className="v-small">
              {project.liveUrl
                ? "Also hosted publicly — use “visit the live site” to open it."
                : "Not publicly hosted — this prototype runs from the portfolio. Use “open on its own” for a separate tab."}
            </p>
          </section>
        </motion.div>
      </AnimatePresence>
      <nav className="v-pager" aria-label="Project navigation">
        <button type="button" className="v-page" onClick={onPrevious}>
          <span>Previous</span>
          <b>{previous.name}</b>
        </button>
        <button type="button" className="v-page v-page-next" onClick={onNext}>
          <span>Next</span>
          <b>{next.name}</b>
        </button>
      </nav>
    </aside>
  );
}
