import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CreditCard, QrCode, Wallet } from "lucide-react";
import { PageHeader, Notice, IntegrationNote } from "@/components/lavo/PageHeader";
import { Stepper } from "@/components/lavo/Stepper";
import { OrderSummary } from "@/components/lavo/OrderSummary";
import { RequireAuth } from "@/components/lavo/RequireAuth";
import { useCheckout } from "@/context/CheckoutContext";
import { useCart } from "@/context/CartContext";
import { Link, useGo } from "@/lib/nav";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/pagamento")({
  head: () => seo("Pagamento", "Revise o resumo e finalize o pedido."),
  component: () => <RequireAuth><Pagamento /></RequireAuth>,
});

const FORMAS = [
  { id: "pix", label: "Pix", icon: QrCode },
  { id: "cartao", label: "Cartão", icon: CreditCard },
  { id: "entrega", label: "Na entrega", icon: Wallet },
];

function Pagamento() {
  const { data, horario, setData, setHorario, setEndereco } = useCheckout();
  const { clear } = useCart();
  const go = useGo();
  const [forma, setForma] = useState("");
  const [erro, setErro] = useState("");
  useEffect(() => { if (!data || !horario) go("/agendamento"); }, [data, horario, go]);

  const confirmar = () => {
    if (!forma) return setErro("Escolha a forma de pagamento.");
    // INTEGRAÇÃO: enviar o pedido/pagamento para a API quando o endpoint for informado.
    clear(); setData(null); setHorario(null); setEndereco(null);
    go("/acompanhamento");
  };

  return (
    <>
      <PageHeader eyebrow="Pedido" title="Pagamento" />
      <div className="lv-container lv-flow">
        <Stepper atual={4} />
        <div className="lv-flow__grid">
          <div className="lv-card">
            {erro && <Notice kind="error">{erro}</Notice>}
            <h3>Forma de pagamento</h3>
            <div className="lv-options" style={{ margin: "12px 0 20px" }}>
              {FORMAS.map(({ id, label, icon: Icon }) => (
                <button key={id} type="button" className={`lv-option ${forma === id ? "is-selected" : ""}`} onClick={() => setForma(id)}>
                  <Icon style={{ margin: "0 auto 6px" }} />{label}
                </button>
              ))}
            </div>
            <IntegrationNote>endpoint de pedido/pagamento ainda não informado — ao confirmar, a tela de acompanhamento mostra um exemplo.</IntegrationNote>
            <div className="lv-between" style={{ marginTop: 20 }}>
              <Link to="/agendamento" className="lv-btn lv-btn--ghost">Voltar</Link>
              <button className="lv-btn lv-btn--primary lv-btn--lg" onClick={confirmar}>Confirmar pedido</button>
            </div>
          </div>
          <OrderSummary />
        </div>
      </div>
    </>
  );
}
