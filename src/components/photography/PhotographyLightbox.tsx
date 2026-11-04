"use client";

import { AnimatePresence, motion } from "motion/react";
import Image, { getImageProps } from "next/image";
import { useEffect, useImperativeHandle, useRef, useState, type Ref } from "react";
import { Dialog, type DialogHandle } from "@/components/ui/Dialog";
import { Icon } from "@/components/ui/Icon";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { pad } from "@/lib/utils";
import type { Photo } from "@/types";

const LIGHTBOX_SIZES = "(max-width: 760px) 94vw, 88vw";
const QUALITY = 85;

export interface LightboxHandle {
  open: (list: Photo[], index: number, opener: HTMLElement) => void;
}

/** Warm the browser cache for a neighbouring photograph at the size the lightbox will request. */
function preload(photo: Photo) {
  const { props } = getImageProps({ src: photo.src, alt: "", width: photo.width, height: photo.height, sizes: LIGHTBOX_SIZES, quality: QUALITY });
  const img = new window.Image();
  if (props.sizes) img.sizes = props.sizes;
  if (props.srcSet) img.srcset = props.srcSet;
  img.src = props.src;
}

/**
 * Full-screen photograph viewer: ← / → keys, swipe on touch screens, Esc or a click
 * on the empty space around the photo to close. Neighbouring photos load ahead of time.
 */
export function PhotographyLightbox({ ref, collectionName }: { ref?: Ref<LightboxHandle>; collectionName: (id: string) => string }) {
  const dialog = useRef<DialogHandle>(null);
  const [list, setList] = useState<Photo[]>([]);
  const [at, setAt] = useState(0);
  const [dir, setDir] = useState(0);
  const reduced = usePrefersReducedMotion();
  const swipeX = useRef<number | null>(null);

  useImperativeHandle(ref, () => ({
    open(nextList, index, opener) {
      setList(nextList);
      setAt(index);
      setDir(0);
      dialog.current?.open(opener);
    },
  }));

  const count = list.length;
  const photo = list[at];

  const go = (delta: 1 | -1) => {
    if (!count) return;
    setDir(delta);
    setAt((i) => (i + delta + count) % count);
  };

  // load the photographs either side
  useEffect(() => {
    if (count < 2) return;
    preload(list[(at + 1) % count]);
    preload(list[(at - 1 + count) % count]);
  }, [at, count, list]);

  // keys + swipe on the dialog itself
  useEffect(() => {
    const el = dialog.current?.element();
    if (!el || !count) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setDir(1);
        setAt((i) => (i + 1) % count);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setDir(-1);
        setAt((i) => (i - 1 + count) % count);
      }
    };
    const onDown = (e: PointerEvent) => {
      swipeX.current = (e.target as Element).closest("button") ? null : e.clientX;
    };
    const onUp = (e: PointerEvent) => {
      if (swipeX.current === null) return;
      const dx = e.clientX - swipeX.current;
      swipeX.current = null;
      if (Math.abs(dx) < 50) return;
      const d = dx < 0 ? 1 : -1;
      setDir(d);
      setAt((i) => (i + d + count) % count);
    };
    el.addEventListener("keydown", onKey);
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointerup", onUp);
    return () => {
      el.removeEventListener("keydown", onKey);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointerup", onUp);
    };
  }, [count]);

  const s = reduced ? 0 : 1;

  return (
    <Dialog ref={dialog} className="lightbox" aria-label="Photograph viewer" closeOnSelfClickClass="lb-inner">
      <div className="lb-inner">
        <figure className="lb-figure">
          <div className="lb-frame">
            <AnimatePresence initial={false} custom={dir} mode="wait">
              {photo ? (
                <motion.div
                  key={photo.id}
                  custom={dir}
                  variants={{
                    enter: (d: number) => ({ opacity: 0, scale: 0.98, x: d * 30 }),
                    center: { opacity: 1, scale: 1, x: 0, transition: { opacity: { duration: 0.45 * s }, default: { duration: 0.7 * s, ease: [0.16, 1, 0.3, 1] } } },
                    exit: (d: number) => ({ opacity: 0, scale: 0.98, x: -d * 30, transition: { duration: 0.26 * s } }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    sizes={LIGHTBOX_SIZES}
                    quality={QUALITY}
                    loading="eager"
                  />
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
          <figcaption className="lb-cap">
            <span className="lb-count">
              <b>{pad(at + 1)}</b> / <span>{pad(count)}</span>
            </span>
            <span className="lb-title">{photo?.title}</span>
            <span className="lb-col">{photo ? collectionName(photo.collection) : ""}</span>
          </figcaption>
        </figure>
        <button type="button" className="round lb-close" data-close aria-label="Close (Esc)">
          <Icon name="close" />
        </button>
        <button type="button" className="round lb-prev" aria-label="Previous photograph" onClick={() => go(-1)}>
          <Icon name="left" />
        </button>
        <button type="button" className="round lb-next" aria-label="Next photograph" onClick={() => go(1)}>
          <Icon name="right" />
        </button>
      </div>
    </Dialog>
  );
}
