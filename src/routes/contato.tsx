import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { PageHeader } from "@/components/lavo/PageHeader";
import { Link } from "@/lib/nav";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/contato")({
  head: () => seo("Contato", "Fale com a Lavô+ pelo chat de atendimento."),
  component: Contato,
});

function Contato() {
  return (
    <>
      <PageHeader eyebrow="Contato" title="Fale com a gente" subtitle="Tire dúvidas sobre serviços, pedidos e entregas." />
      <section className="lv-section">
        <div className="lv-container lv-grid--2">
          <div className="lv-card">
            <div className="lv-service__icon"><MessageCircle /></div>
            <h3 style={{ marginTop: 14 }}>Chat de atendimento</h3>
            <p className="lv-muted" style={{ margin: "6px 0 18px" }}>Entre na sua conta e converse com nossa equipe.</p>
            <Link to="/chat" className="lv-btn lv-btn--primary">Abrir chat</Link>
          </div>
          <div className="lv-card lv-faq">
            <h3>Perguntas frequentes</h3>
            <details><summary>Como faço um pedido?</summary><p>Escolha os serviços, informe o endereço, agende a coleta e pague.</p></details>
            <details><summary>Como acompanho meu pedido?</summary><p>Em "Meus pedidos" você vê a etapa atual de cada pedido.</p></details>
            <details><summary>Qual a taxa de entrega?</summary><p>A taxa aparece no resumo antes do pagamento.</p></details>
          </div>
        </div>
      </section>
    </>
  );
}
