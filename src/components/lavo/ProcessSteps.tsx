import {
  CalendarDays,
  CreditCard,
  ListChecks,
  MapPin,
  PackageCheck,
  ShoppingBag,
  Timer,
  Truck,
} from "lucide-react";
import { Reveal } from "./Reveal";

const PASSOS = [
  { icon: ListChecks, titulo: "Escolha seus serviços", texto: "Veja os serviços e os preços com clareza." },
  { icon: ShoppingBag, titulo: "Monte seu pedido", texto: "Ajuste quantidades e confira o total." },
  { icon: MapPin, titulo: "Informe seu endereço", texto: "Diga onde coletamos e entregamos." },
  { icon: CalendarDays, titulo: "Escolha data e horário", texto: "Veja os horários disponíveis." },
  { icon: Timer, titulo: "Agende a coleta", texto: "Confirme e relaxe." },
  { icon: CreditCard, titulo: "Faça o pagamento", texto: "Revise o resumo antes de pagar." },
  { icon: Truck, titulo: "Acompanhe seu pedido", texto: "Veja cada etapa em tempo real." },
  { icon: PackageCheck, titulo: "Receba suas roupas", texto: "Limpas e prontas para você." },
];

export function ProcessSteps() {
  return (
    <ol className="lv-process">
      {PASSOS.map((p, i) => (
        <Reveal as="li" key={p.titulo} delay={(i % 4) * 80} className="lv-process__item">
          <span className="lv-process__num">{i + 1}</span>
          <span className="lv-process__icon">
            <p.icon size={24} strokeWidth={1.8} />
          </span>
          <h3>{p.titulo}</h3>
          <p>{p.texto}</p>
        </Reveal>
      ))}
    </ol>
  );
}
