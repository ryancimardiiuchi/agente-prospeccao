import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/lavo/PageHeader";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/servicos")({
  head: () => seo("Serviços", "Veja os serviços da Lavô+ e seus preços."),
  component: ServicosPage,
});

function ServicosPage() {
  return <PageHeader title="Serviços" subtitle="Veja os serviços da Lavô+ e seus preços." />;
}
