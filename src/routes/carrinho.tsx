import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/lavo/PageHeader";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/carrinho")({
  head: () => seo("Meu pedido", "Confira os serviços do seu pedido."),
  component: CarrinhoPage,
});

function CarrinhoPage() {
  return <PageHeader title="Meu pedido" subtitle="Confira os serviços do seu pedido." />;
}
