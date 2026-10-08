import { Check } from "lucide-react";

const ETAPAS = ["Pedido", "Endereço", "Agendamento", "Pagamento", "Acompanhamento"];

/** Mostra ao usuário onde ele está no fluxo do pedido (1 a 5). */
export function Stepper({ atual }: { atual: 1 | 2 | 3 | 4 | 5 }) {
  return (
    <ol className="lv-stepper" aria-label="Etapas do pedido">
      {ETAPAS.map((nome, i) => {
        const n = i + 1;
        const state = n < atual ? "done" : n === atual ? "current" : "todo";
        return (
          <li key={nome} className={`lv-stepper__item is-${state}`} aria-current={state === "current" ? "step" : undefined}>
            <span className="lv-stepper__dot">{state === "done" ? <Check size={14} /> : n}</span>
            <span className="lv-stepper__label">{nome}</span>
          </li>
        );
      })}
    </ol>
  );
}
