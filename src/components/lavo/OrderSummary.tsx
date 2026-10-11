import type { ReactNode } from "react";
import { useCart } from "@/context/CartContext";
import { useCheckout } from "@/context/CheckoutContext";
import { brl } from "@/data/servicos";

/** Resumo lateral do pedido usado no carrinho, endereço, agendamento e pagamento. */
export function OrderSummary({ children }: { children?: ReactNode }) {
  const { itens, subtotal, taxa, total } = useCart();
  const { endereco, data, horario } = useCheckout();
  return (
    <aside className="lv-card lv-summary">
      <h3>Resumo do pedido</h3>
      <dl>
        {itens.map((i) => (
          <div key={i.servicoId}>
            <dt className="lv-muted">{i.nome} × {i.quantidade}</dt>
            <dd>{brl(i.preco * i.quantidade)}</dd>
          </div>
        ))}
        <div><dt className="lv-muted">Subtotal</dt><dd>{brl(subtotal)}</dd></div>
        <div><dt className="lv-muted">Taxa de entrega</dt><dd>{taxa ? brl(taxa) : "Informada pelo sistema"}</dd></div>
        <div className="lv-total"><dt>Total</dt><dd>{brl(total)}</dd></div>
      </dl>
      {endereco && <p className="lv-muted" style={{ fontSize: ".88rem" }}>📍 {endereco.rua}, {endereco.numero} — {endereco.bairro}</p>}
      {data && horario && <p className="lv-muted" style={{ fontSize: ".88rem" }}>🗓 {data.split("-").reverse().join("/")} às {horario}</p>}
      {children}
    </aside>
  );
}
