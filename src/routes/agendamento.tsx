import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Notice, IntegrationNote } from "@/components/lavo/PageHeader";
import { Stepper } from "@/components/lavo/Stepper";
import { OrderSummary } from "@/components/lavo/OrderSummary";
import { RequireAuth } from "@/components/lavo/RequireAuth";
import { useCheckout } from "@/context/CheckoutContext";
import { Link, useGo } from "@/lib/nav";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/agendamento")({
  head: () => seo("Agendamento", "Escolha a data e o horário da coleta."),
  component: () => <RequireAuth><Agendamento /></RequireAuth>,
});

/** Exemplo ilustrativo — substituir pelos horários retornados pela API. */
const HORARIOS_EXEMPLO = ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00"];
const DIAS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

function Agendamento() {
  const { endereco, data, setData, horario, setHorario } = useCheckout();
  const go = useGo();
  const [erro, setErro] = useState("");
  useEffect(() => { if (!endereco) go("/endereco"); }, [endereco, go]);

  const dias = useMemo(() => {
    const out: { iso: string; dia: string; label: string }[] = [];
    const d = new Date();
    for (let i = 1; i <= 7; i++) {
      const x = new Date(d.getFullYear(), d.getMonth(), d.getDate() + i);
      const iso = `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, "0")}-${String(x.getDate()).padStart(2, "0")}`;
      out.push({ iso, dia: DIAS[x.getDay()], label: `${String(x.getDate()).padStart(2, "0")}/${String(x.getMonth() + 1).padStart(2, "0")}` });
    }
    return out;
  }, []);

  const continuar = () => {
    if (!data || !horario) return setErro("Escolha a data e o horário da coleta.");
    go("/pagamento");
  };

  return (
    <>
      <PageHeader eyebrow="Pedido" title="Agende a coleta" />
      <div className="lv-container lv-flow">
        <Stepper atual={3} />
        <div className="lv-flow__grid">
          <div className="lv-card">
            {erro && <Notice kind="error">{erro}</Notice>}
            <h3>Data</h3>
            <div className="lv-options" style={{ margin: "12px 0 26px" }}>
              {dias.map((d) => (
                <button key={d.iso} type="button" className={`lv-option ${data === d.iso ? "is-selected" : ""}`} onClick={() => setData(d.iso)}>
                  <small>{d.dia}</small>{d.label}
                </button>
              ))}
            </div>
            <div className="lv-between"><h3>Horário</h3><span className="lv-tag">Exemplo ilustrativo</span></div>
            <div className="lv-options" style={{ margin: "12px 0 26px" }}>
              {HORARIOS_EXEMPLO.map((h) => (
                <button key={h} type="button" className={`lv-option ${horario === h ? "is-selected" : ""}`} onClick={() => setHorario(h)}>{h}</button>
              ))}
            </div>
            <IntegrationNote>horários disponíveis devem vir da API (endpoint ainda não informado).</IntegrationNote>
            <div className="lv-between" style={{ marginTop: 20 }}>
              <Link to="/endereco" className="lv-btn lv-btn--ghost">Voltar</Link>
              <button className="lv-btn lv-btn--primary lv-btn--lg" onClick={continuar}>Agendar e continuar</button>
            </div>
          </div>
          <OrderSummary />
        </div>
      </div>
    </>
  );
}
