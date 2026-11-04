"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useProjectViewer } from "@/components/projects/ProjectViewerContext";
import { Dialog, type DialogHandle } from "@/components/ui/Dialog";
import { Icon } from "@/components/ui/Icon";
import { projectFilters } from "@/data/projects";
import { pad } from "@/lib/utils";
import type { Project } from "@/types";

/** "Project index · 01–NN" button and its side panel listing every project, with category filters. */
export function ProjectIndex({ projects, label }: { projects: Project[]; label: string }) {
  const dialog = useRef<DialogHandle>(null);
  const button = useRef<HTMLButtonElement>(null);
  const [filter, setFilter] = useState("all");
  const { openProject } = useProjectViewer();

  const active = projectFilters.find((f) => f.id === filter);
  // keep each project's exhibition number, so "07" in the index is "07" in the rooms
  const listed = projects.map((p, i) => ({ p, i })).filter(({ p }) => !active || active.projects.includes(p.id));

  return (
    <>
      <button
        ref={button}
        id="indexOpen"
        type="button"
        className="btn btn-line"
        aria-haspopup="dialog"
        data-magnetic
        onClick={(e) => dialog.current?.open(e.currentTarget)}
      >
        {label}
      </button>

      <Dialog ref={dialog} className="index-dlg" aria-labelledby="indexTitle">
        <div className="index-inner">
          <div className="menu-top">
            <h2 className="index-title" id="indexTitle">
              Project index
            </h2>
            <button type="button" className="round" data-close aria-label="Close project index">
              <Icon name="close" />
            </button>
          </div>
          <div className="index-filters" role="group" aria-label="Filter projects by category">
            {[{ id: "all", label: "All", count: projects.length }, ...projectFilters.map((f) => ({ id: f.id, label: f.label, count: projects.filter((p) => f.projects.includes(p.id)).length }))].map((f) => (
              <button key={f.id} type="button" aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>
                {f.label}
                <span>{f.count}</span>
              </button>
            ))}
          </div>
          <p className="sr-only" aria-live="polite">
            {listed.length} {listed.length === 1 ? "project" : "projects"} shown
          </p>
          <ol className="index-list">
            {listed.map(({ p, i }) => (
              <li key={p.id}>
                <button
                  type="button"
                  onClick={() => dialog.current?.close({ restoreFocus: false, after: () => openProject(i, button.current) })}
                >
                  <Image src={p.screenshot} alt="" width={88} height={55} sizes="88px" />
                  <span>
                    <span className="il-name">{p.name}</span>
                    <span className="il-ind">{p.industry}</span>
                  </span>
                  <span className="il-n">{pad(i + 1)}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </Dialog>
    </>
  );
}
