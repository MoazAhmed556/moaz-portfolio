import { onScrollFrame } from "@/lib/scroll-engine";
import { clamp, hasFinePointer, prefersReducedMotion } from "@/lib/utils";

/**
 * LIVING ARCHITECTURE — a hand-written 3D wireframe on <canvas>:
 * a perspective corridor, floating frames and squares, threads that connect them,
 * and small points of light. Mouse and scroll move the camera; as the chapter ends
 * the architecture dissolves into sunlight (--exit on the section).
 *
 * `calm` (0→1) makes the frames step back once the photographs are on screen,
 * so the background never competes with the pictures.
 *
 * Plain TypeScript (no React). `startLivingArchitecture` returns a cleanup function
 * that stops the animation loop and removes every listener.
 */

interface Frame {
  x: number;
  y: number;
  z: number;
  w: number;
  h: number;
  ry: number;
  rz: number;
  spd: number;
  ph: number;
  fill: boolean;
  warm: boolean;
  dot: boolean;
}

type Point2 = [number, number];
type Point3 = [number, number, number];

const Z_NEAR = 1.1;
const Z_FAR = 15;
const rand = (a: number, b: number) => a + Math.random() * (b - a);

function makeFrame(z?: number): Frame {
  const square = Math.random() < 0.35;
  const w = rand(0.35, 1.25);
  const h = square ? w : rand(0.3, 1.5);
  return {
    x: rand(-2.6, 2.6),
    y: rand(-1.4, 1.4),
    z: z ?? rand(Z_NEAR + 0.5, Z_FAR),
    w,
    h,
    ry: rand(-0.8, 0.8),
    rz: rand(-0.08, 0.08),
    spd: rand(0.08, 0.2),
    ph: rand(0, 6.28),
    fill: Math.random() < 0.3,
    warm: Math.random() < 0.28,
    dot: Math.random() < 0.45,
  };
}

const depthAlpha = (z: number) => Math.pow(clamp(1 - (z - Z_NEAR) / (Z_FAR - Z_NEAR)), 1.25) * clamp((z - Z_NEAR) / 0.8);

export function startLivingArchitecture(canvas: HTMLCanvasElement, section: HTMLElement, head: HTMLElement | null): () => void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};

  const phoneMQ = window.matchMedia("(max-width: 760px)");
  let W = 0;
  let H = 0;
  let frames: Frame[] = [];
  let running = false;
  let inView = false;
  let last = 0;
  let t = 0;
  let rafId = 0;
  let presence = 0;
  let exitAmt = 0;
  let calm = 0;
  let camX = 0;
  let camY = 0;
  let tgtX = 0;
  let tgtY = 0;
  let scrollDrift = 0;
  let lastScroll = window.scrollY;

  const build = () => {
    frames = Array.from({ length: phoneMQ.matches ? 16 : 30 }, () => makeFrame());
  };

  const project = (x: number, y: number, z: number): Point2 => {
    const F = Math.min(W, H) * 0.95;
    const zz = Math.max(0.05, z);
    return [W / 2 + ((x - camX) / zz) * F, H * 0.46 + ((y - camY) / zz) * F];
  };

  const corners = (f: Frame): Point3[] => {
    const cy = Math.cos(f.ry);
    const sy = Math.sin(f.ry);
    const cz = Math.cos(f.rz);
    const sz = Math.sin(f.rz);
    const ox = Math.sin(t * 0.00025 + f.ph) * 0.12;
    const oy = Math.cos(t * 0.0002 + f.ph) * 0.08;
    return ([[-1, -1], [1, -1], [1, 1], [-1, 1]] as const).map(([u, v]) => {
      const lx = (u * f.w) / 2;
      const ly = (v * f.h) / 2;
      const rx = lx * cz - ly * sz;
      const ryy = lx * sz + ly * cz;
      return [f.x + ox + rx * cy, f.y + oy + ryy, f.z + rx * sy] as Point3;
    });
  };

  const line = (a: Point2, b: Point2) => {
    ctx.beginPath();
    ctx.moveTo(a[0], a[1]);
    ctx.lineTo(b[0], b[1]);
    ctx.stroke();
  };

  function draw() {
    if (!ctx) return;
    ctx.clearRect(0, 0, W, H);
    const pres = presence * (1 - exitAmt * 0.85);
    if (pres <= 0.002) return;

    // perspective corridor: floor, ceiling and walls receding to a vanishing point
    const lineA = 0.085 * pres;
    ctx.lineWidth = 1;
    const shift = (t * 0.00012 + scrollDrift) % 1.4;
    const grow = clamp(presence * 1.25);
    const zMax = Z_NEAR + (Z_FAR - Z_NEAR) * grow;
    for (const yy of [1.5, -1.5]) {
      for (let xi = -6; xi <= 6; xi++) {
        const x = xi * 0.55;
        ctx.strokeStyle = `rgba(41,43,44,${lineA * (xi % 3 === 0 ? 1 : 0.55)})`;
        line(project(x, yy, Z_NEAR), project(x, yy, zMax));
      }
      for (let k = 0; k < 12; k++) {
        const z = Z_NEAR + k * 1.4 - shift + 1.4;
        if (z < Z_NEAR || z > zMax) continue;
        ctx.strokeStyle = `rgba(41,43,44,${lineA * depthAlpha(z) * 1.1})`;
        line(project(-3.3, yy, z), project(3.3, yy, z));
      }
    }
    for (const xx of [-3.3, 3.3]) {
      for (let k = 0; k < 12; k++) {
        const z = Z_NEAR + k * 1.4 - shift + 1.4;
        if (z < Z_NEAR || z > zMax) continue;
        ctx.strokeStyle = `rgba(41,43,44,${lineA * depthAlpha(z) * 0.9})`;
        line(project(xx, -1.5, z), project(xx, 1.5, z));
      }
    }

    // floating frames (sorted far → near)
    type Pt = { c: Point2[]; a: number; z: number; dot: boolean; ph: number } | null;
    const pts: Pt[] = [];
    const lineQ = 1 - 0.4 * calm;
    const fillQ = 1 - 0.65 * calm;
    frames.sort((a, b) => b.z - a.z);
    for (const f of frames) {
      const c = corners(f).map((p) => project(p[0], p[1], p[2]));
      const a = depthAlpha(f.z) * pres;
      if (a <= 0.01) {
        pts.push(null);
        continue;
      }
      ctx.beginPath();
      ctx.moveTo(c[0][0], c[0][1]);
      for (let k = 1; k < 4; k++) ctx.lineTo(c[k][0], c[k][1]);
      ctx.closePath();
      if (f.fill) {
        ctx.fillStyle = f.warm ? `rgba(255,246,230,${0.32 * a * fillQ})` : `rgba(169,205,229,${0.12 * a * fillQ})`;
        ctx.fill();
      }
      ctx.strokeStyle = f.warm ? `rgba(155,115,93,${0.5 * a * lineQ})` : `rgba(41,43,44,${0.34 * a * lineQ})`;
      ctx.lineWidth = f.z < 3 ? 1.2 : 1;
      ctx.stroke();
      pts.push({ c, a, z: f.z, dot: f.dot, ph: f.ph });
    }

    // threads between nearby frames, appearing and disappearing
    ctx.lineWidth = 0.8;
    const maxD = Math.min(W, H) * 0.42;
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];
      if (!p) continue;
      let made = 0;
      for (let j = i + 1; j < pts.length && made < 2; j++) {
        const q = pts[j];
        if (!q || Math.abs(p.z - q.z) > 3) continue;
        const [ax, ay] = p.c[0];
        const [bx, by] = q.c[2];
        const d = Math.hypot(ax - bx, ay - by);
        if (d > maxD) continue;
        const pulse = 0.5 + 0.5 * Math.sin(t * 0.0006 + p.ph * 3 + q.ph * 2);
        const a = (1 - d / maxD) * 0.2 * Math.min(p.a, q.a) * pulse * (1 - 0.45 * calm);
        if (a < 0.01) continue;
        ctx.strokeStyle = `rgba(41,43,44,${a})`;
        line([ax, ay], [bx, by]);
        made++;
      }
    }

    // delicate light points
    for (const p of pts) {
      if (!p || !p.dot) continue;
      const glow = (0.55 + 0.45 * Math.sin(t * 0.0012 + p.ph * 5)) * p.a * (1 - 0.35 * calm);
      const [x, y] = p.c[1];
      const r = p.z < 4 ? 2.2 : 1.6;
      ctx.fillStyle = `rgba(183,165,140,${0.18 * glow})`;
      ctx.beginPath();
      ctx.arc(x, y, r * 4.5, 0, 6.283);
      ctx.fill();
      ctx.fillStyle = `rgba(155,115,93,${0.9 * glow})`;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, 6.283);
      ctx.fill();
    }
  }

  function resize() {
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, phoneMQ.matches ? 1.5 : 1.75);
    W = canvas.clientWidth;
    H = canvas.clientHeight;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (!running) draw();
  }

  function step(now: number) {
    if (!running) return;
    const dt = Math.min(50, now - (last || now));
    last = now;
    t += dt;
    camX += (tgtX - camX) * 0.04;
    camY += (tgtY - camY) * 0.04;
    for (const f of frames) {
      f.z -= f.spd * dt * 0.001;
      f.ry += Math.sin(t * 0.0003 + f.ph) * 0.0004;
      if (f.z < Z_NEAR - 0.2) Object.assign(f, makeFrame(Z_FAR));
    }
    draw();
    rafId = requestAnimationFrame(step);
  }
  const start = () => {
    if (running || prefersReducedMotion()) return;
    running = true;
    last = 0;
    rafId = requestAnimationFrame(step);
  };
  const stop = () => {
    running = false;
    cancelAnimationFrame(rafId);
  };

  build();
  resize();

  const onResize = () => resize();
  const onPhoneChange = () => {
    build();
    resize();
  };
  const onVisibility = () => {
    if (document.hidden) stop();
    else if (inView) start();
  };
  const onPointer = (e: PointerEvent) => {
    if (!hasFinePointer()) return;
    tgtX = (e.clientX / window.innerWidth - 0.5) * 0.9;
    tgtY = (e.clientY / window.innerHeight - 0.5) * 0.5;
  };

  window.addEventListener("resize", onResize, { passive: true });
  phoneMQ.addEventListener("change", onPhoneChange);
  document.addEventListener("visibilitychange", onVisibility);
  section.addEventListener("pointermove", onPointer);

  // run only while the chapter is near the screen
  const io = new IntersectionObserver(
    ([en]) => {
      inView = en.isIntersecting;
      if (inView) start();
      else stop();
      if (inView && prefersReducedMotion()) draw();
    },
    { rootMargin: "10% 0px" },
  );
  io.observe(section);

  // entering: the architecture assembles; leaving: it dissolves into sunlight
  const unsubscribe = onScrollFrame(({ y, vh }) => {
    const r = section.getBoundingClientRect();
    presence = clamp((vh - r.top) / (vh * 0.9));
    // the sunlight rises as the section's end comes up the screen
    exitAmt = clamp((vh - r.bottom) / (vh * 0.6) + 0.15);
    section.style.setProperty("--exit", exitAmt.toFixed(3));
    if (head) calm = clamp((vh * 0.85 - head.getBoundingClientRect().bottom) / (vh * 0.6));
    scrollDrift += (y - lastScroll) * 0.0009;
    lastScroll = y;
    if (prefersReducedMotion() && inView) {
      presence = Math.max(presence, 0.9);
      draw();
    } else if (!running && inView) draw();
  });

  return () => {
    stop();
    unsubscribe();
    io.disconnect();
    window.removeEventListener("resize", onResize);
    phoneMQ.removeEventListener("change", onPhoneChange);
    document.removeEventListener("visibilitychange", onVisibility);
    section.removeEventListener("pointermove", onPointer);
  };
}
