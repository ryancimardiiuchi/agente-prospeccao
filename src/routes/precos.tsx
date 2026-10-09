import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/lavo/PageHeader";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/precos")({
  head: () => seo("Preços", "Preços claros para cada serviço da Lavô+."),
  component: PrecosPage,
});

function PrecosPage() {
  return <PageHeader title="Preços" subtitle="Preços claros para cada serviço da Lavô+." />;
}
