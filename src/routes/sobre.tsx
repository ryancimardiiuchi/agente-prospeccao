import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/lavo/PageHeader";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/sobre")({
  head: () => seo("Sobre nós", "Conheça a Lavô+ Lavanderia Online."),
  component: SobrePage,
});

function SobrePage() {
  return <PageHeader title="Sobre nós" subtitle="Conheça a Lavô+ Lavanderia Online." />;
}
