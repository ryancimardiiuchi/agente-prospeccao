import { createFileRoute } from "@tanstack/react-router";
import { Clock, ShieldCheck, Truck } from "lucide-react";
import { PageHeader } from "@/components/lavo/PageHeader";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/sobre")({
  head: () => seo("Sobre nós", "Conheça a Lavô+, a lavanderia online que leva praticidade para sua rotina."),
  component: Sobre,
});

const VALORES = [
  { icon: Clock, t: "Praticidade", d: "Você agenda pelo site, sem sair de casa." },
  { icon: ShieldCheck, t: "Transparência", d: "Preços claros e acompanhamento de cada etapa." },
  { icon: Truck, t: "Coleta e entrega", d: "Buscamos e devolvemos no endereço que você escolher." },
];

function Sobre() {
  return (
    <>
      <PageHeader eyebrow="Sobre nós" title="Lavô+" subtitle="Você chega em casa. A roupa não precisa chegar com você." />
      <section className="lv-section">
        <div className="lv-container lv-grid">
          {VALORES.map(({ icon: Icon, t, d }) => (
            <div key={t} className="lv-card">
              <div className="lv-service__icon"><Icon /></div>
              <h3 style={{ marginTop: 14 }}>{t}</h3>
              <p className="lv-muted">{d}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
