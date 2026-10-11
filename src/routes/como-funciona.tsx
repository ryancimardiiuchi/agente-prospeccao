import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/lavo/PageHeader";
import { ProcessSteps } from "@/components/lavo/ProcessSteps";
import { ETAPAS_PEDIDO } from "@/data/exemplos";
import { Link } from "@/lib/nav";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/como-funciona")({
  head: () => seo("Como funciona", "Do pedido à entrega: veja o passo a passo da Lavô+."),
  component: ComoFunciona,
});

function ComoFunciona() {
  return (
    <>
      <PageHeader eyebrow="Passo a passo" title="Como funciona" subtitle="Você pede pelo site, nós coletamos, lavamos e entregamos." />
      <section className="lv-section">
        <div className="lv-container">
          <ProcessSteps />
        </div>
      </section>
      <section className="lv-section lv-section--alt">
        <div className="lv-container">
          <h2>Status do pedido</h2>
          <p className="lv-lead">Acompanhe em qual etapa está o seu pedido.</p>
          <ol className="lv-timeline">
            {ETAPAS_PEDIDO.map((e, i) => (
              <li key={e}>
                <span className="lv-timeline__dot">{i + 1}</span>
                <div><strong>{e}</strong></div>
              </li>
            ))}
          </ol>
          <Link to="/servicos" className="lv-btn lv-btn--primary lv-btn--lg">Começar pedido</Link>
        </div>
      </section>
    </>
  );
}
