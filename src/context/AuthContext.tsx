import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { authApi, TOKEN_KEY } from "@/lib/api";

export interface Usuario {
  nome: string;
  email: string;
  role: string;
}

interface AuthValue {
  user: Usuario | null;
  /** false até a sessão salva ser lida (evita piscar tela de login). */
  ready: boolean;
  isAdmin: boolean;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
  /** Somente em desenvolvimento: abre a interface sem API, para revisar o visual. */
  demoLogin: (role: "cliente" | "admin") => void;
}

const USER_KEY = "lavo_user";
const AuthContext = createContext<AuthValue | null>(null);

function decodeJwt(token: string): Record<string, unknown> {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(decodeURIComponent(escape(atob(payload.replace(/-/g, "+").replace(/_/g, "/")))));
  } catch {
    return {};
  }
}

/** CONFIRMAR o formato real da resposta de POST /login. */
function parseLogin(data: Record<string, any>, emailFallback: string) {
  const token: string | undefined = data.token ?? data.accessToken ?? data.jwt;
  if (!token) throw new Error("A API não retornou um token de acesso.");
  const claims = decodeJwt(token);
  const u = (data.user ?? data.usuario ?? {}) as Record<string, any>;
  const email = String(u.email ?? claims.email ?? emailFallback);
  const user: Usuario = {
    nome: String(u.nome ?? u.name ?? claims.nome ?? claims.name ?? email.split("@")[0]),
    email,
    role: String(u.role ?? claims.role ?? "cliente"),
  };
  return { token, user };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(USER_KEY);
      if (raw && window.localStorage.getItem(TOKEN_KEY)) setUser(JSON.parse(raw));
    } catch {
      /* sessão inválida: ignora */
    }
    setReady(true);
  }, []);

  const persist = (token: string, u: Usuario) => {
    window.localStorage.setItem(TOKEN_KEY, token);
    window.localStorage.setItem(USER_KEY, JSON.stringify(u));
    setUser(u);
  };

  const login = useCallback(async (email: string, senha: string) => {
    const { data } = await authApi.login({ email, senha });
    const { token, user } = parseLogin(data ?? {}, email);
    persist(token, user);
  }, []);

  const logout = useCallback(() => {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(USER_KEY);
    setUser(null);
  }, []);

  const demoLogin = useCallback((role: "cliente" | "admin") => {
    persist("demo", {
      nome: role === "admin" ? "Admin Demonstração" : "Cliente Demonstração",
      email: role === "admin" ? "admin@demo.lavo" : "cliente@demo.lavo",
      role: role === "admin" ? "admin" : "cliente",
    });
  }, []);

  const value = useMemo<AuthValue>(
    () => ({
      user,
      ready,
      // Apenas para exibir/ocultar a interface. A autorização real é do backend.
      isAdmin: !!user && /^admin/i.test(user.role),
      login,
      logout,
      demoLogin,
    }),
    [user, ready, login, logout, demoLogin],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth precisa estar dentro de <AuthProvider>");
  return ctx;
}
