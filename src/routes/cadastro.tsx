import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/lavo/PageHeader";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/cadastro")({
  head: () => seo("Criar conta", "Crie sua conta na Lavô+."),
  component: CadastroPage,
});

function CadastroPage() {
  return <PageHeader title="Criar conta" subtitle="Crie sua conta na Lavô+." />;
}
