import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/lavo/PageHeader";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/admin")({
  head: () => seo("Área administrativa", "Painel exclusivo para administradores."),
  component: AdminPage,
});

function AdminPage() {
  return <PageHeader title="Área administrativa" subtitle="Painel exclusivo para administradores." />;
}
