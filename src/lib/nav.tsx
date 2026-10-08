/**
 * Camada fina de navegação.
 *
 * Todo o front-end importa `Link` e `useGo` DAQUI. Ao levar o projeto para
 * React Router, basta reescrever este arquivo:
 *   export { Link } from "react-router-dom";
 *   export const useGo = () => { const n = useNavigate(); return (to: string) => n(to); };
 * (e trocar `activeProps` por `NavLink` / className em função).
 */
import { Link, useNavigate, type LinkProps } from "@tanstack/react-router";

export { Link };
export type AppPath = LinkProps["to"];

export function useGo() {
  const navigate = useNavigate();
  return (to: AppPath) => navigate({ to });
}
