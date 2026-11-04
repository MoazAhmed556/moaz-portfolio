"use client";

import { useEffect, useRef } from "react";
import { startLivingArchitecture } from "@/components/photography/living-architecture-engine";

/**
 * The animated architectural background of Behind the Lens (canvas), with the warm
 * sunlight that rises as the chapter ends. The drawing itself lives in
 * living-architecture-engine.ts; this component only mounts and cleans it up.
 */
export function LivingArchitecture() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = canvas?.closest("section");
    if (!canvas || !section) return;
    return startLivingArchitecture(canvas, section, section.querySelector<HTMLElement>(".lens-head"));
  }, []);

  return (
    <div className="lens-bg" aria-hidden="true">
      <canvas ref={canvasRef} />
      <div className="lens-sun" />
    </div>
  );
}
