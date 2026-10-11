import type { InputHTMLAttributes, ReactNode } from "react";

export function AuthCard({ title, subtitle, children }: { title: string; subtitle?: ReactNode; children: ReactNode }) {
  return (
    <div className="lv-auth">
      <div className="lv-card">
        <h1>{title}</h1>
        {subtitle && <p className="lv-muted">{subtitle}</p>}
        {children}
      </div>
    </div>
  );
}

export function Field({ label, error, ...props }: { label: string; error?: string } & InputHTMLAttributes<HTMLInputElement>) {
  const id = props.id ?? props.name;
  return (
    <div className="lv-field">
      <label htmlFor={id}>{label}</label>
      <input id={id} aria-invalid={!!error} {...props} />
      {error && <small>{error}</small>}
    </div>
  );
}

/** E-mail usado entre as telas de cadastro / verificação / nova senha. */
const PEND = "lavo_email_pendente";
export const emailPendente = {
  get: () => (typeof window === "undefined" ? "" : sessionStorage.getItem(PEND) ?? ""),
  set: (e: string) => sessionStorage.setItem(PEND, e),
};

export const emailValido = (e: string) => /^\S+@\S+\.\S+$/.test(e);
