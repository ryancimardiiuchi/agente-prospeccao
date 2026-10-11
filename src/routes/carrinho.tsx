import { createFileRoute } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/lavo/PageHeader";
import { Stepper } from "@/components/lavo/Stepper";
import { OrderSummary } from "@/components/lavo/OrderSummary";
import { ServiceIcon } from "@/components/lavo/ServiceIcon";
import { useCart } from "@/context/CartContext";
import { brl } from "@/data/servicos";
import { useServicos } from "@/hooks/useServicos";
import { Link } from "@/lib/nav";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/carrinho")({
  head: () => seo("Meu pedido", "Revise os serviços escolhidos e ajuste as quantidades."),
  component: Carrinho,
});

function Carrinho() {
  const { itens, setQuantidade, remove } = useCart();
  const { servicos } = useServicos();
  const icone = (id: string) => servicos.find((s) => s.id === id)?.icone ?? "lavagem";

  return (
    <>
      <PageHeader eyebrow="Pedido" title="Meu pedido" />
      <div className="lv-container lv-flow">
        <Stepper atual={1} />
        {itens.length === 0 ? (
          <div className="lv-card lv-empty" style={{ marginTop: 28 }}>
            <ShoppingBag size={44} />
            <h3>Seu pedido está vazio</h3>
            <p style={{ margin: "6px 0 18px" }}>Escolha os serviços que você precisa.</p>
            <Link to="/servicos" className="lv-btn lv-btn--primary">Ver serviços</Link>
          </div>
        ) : (
          <div className="lv-flow__grid">
            <div className="lv-card">
              {itens.map((i) => (
                <div key={i.servicoId} className="lv-cartitem">
                  <div className="lv-service__icon"><ServiceIcon icone={icone(i.servicoId)} /></div>
                  <div className="lv-cartitem__info">
                    <strong>{i.nome}</strong>
                    <div className="lv-muted" style={{ fontSize: ".88rem" }}>{brl(i.preco)}{i.unidade ? ` / ${i.unidade}` : ""}</div>
                  </div>
                  <div className="lv-qty">
                    <button aria-label="Diminuir" onClick={() => setQuantidade(i.servicoId, i.quantidade - 1)}><Minus size={16} /></button>
                    <span>{i.quantidade}</span>
                    <button aria-label="Aumentar" onClick={() => setQuantidade(i.servicoId, i.quantidade + 1)}><Plus size={16} /></button>
                  </div>
                  <strong style={{ minWidth: 90, textAlign: "right" }}>{brl(i.preco * i.quantidade)}</strong>
                  <button className="lv-icon-btn" aria-label={`Remover ${i.nome}`} onClick={() => remove(i.servicoId)}><Trash2 size={18} /></button>
                </div>
              ))}
              <Link to="/servicos" className="lv-link" style={{ display: "inline-block", marginTop: 12 }}>+ Adicionar mais serviços</Link>
            </div>
            <OrderSummary>
              <Link to="/endereco" className="lv-btn lv-btn--primary lv-btn--block lv-btn--lg">Continuar</Link>
            </OrderSummary>
          </div>
        )}
      </div>
    </>
  );
}
