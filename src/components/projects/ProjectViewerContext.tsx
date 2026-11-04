"use client";

import { createContext, useContext, useMemo, useRef, type ReactNode } from "react";

/**
 * Lets any part of the page open the project viewer — the exhibition, the project
 * index, or a "See it in …" button in the Expertise chapter — and lets the viewer
 * send the visitor back to the matching room in the exhibition.
 */
type Opener = (idOrIndex: string | number, from?: HTMLElement | null) => void;
type RoomNavigator = (index: number, focusEnter?: boolean) => void;

interface ProjectViewerApi {
  openProject: Opener;
  goToRoom: RoomNavigator;
  /** Called by <ProjectViewer/> once; returns an unregister function. */
  registerViewer: (open: Opener) => () => void;
  /** Called by <ProjectGallery/> once; returns an unregister function. */
  registerGallery: (go: RoomNavigator) => () => void;
}

const Ctx = createContext<ProjectViewerApi | null>(null);

export function ProjectViewerProvider({ children }: { children: ReactNode }) {
  const viewer = useRef<Opener | null>(null);
  const gallery = useRef<RoomNavigator | null>(null);

  const api = useMemo<ProjectViewerApi>(
    () => ({
      openProject: (idOrIndex, from) => viewer.current?.(idOrIndex, from),
      goToRoom: (index, focusEnter) => gallery.current?.(index, focusEnter),
      registerViewer(open) {
        viewer.current = open;
        return () => {
          if (viewer.current === open) viewer.current = null;
        };
      },
      registerGallery(go) {
        gallery.current = go;
        return () => {
          if (gallery.current === go) gallery.current = null;
        };
      },
    }),
    [],
  );

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useProjectViewer() {
  const api = useContext(Ctx);
  if (!api) throw new Error("useProjectViewer must be used inside <ProjectViewerProvider>");
  return api;
}
