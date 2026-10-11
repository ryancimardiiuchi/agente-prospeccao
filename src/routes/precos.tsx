import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/lavo/PageHeader";
import { AddToCartButton } from "@/components/lavo/ServiceCard";
import { useServicos } from "@/hooks/useServicos";
import { precoLabel } from "@/data/servicos";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/precos")({
  head: () => seo("Preços", "Tabela de preços da Lavô+ por quilo, peça ou par."),
  component: PrecosPage,
});

function PrecosPage() {
  const { servicos } = useServicos();
  return (
    <>
      <PageHeader eyebrow="Preços" title="Tabela de preços" subtitle="Valores por quilo, peça ou par. A taxa de entrega aparece no resumo do pedido." />
      <section className="lv-section">
        <div className="lv-container">
          <div className="lv-card lv-table-wrap">
            <table className="lv-table">
              <thead>
                <tr><th>Serviço</th><th>Descrição</th><th>Preço</th><th /></tr>
              </thead>
              <tbody>
                {servicos.map((s) => (
                  <tr key={s.id}>
                    <td><strong>{s.nome}</strong></td>
                    <td className="lv-muted">{s.descricao}</td>
                    <td className="lv-price">{precoLabel(s)}</td>
                    <td><AddToCartButton servico={s} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
