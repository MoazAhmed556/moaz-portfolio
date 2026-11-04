import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  ChevronDown,
  Copy,
  Download,
  Lock,
  Maximize2,
  Minimize2,
  Monitor,
  RotateCw,
  Smartphone,
  Tablet,
  X,
  type LucideIcon,
} from "lucide-react";

/** Every icon used in the portfolio, by name. Styled by the `.i` class (1.6px stroke, 18px). */
const icons = {
  arrow: ArrowRight,
  left: ArrowLeft,
  right: ArrowRight,
  up: ArrowUp,
  out: ArrowUpRight,
  down: Download,
  chevron: ChevronDown,
  close: X,
  copy: Copy,
  lock: Lock,
  desktop: Monitor,
  tablet: Tablet,
  phone: Smartphone,
  reload: RotateCw,
  expand: Maximize2,
  shrink: Minimize2,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof icons;

export function Icon({ name, className }: { name: IconName; className?: string }) {
  const Svg = icons[name];
  return <Svg className={className ? `i ${className}` : "i"} aria-hidden="true" focusable="false" strokeWidth={1.6} />;
}
