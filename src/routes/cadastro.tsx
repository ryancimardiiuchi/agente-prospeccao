import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AuthCard, Field, emailPendente, emailValido } from "@/components/lavo/Form";
import { Notice } from "@/components/lavo/PageHeader";
import { authApi, errorMessage } from "@/lib/api";
import { Link, useGo } from "@/lib/nav";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/cadastro")({
  head: () => seo("Criar conta", "Cadastre-se na Lavô+ e faça seu primeiro pedido."),
  component: Cadastro,
});

function Cadastro() {
  const go = useGo();
  const [f, setF] = useState({ nome: "", email: "", senha: "", confirmar: "" });
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement>) => setF({ ...f, [k]: e.target.value });

  const enviar = async (e: FormEvent) => {
    e.preventDefault();
    setErro("");
    if (!f.nome.trim()) return setErro("Informe seu nome.");
    if (!emailValido(f.email)) return setErro("Informe um e-mail válido.");
    if (f.senha.length < 6) return setErro("A senha precisa ter pelo menos 6 caracteres.");
    if (f.senha !== f.confirmar) return setErro("As senhas não conferem.");
    setCarregando(true);
    try {
      await authApi.cadastro({ nome: f.nome.trim(), email: f.email, senha: f.senha });
      emailPendente.set(f.email);
      go("/verificar-email");
    } catch (err) {
      setErro(errorMessage(err));
    } finally {
      setCarregando(false);
    }
  };

  return (
    <AuthCard title="Criar conta" subtitle="Leva menos de um minuto.">
      <form className="lv-form" onSubmit={enviar} noValidate>
        {erro && <Notice kind="error">{erro}</Notice>}
        <Field label="Nome completo" name="nome" autoComplete="name" value={f.nome} onChange={set("nome")} />
        <Field label="E-mail" name="email" type="email" autoComplete="email" value={f.email} onChange={set("email")} />
        <Field label="Senha" name="senha" type="password" autoComplete="new-password" value={f.senha} onChange={set("senha")} />
        <Field label="Confirmar senha" name="confirmar" type="password" autoComplete="new-password" value={f.confirmar} onChange={set("confirmar")} />
        <button className="lv-btn lv-btn--primary lv-btn--block lv-btn--lg" disabled={carregando}>
          {carregando ? "Criando..." : "Criar conta"}
        </button>
        <p className="lv-muted" style={{ textAlign: "center" }}>
          Já tem conta? <Link to="/login" className="lv-link">Entrar</Link>
        </p>
      </form>
    </AuthCard>
  );
}
