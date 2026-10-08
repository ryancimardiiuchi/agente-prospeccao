import { Link } from "@/lib/nav";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className={`lv-logo ${light ? "lv-logo--light" : ""}`} aria-label="Lavô+ Lavanderia Online — início">
      <span className="lv-logo__mark" aria-hidden="true">
        L<span>+</span>
      </span>
      <span className="lv-logo__text">
        <strong>Lavô+</strong>
        <small>Lavanderia Online</small>
      </span>
    </Link>
  );
}
