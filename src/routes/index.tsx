import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import poster from "@/assets/hero-poster.jpg";
import { Link } from "@/lib/nav";
import { seo } from "@/lib/seo";
import { Reveal } from "@/components/lavo/Reveal";
import { ServiceCard } from "@/components/lavo/ServiceCard";
import { ProcessSteps } from "@/components/lavo/ProcessSteps";
import { useServicos } from "@/hooks/useServicos";
import { ETAPAS_PEDIDO } from "@/data/exemplos";

export const Route = createFileRoute("/")({
  head: () => seo("Início", "Lavanderia online: escolha os serviços, agende a coleta e receba suas roupas limpas em casa."),
  component: Home,
});

function Home() {
  const { servicos } = useServicos();
  return (
    <>
      <section className="lv-hero">
        {/* Vídeo: coloque o arquivo em public/videos/hero-lavanderia.mp4 */}
        <video className="lv-hero__media" autoPlay muted loop playsInline poster={poster}>
          <source src="/videos/hero-lavanderia.mp4" type="video/mp4" />
        </video>
        <div className="lv-container">
          <div className="lv-hero__content">
            <span className="lv-eyebrow">Lavanderia online</span>
            <h1>Você chega em casa. A roupa não precisa chegar com você.</h1>
            <p>Escolha os serviços, agende a coleta e acompanhe cada etapa do seu pedido.</p>
            <div className="lv-row">
              <Link to="/servicos" className="lv-btn lv-btn--primary lv-btn--lg">
                Fazer pedido <ArrowRight size={18} />
              </Link>
              <Link to="/como-funciona" className="lv-btn lv-btn--outline-light lv-btn--lg">
                Como funciona
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="lv-section">
        <div className="lv-container">
          <span className="lv-eyebrow">Serviços</span>
          <h2>O que cuidamos para você</h2>
          <p className="lv-lead">Preços claros, sem surpresa.</p>
          <div className="lv-grid">
            {servicos.slice(0, 6).map((s, i) => (
              <Reveal key={s.id} delay={i * 60}>
                <ServiceCard servico={s} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="lv-section lv-section--alt">
        <div className="lv-container">
          <span className="lv-eyebrow">Passo a passo</span>
          <h2>Como funciona</h2>
          <p className="lv-lead">Do pedido à entrega, em 8 passos.</p>
          <ProcessSteps />
        </div>
      </section>

      <section className="lv-section">
        <div className="lv-container">
          <span className="lv-eyebrow">Acompanhamento</span>
          <h2>Você sabe onde está sua roupa</h2>
          <p className="lv-lead">Cada pedido passa por estas etapas:</p>
          <div className="lv-row">
            {ETAPAS_PEDIDO.map((e, i) => (
              <span key={e} className={`lv-status ${i === ETAPAS_PEDIDO.length - 1 ? "lv-status--ok" : ""}`}>
                {i + 1}. {e}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="lv-section">
        <div className="lv-container">
          <div className="lv-cta">
            <h2>Pronto para ter mais tempo livre?</h2>
            <p>Crie sua conta e faça o primeiro pedido.</p>
            <Link to="/cadastro" className="lv-btn lv-btn--light lv-btn--lg">
              Criar conta
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
