"use client";

import { useCallback, useEffect, useImperativeHandle, useRef, type ReactNode, type Ref } from "react";
import { prefersReducedMotion } from "@/lib/utils";

/**
 * A native <dialog> with the portfolio's fade, focus return and scroll lock.
 *
 *   const ref = useRef<DialogHandle>(null);
 *   ref.current?.open(buttonElement);
 *
 * - Esc runs `onEscape` first (return true if you handled it), otherwise closes.
 * - Inside the dialog, any element with `data-close` closes it: links close instantly
 *   so their #anchor scroll still happens, buttons fade out first.
 */
export interface DialogHandle {
  open: (opener?: HTMLElement | null) => void;
  close: (options?: { restoreFocus?: boolean; after?: () => void }) => void;
  isOpen: () => boolean;
  element: () => HTMLDialogElement | null;
}

interface DialogProps {
  ref?: Ref<DialogHandle>;
  className: string;
  children: ReactNode;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  /** Return true when Esc was handled (e.g. a dropdown was closed instead). */
  onEscape?: () => boolean;
  onOpen?: () => void;
  /** Called once the dialog has fully closed. */
  onClosed?: () => void;
  /** Close when an element with this class is clicked directly, e.g. the lightbox backdrop. */
  closeOnSelfClickClass?: string;
}

const CLOSE_MS = 420;

function unlockIfLast() {
  if (!document.querySelector("dialog[open]")) document.documentElement.classList.remove("locked");
}

export function Dialog({ ref, className, children, onEscape, onOpen, onClosed, closeOnSelfClickClass, ...aria }: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const closing = useRef(false);
  const timers = useRef<number[]>([]);
  const callbacks = useRef({ onEscape, onOpen, onClosed });

  // keep the latest callbacks without re-binding listeners
  useEffect(() => {
    callbacks.current = { onEscape, onOpen, onClosed };
  });

  const open = useCallback((from?: HTMLElement | null) => {
    const d = dialogRef.current;
    if (!d || d.open) return;
    opener.current = from ?? (document.activeElement as HTMLElement | null);
    d.showModal();
    document.documentElement.classList.add("locked");
    requestAnimationFrame(() => requestAnimationFrame(() => d.classList.add("open")));
    callbacks.current.onOpen?.();
  }, []);

  const close = useCallback(({ restoreFocus = true, after }: { restoreFocus?: boolean; after?: () => void } = {}) => {
    const d = dialogRef.current;
    if (!d || !d.open || closing.current) return;
    closing.current = true;
    d.classList.remove("open");
    const done = () => {
      closing.current = false;
      if (d.open) d.close();
      unlockIfLast();
      const o = opener.current;
      if (restoreFocus && o && document.contains(o)) o.focus({ preventScroll: true });
      callbacks.current.onClosed?.();
      after?.();
    };
    if (prefersReducedMotion()) done();
    else timers.current.push(window.setTimeout(done, CLOSE_MS));
  }, []);

  useImperativeHandle(
    ref,
    () => ({ open, close, isOpen: () => !!dialogRef.current?.open, element: () => dialogRef.current }),
    [open, close],
  );

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    const onCancel = (e: Event) => {
      e.preventDefault();
      if (callbacks.current.onEscape?.()) return;
      close();
    };
    const onNativeClose = () => {
      d.classList.remove("open");
      unlockIfLast();
    };
    d.addEventListener("cancel", onCancel);
    d.addEventListener("close", onNativeClose);
    const pending = timers.current;
    return () => {
      d.removeEventListener("cancel", onCancel);
      d.removeEventListener("close", onNativeClose);
      pending.forEach((t) => clearTimeout(t));
      if (d.open) d.close();
      unlockIfLast();
    };
  }, [close]);

  function handleClick(e: React.MouseEvent<HTMLDialogElement>) {
    const target = e.target as HTMLElement;
    if (closeOnSelfClickClass && target.classList.contains(closeOnSelfClickClass)) {
      close();
      return;
    }
    const closer = target.closest<HTMLElement>("[data-close]");
    if (!closer) return;
    const d = dialogRef.current;
    if (closer.tagName === "A" && d) {
      // let the #anchor navigation happen: close immediately, no fade
      d.classList.remove("open");
      d.close();
      unlockIfLast();
      callbacks.current.onClosed?.();
    } else {
      close();
    }
  }

  return (
    <dialog ref={dialogRef} className={`dlg ${className}`} onClick={handleClick} {...aria}>
      {children}
    </dialog>
  );
}
