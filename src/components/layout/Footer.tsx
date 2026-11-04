import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="foot wrap">
      <span>{site.footer.left}</span>
      <span>{site.footer.right}</span>
    </footer>
  );
}
