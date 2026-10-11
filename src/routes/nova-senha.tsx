import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AuthCard, Field, emailPendente, emailValido } from "@/components/lavo/Form";
import { Notice } from "@/components/lavo/PageHeader";
import { authApi, errorMessage } from "@/lib/api";
import { useGo } from "@/lib/nav";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/nova-senha")({
  head: () => seo("Nova senha", "Crie uma nova senha para sua conta."),
  component: NovaSenha,
});

function NovaSenha() {
  const go = useGo();
  const [f, setF] = useState({ email: "", codigo: "", senha: "", confirmar: "" });
  const [msg, setMsg] = useState<{ k: "error" | "success"; t: string } | null>(null);
  const [carregando, setCarregando] = useState(false);
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement>) => setF({ ...f, [k]: e.target.value });

  useEffect(() => setF((v) => ({ ...v, email: emailPendente.get() })), []);

  const enviar = async (e: FormEvent) => {
    e.preventDefault();
    if (!emailValido(f.email)) return setMsg({ k: "error", t: "Informe um e-mail válido." });
    if (!f.codigo.trim()) return setMsg({ k: "error", t: "Informe o código recebido." });
    if (f.senha.length < 6) return setMsg({ k: "error", t: "A senha precisa ter pelo menos 6 caracteres." });
    if (f.senha !== f.confirmar) return setMsg({ k: "error", t: "As senhas não conferem." });
    setCarregando(true);
    try {
      await authApi.novaSenha({ email: f.email, codigo: f.codigo.trim(), novaSenha: f.senha });
      setMsg({ k: "success", t: "Senha alterada! Redirecionando..." });
      setTimeout(() => go("/login"), 1200);
    } catch (err) {
      setMsg({ k: "error", t: errorMessage(err) });
    } finally {
      setCarregando(false);
    }
  };

  return (
    <AuthCard title="Criar nova senha" subtitle="Use o código que enviamos para o seu e-mail.">
      <form className="lv-form" onSubmit={enviar} noValidate>
        {msg && <Notice kind={msg.k}>{msg.t}</Notice>}
        <Field label="E-mail" name="email" type="email" value={f.email} onChange={set("email")} />
        <Field label="Código" name="codigo" className="lv-code" value={f.codigo} onChange={set("codigo")} />
        <Field label="Nova senha" name="senha" type="password" autoComplete="new-password" value={f.senha} onChange={set("senha")} />
        <Field label="Confirmar nova senha" name="confirmar" type="password" autoComplete="new-password" value={f.confirmar} onChange={set("confirmar")} />
        <button className="lv-btn lv-btn--primary lv-btn--block lv-btn--lg" disabled={carregando}>
          {carregando ? "Salvando..." : "Salvar nova senha"}
        </button>
      </form>
    </AuthCard>
  );
}
