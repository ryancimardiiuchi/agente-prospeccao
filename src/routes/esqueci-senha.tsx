import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AuthCard, Field, emailPendente, emailValido } from "@/components/lavo/Form";
import { Notice } from "@/components/lavo/PageHeader";
import { authApi, errorMessage } from "@/lib/api";
import { Link, useGo } from "@/lib/nav";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/esqueci-senha")({
  head: () => seo("Esqueci a senha", "Receba um código para criar uma nova senha."),
  component: Esqueci,
});

function Esqueci() {
  const go = useGo();
  const [email, setEmail] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  const enviar = async (e: FormEvent) => {
    e.preventDefault();
    setErro("");
    if (!emailValido(email)) return setErro("Informe um e-mail válido.");
    setCarregando(true);
    try {
      await authApi.esqueceuSenha({ email });
      emailPendente.set(email);
      go("/nova-senha");
    } catch (err) {
      setErro(errorMessage(err));
    } finally {
      setCarregando(false);
    }
  };

  return (
    <AuthCard title="Esqueci a senha" subtitle="Enviaremos um código para o seu e-mail.">
      <form className="lv-form" onSubmit={enviar} noValidate>
        {erro && <Notice kind="error">{erro}</Notice>}
        <Field label="E-mail" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button className="lv-btn lv-btn--primary lv-btn--block lv-btn--lg" disabled={carregando}>
          {carregando ? "Enviando..." : "Enviar código"}
        </button>
        <Link to="/login" className="lv-link" style={{ textAlign: "center" }}>Voltar para entrar</Link>
      </form>
    </AuthCard>
  );
}
