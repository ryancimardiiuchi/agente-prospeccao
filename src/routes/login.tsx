import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AuthCard, Field, emailValido } from "@/components/lavo/Form";
import { Notice } from "@/components/lavo/PageHeader";
import { useAuth } from "@/context/AuthContext";
import { errorMessage } from "@/lib/api";
import { Link, useGo } from "@/lib/nav";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/login")({
  head: () => seo("Entrar", "Acesse sua conta na Lavô+."),
  component: LoginPage,
});

function LoginPage() {
  const { login, demoLogin } = useAuth();
  const go = useGo();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  const enviar = async (e: FormEvent) => {
    e.preventDefault();
    setErro("");
    if (!emailValido(email)) return setErro("Informe um e-mail válido.");
    if (!senha) return setErro("Informe sua senha.");
    setCarregando(true);
    try {
      await login(email, senha);
      go("/");
    } catch (err) {
      setErro(errorMessage(err, "E-mail ou senha incorretos."));
    } finally {
      setCarregando(false);
    }
  };

  return (
    <AuthCard title="Entrar" subtitle="Acesse sua conta para fazer e acompanhar pedidos.">
      <form className="lv-form" onSubmit={enviar} noValidate>
        {erro && <Notice kind="error">{erro}</Notice>}
        <Field label="E-mail" name="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Field label="Senha" name="senha" type="password" autoComplete="current-password" value={senha} onChange={(e) => setSenha(e.target.value)} />
        <Link to="/esqueci-senha" className="lv-link" style={{ justifySelf: "end", fontSize: ".9rem" }}>Esqueci minha senha</Link>
        <button className="lv-btn lv-btn--primary lv-btn--block lv-btn--lg" disabled={carregando}>
          {carregando ? "Entrando..." : "Entrar"}
        </button>
        <p className="lv-muted" style={{ textAlign: "center" }}>
          Não tem conta? <Link to="/cadastro" className="lv-link">Criar conta</Link>
        </p>
      </form>
      {import.meta.env.DEV && (
        <div className="lv-demo">
          <p className="lv-muted" style={{ fontSize: ".85rem", marginBottom: 10 }}>Somente em desenvolvimento: ver as telas sem a API.</p>
          <div className="lv-row">
            <button type="button" className="lv-btn lv-btn--ghost" onClick={() => { demoLogin("cliente"); go("/"); }}>Entrar como cliente</button>
            <button type="button" className="lv-btn lv-btn--ghost" onClick={() => { demoLogin("admin"); go("/admin"); }}>Entrar como admin</button>
          </div>
        </div>
      )}
    </AuthCard>
  );
}
