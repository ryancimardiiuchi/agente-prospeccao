import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/lavo/PageHeader";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/login")({
  head: () => seo("Entrar", "Acesse sua conta na Lavô+."),
  component: LoginPage,
});

function LoginPage() {
  return <PageHeader title="Entrar" subtitle="Acesse sua conta na Lavô+." />;
}
