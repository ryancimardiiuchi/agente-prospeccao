import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/lavo/PageHeader";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/perfil")({
  head: () => seo("Meu perfil", "Seus dados na Lavô+."),
  component: PerfilPage,
});

function PerfilPage() {
  return <PageHeader title="Meu perfil" subtitle="Seus dados na Lavô+." />;
}
