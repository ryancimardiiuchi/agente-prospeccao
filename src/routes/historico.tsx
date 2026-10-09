import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/lavo/PageHeader";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/historico")({
  head: () => seo("Histórico de pedidos", "Veja seus pedidos anteriores."),
  component: HistoricoPage,
});

function HistoricoPage() {
  return <PageHeader title="Histórico de pedidos" subtitle="Veja seus pedidos anteriores." />;
}
