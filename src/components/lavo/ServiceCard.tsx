import { useEffect, useState } from "react";
import { Check, Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { precoLabel, type Servico } from "@/data/servicos";
import { ServiceIcon } from "./ServiceIcon";

/** Botão "Adicionar ao pedido" com microinteração de confirmação. */
export function AddToCartButton({ servico, className = "" }: { servico: Servico; className?: string }) {
  const { add } = useCart();
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!done) return;
    const t = setTimeout(() => setDone(false), 1400);
    return () => clearTimeout(t);
  }, [done]);

  return (
    <button
      type="button"
      className={`lv-btn lv-btn--primary ${done ? "is-done" : ""} ${className}`}
      onClick={() => {
        add(servico);
        setDone(true);
      }}
    >
      {done ? <Check size={18} /> : <Plus size={18} />}
      {done ? "Adicionado" : "Adicionar ao pedido"}
    </button>
  );
}

export function ServiceCard({ servico }: { servico: Servico }) {
  return (
    <article className="lv-card lv-service">
      <div className="lv-service__icon">
        <ServiceIcon name={servico.icone} />
      </div>
      <h3>{servico.nome}</h3>
      <p className="lv-service__desc">{servico.descricao}</p>
      <div className="lv-service__foot">
        <span className="lv-price">{precoLabel(servico)}</span>
        <AddToCartButton servico={servico} />
      </div>
    </article>
  );
}
