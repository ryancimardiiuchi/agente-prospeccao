import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/lavo/PageHeader";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/chat")({
  head: () => seo("Chat com a administração", "Converse com a equipe da Lavô+."),
  component: ChatPage,
});

function ChatPage() {
  return <PageHeader title="Chat com a administração" subtitle="Converse com a equipe da Lavô+." />;
}
