import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, IntegrationNote } from "@/components/lavo/PageHeader";
import { Stepper } from "@/components/lavo/Stepper";
import { Timeline } from "@/components/lavo/Timeline";
import { RequireAuth } from "@/components/lavo/RequireAuth";
import { PEDIDO_EXEMPLO as P } from "@/data/exemplos";
import { brl } from "@/data/servicos";
import { Link } from "@/lib/nav";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/acompanhamento")({
  head: () => seo("Acompanhar pedido", "Veja em qual etapa está o seu pedido."),
  component: () => <RequireAuth><Acompanhamento /></RequireAuth>,
});

function Acompanhamento() {
  return (
    <>
      <PageHeader eyebrow="Pedido" title={`Pedido nº ${P.numero}`} subtitle={`Entrega prevista: ${P.entregaPrevista}`} />
      <div className="lv-container lv-flow">
        <Stepper atual={5} />
        <div className="lv-flow__grid">
          <div className="lv-card">
            <div className="lv-between" style={{ marginBottom: 20 }}>
              <h3>Status</h3><span className="lv-tag">Exemplo ilustrativo</span>
            </div>
            <Timeline atual={P.etapaAtual} horarios={P.horarios} />
            <IntegrationNote>status real do pedido depende do endpoint de pedidos (ainda não informado).</IntegrationNote>
          </div>
          <aside className="lv-card lv-summary">
            <h3>Itens</h3>
            <dl>
              {P.itens.map((i) => (
                <div key={i.nome}><dt className="lv-muted">{i.nome} <small>({i.detalhe})</small></dt><dd>{brl(i.subtotal)}</dd></div>
              ))}
              <div><dt className="lv-muted">Taxa de entrega</dt><dd>{brl(P.taxa)}</dd></div>
              <div className="lv-total"><dt>Total</dt><dd>{brl(P.total)}</dd></div>
            </dl>
            <Link to="/chat" className="lv-btn lv-btn--ghost lv-btn--block">Falar com atendimento</Link>
          </aside>
        </div>
      </div>
    </>
  );
}
