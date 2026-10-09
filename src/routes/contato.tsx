import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/lavo/PageHeader";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/contato")({
  head: () => seo("Contato", "Fale com a Lavô+."),
  component: ContatoPage,
});

function ContatoPage() {
  return <PageHeader title="Contato" subtitle="Fale com a Lavô+." />;
}
