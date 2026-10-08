import { useEffect, type ReactNode } from "react";
import { Lock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Link, useGo } from "@/lib/nav";

/**
 * Protege páginas que exigem login (apenas UX). A autorização REAL é do backend.
 * Com `admin`, clientes veem a mensagem de acesso restrito.
 */
export function RequireAuth({ children, admin = false }: { children: ReactNode; admin?: boolean }) {
  const { user, ready, isAdmin } = useAuth();
  const go = useGo();

  useEffect(() => {
    if (ready && !user) go("/login");
  }, [ready, user, go]);

  if (!ready || !user) {
    return (
      <div className="lv-center-screen" aria-busy="true">
        <div className="lv-spinner" aria-label="Carregando" />
      </div>
    );
  }

  if (admin && !isAdmin) {
    return (
      <div className="lv-center-screen">
        <div className="lv-card lv-restricted">
          <Lock size={32} />
          <h1>Acesso restrito</h1>
          <p>Esta área é exclusiva para administradores da Lavô+.</p>
          <Link to="/" className="lv-btn lv-btn--primary">
            Voltar ao site
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
