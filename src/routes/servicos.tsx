import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Notice } from "@/components/lavo/PageHeader";
import { ServiceCard } from "@/components/lavo/ServiceCard";
import { useServicos } from "@/hooks/useServicos";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/servicos")({
  head: () => seo("Serviços", "Lavagem, passadoria, lavagem a seco, tênis, edredom e cortinas."),
  component: ServicosPage,
});

function ServicosPage() {
  const { servicos, origem } = useServicos();
  return (
    <>
      <PageHeader eyebrow="Serviços" title="Nossos serviços" subtitle="Escolha o que precisa e adicione ao seu pedido." />
      <section className="lv-section">
        <div className="lv-container">
          {origem === "referencia" && (
            <Notice kind="warn">Servidor indisponível: exibindo a tabela de referência dos serviços.</Notice>
          )}
          <div className="lv-grid">
            {servicos.map((s) => (
              <ServiceCard key={s.id} servico={s} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
