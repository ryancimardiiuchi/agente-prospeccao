import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AuthCard, Field, emailPendente, emailValido } from "@/components/lavo/Form";
import { Notice } from "@/components/lavo/PageHeader";
import { authApi, errorMessage } from "@/lib/api";
import { useGo } from "@/lib/nav";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/verificar-email")({
  head: () => seo("Verificar e-mail", "Confirme seu e-mail com o código recebido."),
  component: Verificar,
});

function Verificar() {
  const go = useGo();
  const [email, setEmail] = useState("");
  const [codigo, setCodigo] = useState("");
  const [msg, setMsg] = useState<{ k: "error" | "success"; t: string } | null>(null);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => setEmail(emailPendente.get()), []);

  const enviar = async (e: FormEvent) => {
    e.preventDefault();
    if (!emailValido(email)) return setMsg({ k: "error", t: "Informe um e-mail válido." });
    if (!codigo.trim()) return setMsg({ k: "error", t: "Informe o código." });
    setCarregando(true);
    try {
      await authApi.verificarEmail({ email, codigo: codigo.trim() });
      setMsg({ k: "success", t: "E-mail verificado! Agora é só entrar." });
      setTimeout(() => go("/login"), 1200);
    } catch (err) {
      setMsg({ k: "error", t: errorMessage(err, "Código inválido.") });
    } finally {
      setCarregando(false);
    }
  };

  const reenviar = async () => {
    if (!emailValido(email)) return setMsg({ k: "error", t: "Informe um e-mail válido." });
    try {
      await authApi.reenviarCodigo({ email });
      setMsg({ k: "success", t: "Enviamos um novo código." });
    } catch (err) {
      setMsg({ k: "error", t: errorMessage(err) });
    }
  };

  return (
    <AuthCard title="Verifique seu e-mail" subtitle="Digite o código que enviamos para você.">
      <form className="lv-form" onSubmit={enviar} noValidate>
        {msg && <Notice kind={msg.k}>{msg.t}</Notice>}
        <Field label="E-mail" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Field label="Código" name="codigo" className="lv-code" inputMode="numeric" autoComplete="one-time-code" value={codigo} onChange={(e) => setCodigo(e.target.value)} />
        <button className="lv-btn lv-btn--primary lv-btn--block lv-btn--lg" disabled={carregando}>
          {carregando ? "Verificando..." : "Verificar"}
        </button>
        <button type="button" className="lv-btn lv-btn--ghost lv-btn--block" onClick={reenviar}>Reenviar código</button>
      </form>
    </AuthCard>
  );
}
