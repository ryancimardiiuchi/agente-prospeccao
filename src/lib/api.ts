/**
 * Cliente Axios do Lavô+.
 *
 * ÚNICO lugar que conhece a API. Só existem aqui os endpoints CONFIRMADOS:
 *   POST /cadastro · POST /login · POST /esqueceusenha · POST /verificar-email
 *   POST /reenviar-codigo · POST /novasenha · GET /servicos
 *   GET|POST|PUT|DELETE /carrinho · PUT /admin/usuarios/role · /ia · /api
 *
 * Os NOMES DOS CAMPOS enviados/recebidos (email, senha, codigo...) não foram
 * informados no briefing: estão marcados com "CONFIRMAR" e devem ser ajustados
 * conforme o backend real. Autenticação: JWT em `Authorization: Bearer <token>`.
 */
import axios, { isAxiosError } from "axios";

export const API_URL: string = import.meta.env.VITE_API_URL ?? "http://localhost:3000";
export const TOKEN_KEY = "lavo_token";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export const api = axios.create({ baseURL: API_URL, timeout: 6000 });

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/** Converte qualquer erro do Axios em uma mensagem clara para o usuário. */
export function errorMessage(err: unknown, fallback = "Algo deu errado. Tente novamente."): string {
  if (isAxiosError(err)) {
    if (!err.response) {
      return `Não foi possível conectar à API (${API_URL}). Verifique se o servidor está em execução.`;
    }
    const data = err.response.data as Record<string, unknown> | string | undefined;
    if (typeof data === "string" && data) return data;
    if (data && typeof data === "object") {
      const msg = data.message ?? data.mensagem ?? data.error ?? data.erro;
      if (typeof msg === "string" && msg) return msg;
    }
  }
  return fallback;
}

/* ---------------------------- Autenticação ---------------------------- */
export const authApi = {
  // CONFIRMAR campos: nome, email, senha
  cadastro: (body: { nome: string; email: string; senha: string }) => api.post("/cadastro", body),
  // CONFIRMAR campos: email, senha
  login: (body: { email: string; senha: string }) => api.post("/login", body),
  // CONFIRMAR campos: email
  esqueceuSenha: (body: { email: string }) => api.post("/esqueceusenha", body),
  // CONFIRMAR campos: email, codigo
  verificarEmail: (body: { email: string; codigo: string }) => api.post("/verificar-email", body),
  // CONFIRMAR campos: email
  reenviarCodigo: (body: { email: string }) => api.post("/reenviar-codigo", body),
  // CONFIRMAR campos: email, codigo, novaSenha
  novaSenha: (body: { email: string; codigo: string; novaSenha: string }) =>
    api.post("/novasenha", body),
};

/* ------------------------------- Serviços ------------------------------ */
export const servicosApi = {
  listar: () => api.get("/servicos"),
};

/* ------------------------------- Carrinho ------------------------------ */
// Formato dos corpos não informado: CONFIRMAR antes de usar.
export const carrinhoApi = {
  obter: () => api.get("/carrinho"),
  adicionar: (body: unknown) => api.post("/carrinho", body),
  atualizar: (body: unknown) => api.put("/carrinho", body),
  remover: (body?: unknown) => api.delete("/carrinho", { data: body }),
};

/* --------------------------------- Admin ------------------------------- */
export const adminApi = {
  // CONFIRMAR campos: id/email do usuário e role
  alterarRole: (body: { id?: string; email?: string; role: string }) =>
    api.put("/admin/usuarios/role", body),
};

/* ----------------------------------- IA -------------------------------- */
// CONFIRMAR campos do corpo e da resposta.
export const iaApi = {
  perguntar: (body: { mensagem: string }) => api.post("/ia", body),
};
