"use client";

import Image from "next/image";
import { useRef } from "react";
import { useProjectViewer } from "@/components/projects/ProjectViewerContext";
import { Dialog, type DialogHandle } from "@/components/ui/Dialog";
import { Icon } from "@/components/ui/Icon";
import { pad } from "@/lib/utils";
import type { Project } from "@/types";

/** "Project index · 01–08" button and its side panel listing every project. */
export function ProjectIndex({ projects, label }: { projects: Project[]; label: string }) {
  const dialog = useRef<DialogHandle>(null);
  const button = useRef<HTMLButtonElement>(null);
  const { openProject } = useProjectViewer();

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
          <ol className="index-list">
            {projects.map((p, i) => (
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
