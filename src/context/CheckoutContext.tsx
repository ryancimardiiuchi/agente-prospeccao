import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export interface Endereco {
  cep: string;
  rua: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
}

export const ENDERECO_VAZIO: Endereco = {
  cep: "",
  rua: "",
  numero: "",
  complemento: "",
  bairro: "",
  cidade: "",
  estado: "",
};

interface CheckoutValue {
  endereco: Endereco | null;
  setEndereco: (e: Endereco | null) => void;
  /** AAAA-MM-DD */
  data: string | null;
  setData: (d: string | null) => void;
  horario: string | null;
  setHorario: (h: string | null) => void;
}

const CheckoutContext = createContext<CheckoutValue | null>(null);

/** Guarda as escolhas do fluxo carrinho → endereço → agendamento → pagamento. */
export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [endereco, setEndereco] = useState<Endereco | null>(null);
  const [data, setData] = useState<string | null>(null);
  const [horario, setHorario] = useState<string | null>(null);
  const value = useMemo(
    () => ({ endereco, setEndereco, data, setData, horario, setHorario }),
    [endereco, data, horario],
  );
  return <CheckoutContext.Provider value={value}>{children}</CheckoutContext.Provider>;
}

export function useCheckout() {
  const ctx = useContext(CheckoutContext);
  if (!ctx) throw new Error("useCheckout precisa estar dentro de <CheckoutProvider>");
  return ctx;
}
