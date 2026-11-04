/**
 * Each chapter reveals its content with its own motion identity (see styles/base.css):
 * drift (02, clouds) · clear (03, fog) · draw (04, plan) · rise (05) · frame (06) · dawn (07) · settle (08).
 * Put `data-reveal="drift"` (etc.) on an element; <RevealObserver/> adds `.in` when it scrolls into view.
 */
export type Reveal = "drift" | "clear" | "draw" | "rise" | "frame" | "dawn" | "settle";
