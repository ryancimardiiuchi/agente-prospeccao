import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Notice } from "@/components/lavo/PageHeader";
import { Stepper } from "@/components/lavo/Stepper";
import { OrderSummary } from "@/components/lavo/OrderSummary";
import { Field } from "@/components/lavo/Form";
import { RequireAuth } from "@/components/lavo/RequireAuth";
import { ENDERECO_VAZIO, useCheckout, type Endereco } from "@/context/CheckoutContext";
import { useCart } from "@/context/CartContext";
import { Link, useGo } from "@/lib/nav";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/endereco")({
  head: () => seo("Endereço", "Informe onde coletamos e entregamos suas roupas."),
  component: () => <RequireAuth><EnderecoPage /></RequireAuth>,
});

const OBRIG: (keyof Endereco)[] = ["cep", "rua", "numero", "bairro", "cidade", "estado"];

function EnderecoPage() {
  const { endereco, setEndereco } = useCheckout();
  const { count } = useCart();
  const go = useGo();
  const [f, setF] = useState<Endereco>(endereco ?? ENDERECO_VAZIO);
  const [erro, setErro] = useState("");
  useEffect(() => { if (count === 0) go("/carrinho"); }, [count, go]);

  const set = (k: keyof Endereco) => (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value;
    if (k === "cep") v = v.replace(/\D/g, "").slice(0, 8).replace(/(\d{5})(\d)/, "$1-$2");
    if (k === "estado") v = v.toUpperCase().slice(0, 2);
    setF({ ...f, [k]: v });
  };

  const enviar = (e: FormEvent) => {
    e.preventDefault();
    if (OBRIG.some((k) => !f[k].trim())) return setErro("Preencha todos os campos obrigatórios.");
    if (f.cep.replace(/\D/g, "").length !== 8) return setErro("CEP deve ter 8 números.");
    setEndereco(f);
    go("/agendamento");
  };

  return (
    <>
      <PageHeader eyebrow="Pedido" title="Endereço de coleta e entrega" />
      <div className="lv-container lv-flow">
        <Stepper atual={2} />
        <div className="lv-flow__grid">
          <form className="lv-card lv-form" style={{ marginTop: 0 }} onSubmit={enviar} noValidate>
            {erro && <Notice kind="error">{erro}</Notice>}
            <div className="lv-form-grid">
              <Field label="CEP *" name="cep" inputMode="numeric" value={f.cep} onChange={set("cep")} />
              <Field label="Rua *" name="rua" value={f.rua} onChange={set("rua")} />
              <Field label="Número *" name="numero" value={f.numero} onChange={set("numero")} />
              <Field label="Complemento" name="complemento" value={f.complemento} onChange={set("complemento")} />
              <Field label="Bairro *" name="bairro" value={f.bairro} onChange={set("bairro")} />
              <Field label="Cidade *" name="cidade" value={f.cidade} onChange={set("cidade")} />
              <Field label="Estado *" name="estado" value={f.estado} onChange={set("estado")} />
            </div>
            <div className="lv-between">
              <Link to="/carrinho" className="lv-btn lv-btn--ghost">Voltar</Link>
              <button className="lv-btn lv-btn--primary lv-btn--lg">Continuar</button>
            </div>
          </form>
          <OrderSummary />
        </div>
      </div>
    </>
  );
}
