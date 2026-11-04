import type { Reveal } from "@/components/animations/reveal";
import { pad } from "@/lib/utils";

/** "02 — THE VISION" style label used at the top of each chapter. */
export function ChapterLabel({ number, text, reveal, className }: { number: number; text: string; reveal?: Reveal; className?: string }) {
  return (
    <p className={className ? `ch-label ${className}` : "ch-label"} data-reveal={reveal}>
      <span>{pad(number)}</span> {text}
    </p>
  );
}

/** A title whose last phrase is set in copper italics. */
export function Emphasis({ text, emphasis }: { text: string; emphasis?: string }) {
  return (
    <>
      {text}
      {emphasis ? <em>{emphasis}</em> : null}
    </>
  );
}
