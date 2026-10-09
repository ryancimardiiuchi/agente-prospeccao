import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/lavo/PageHeader";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/como-funciona")({
  head: () => seo("Como funciona", "Do pedido à entrega, em oito passos simples."),
  component: ComoFuncionaPage,
});

function ComoFuncionaPage() {
  return <PageHeader title="Como funciona" subtitle="Do pedido à entrega, em oito passos simples." />;
}
