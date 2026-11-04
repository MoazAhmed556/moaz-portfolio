"use client";

import Image from "next/image";
import { useInView } from "@/hooks/useInView";
import { cssVars, cx, pad } from "@/lib/utils";
import type { Photo } from "@/types";

/** px of parallax travel; each photograph floats at its own depth on desktop. */
const DEPTHS = [24, -16, 34, -10, 20, -26, 12];

/** Gallery widths: a filmstrip card on phones/tablets, about 200–310px on the desktop wall. */
export const GALLERY_SIZES = "(max-width: 900px) 80vw, 340px";

/**
 * One photograph on the wall. It "develops" as it enters the screen: a paper veil
 * lifts while the print warms from grey into colour (CSS in styles/chapters/lens.css).
 */
export function PhotographyItem({ photo, number, onOpen }: { photo: Photo; number: number; onOpen: (el: HTMLButtonElement) => void }) {
  const [ref, inView] = useInView<HTMLButtonElement>(0.15, "0px 120px -5% 120px");
  const { start, span, drop } = photo.layout;

  return (
    <button
      ref={ref}
      type="button"
      className={cx("ph", inView && "in")}
      data-id={photo.id}
      style={cssVars(
        { "--ar": (photo.width / photo.height).toFixed(3), "--depth": `${DEPTHS[(number - 1) % DEPTHS.length]}px` },
        { gridColumn: `${start} / span ${span}`, marginTop: `${drop}rem` },
      )}
      aria-label={`Open photograph ${number}: ${photo.title}`}
      onClick={(e) => onOpen(e.currentTarget)}
    >
      <span className="ph-frame">
        <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes={GALLERY_SIZES} />
      </span>
      <span className="ph-cap">
        <b>{pad(number)}</b>
        {photo.title}
      </span>
    </button>
  );
}
