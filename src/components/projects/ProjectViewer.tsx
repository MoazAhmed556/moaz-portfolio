"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ProjectDetails } from "@/components/projects/ProjectDetails";
import { ProjectNavigation } from "@/components/projects/ProjectNavigation";
import { ProjectPreview, type ProjectPreviewHandle } from "@/components/projects/ProjectPreview";
import { useProjectViewer } from "@/components/projects/ProjectViewerContext";
import { Dialog, type DialogHandle } from "@/components/ui/Dialog";
import type { Project } from "@/types";

const HASH = /^#project\/([\w-]+)/;

/**
 * The full-screen project viewer. Opened from the exhibition, the project index,
 * the Expertise chapter, or a direct link such as /#project/pawland.
 * The live iframe exists only while the viewer is open.
 */
export function ProjectViewer({ projects }: { projects: Project[] }) {
  const dialog = useRef<DialogHandle>(null);
  const preview = useRef<ProjectPreviewHandle>(null);
  const backRef = useRef<HTMLButtonElement>(null);
  const current = useRef(0);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [live, setLive] = useState(false);
  const [jumpOpen, setJumpOpen] = useState(false);
  const { registerViewer, goToRoom } = useProjectViewer();

  const count = projects.length;
  const project = projects[index];
  const previous = projects[(index - 1 + count) % count];
  const next = projects[(index + 1) % count];

  const show = useCallback(
    (i: number, dir: number) => {
      const n = (i + count) % count;
      current.current = n;
      setDirection(dir);
      setIndex(n);
      window.history.replaceState(null, "", `#project/${projects[n].id}`);
    },
    [count, projects],
  );

  const step = useCallback((dir: 1 | -1) => show(current.current + dir, dir), [show]);

  const open = useCallback(
    (idOrIndex: string | number, from?: HTMLElement | null) => {
      const i = typeof idOrIndex === "number" ? idOrIndex : projects.findIndex((p) => p.id === idOrIndex);
      if (i < 0) return;
      if (dialog.current?.isOpen()) {
        if (i !== current.current) show(i, i > current.current ? 1 : -1);
        return;
      }
      show(i, 0);
      setLive(true);
      dialog.current?.open(from);
      requestAnimationFrame(() => backRef.current?.focus({ preventScroll: true }));
    },
    [projects, show],
  );

  const close = useCallback(
    ({ toRoom = false }: { toRoom?: boolean } = {}) => {
      if (!dialog.current?.isOpen()) return;
      preview.current?.exitFullscreen();
      setJumpOpen(false);
      const i = current.current;
      dialog.current.close({
        restoreFocus: !toRoom,
        after: () => {
          setLive(false); // unloads the iframe
          window.history.replaceState(null, "", "#projects");
          if (toRoom) goToRoom(i, true);
        },
      });
    },
    [goToRoom],
  );

  useEffect(() => registerViewer(open), [registerViewer, open]);

  // direct links: /#project/<id>
  useEffect(() => {
    const fromHash = () => {
      const m = window.location.hash.match(HASH);
      if (!m) return;
      const i = projects.findIndex((p) => p.id === m[1]);
      if (i < 0) return;
      document.getElementById("projects")?.scrollIntoView({ behavior: "instant" });
      open(i, document.getElementById("indexOpen"));
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [projects, open]);

  // ← / → switch projects; a click outside the jump list closes it
  useEffect(() => {
    const el = dialog.current?.element();
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (jumpOpen || (e.target as Element).closest("input, textarea, select")) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        step(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        step(-1);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (jumpOpen && !(e.target as Element).closest(".v-jump")) setJumpOpen(false);
    };
    el.addEventListener("keydown", onKey);
    el.addEventListener("click", onClick);
    return () => {
      el.removeEventListener("keydown", onKey);
      el.removeEventListener("click", onClick);
    };
  }, [jumpOpen, step]);

  function onEscape() {
    if (jumpOpen) {
      setJumpOpen(false);
      return true;
    }
    if (preview.current?.exitFullscreen()) return true;
    close();
    return true;
  }

  return (
    <Dialog ref={dialog} className="viewer" aria-labelledby="vTitle" onEscape={onEscape}>
      <ProjectNavigation
        projects={projects}
        index={index}
        jumpOpen={jumpOpen}
        onJumpOpenChange={setJumpOpen}
        onBack={() => close({ toRoom: true })}
        onSelect={(i) => show(i, i > current.current ? 1 : -1)}
        onPrevious={() => step(-1)}
        onNext={() => step(1)}
        backRef={backRef}
      />
      <div className="v-body">
        <div className="v-stage">{live ? <ProjectPreview ref={preview} project={project} direction={direction} /> : null}</div>
        <ProjectDetails project={project} previous={previous} next={next} onPrevious={() => step(-1)} onNext={() => step(1)} />
      </div>
    </Dialog>
  );
}
