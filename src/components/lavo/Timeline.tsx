import { Check } from "lucide-react";
import { ETAPAS_PEDIDO } from "@/data/exemplos";

export function Timeline({ atual, horarios = {} }: { atual: number; horarios?: Record<number, string> }) {
  return (
    <ol className="lv-timeline">
      {ETAPAS_PEDIDO.map((e, i) => {
        const st = i < atual ? "is-done" : i === atual ? "is-current" : "";
        return (
          <li key={e} className={st} aria-current={i === atual ? "step" : undefined}>
            <span className="lv-timeline__dot">{i < atual ? <Check size={16} /> : i + 1}</span>
            <div>
              <strong>{e}</strong>
              {horarios[i] && <div className="lv-muted" style={{ fontSize: ".85rem" }}>{horarios[i]}</div>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
