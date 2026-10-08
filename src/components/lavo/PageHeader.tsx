import type { ReactNode } from "react";

export function PageHeader({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: ReactNode }) {
  return (
    <header className="lv-pagehead">
      <div className="lv-container">
        {eyebrow && <span className="lv-eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </header>
  );
}

export function Notice({
  kind = "info",
  children,
}: {
  kind?: "info" | "error" | "success" | "warn";
  children: ReactNode;
}) {
  return (
    <p className={`lv-notice lv-notice--${kind}`} role={kind === "error" ? "alert" : "status"}>
      {children}
    </p>
  );
}

/** Marca visualmente os pontos onde a API ainda precisa ser ligada. */
export function IntegrationNote({ children }: { children: ReactNode }) {
  return (
    <p className="lv-integration">
      <strong>Ponto de integração:</strong> {children}
    </p>
  );
}
