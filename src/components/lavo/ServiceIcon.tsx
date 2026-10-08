import { BedDouble, Blinds, Footprints, Shirt, Sparkles, WashingMachine, type LucideIcon } from "lucide-react";
import type { ServicoIcone } from "@/data/servicos";

const ICONS: Record<ServicoIcone, LucideIcon> = {
  lavagem: WashingMachine,
  passadoria: Shirt,
  seco: Sparkles,
  tenis: Footprints,
  edredom: BedDouble,
  cortinas: Blinds,
};

export function ServiceIcon({ name, size = 26 }: { name: ServicoIcone; size?: number }) {
  const Icon = ICONS[name] ?? WashingMachine;
  return <Icon size={size} strokeWidth={1.8} aria-hidden="true" />;
}
