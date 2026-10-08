import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Servico } from "@/data/servicos";

export interface ItemCarrinho {
  servicoId: string;
  nome: string;
  preco: number;
  unidade: string;
  quantidade: number;
}

interface CartValue {
  itens: ItemCarrinho[];
  count: number;
  subtotal: number;
  /** Taxa informada pela API. A interface não calcula nem inventa taxas. */
  taxa: number;
  total: number;
  add: (s: Servico, quantidade?: number) => void;
  setQuantidade: (servicoId: string, quantidade: number) => void;
  remove: (servicoId: string) => void;
  clear: () => void;
}

const KEY = "lavo_cart";
const CartContext = createContext<CartValue | null>(null);

/**
 * INTEGRAÇÃO (carrinho): hoje o carrinho fica no navegador para a interface
 * funcionar. Quando o formato de GET/POST/PUT/DELETE /carrinho for confirmado,
 * sincronize estas funções com `carrinhoApi` (src/lib/api.ts) e preencha `taxa`
 * com o valor retornado pela API.
 */
export function CartProvider({ children }: { children: ReactNode }) {
  const [itens, setItens] = useState<ItemCarrinho[]>([]);
  const [taxa] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) setItens(JSON.parse(raw));
    } catch {
      /* ignora */
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) window.localStorage.setItem(KEY, JSON.stringify(itens));
  }, [itens, loaded]);

  const add = useCallback((s: Servico, quantidade = 1) => {
    setItens((cur) => {
      const found = cur.find((i) => i.servicoId === s.id);
      if (found) {
        return cur.map((i) => (i.servicoId === s.id ? { ...i, quantidade: i.quantidade + quantidade } : i));
      }
      return [...cur, { servicoId: s.id, nome: s.nome, preco: s.preco, unidade: s.unidade, quantidade }];
    });
  }, []);

  const setQuantidade = useCallback((servicoId: string, quantidade: number) => {
    setItens((cur) =>
      cur.map((i) => (i.servicoId === servicoId ? { ...i, quantidade: Math.max(1, quantidade) } : i)),
    );
  }, []);

  const remove = useCallback((servicoId: string) => {
    setItens((cur) => cur.filter((i) => i.servicoId !== servicoId));
  }, []);

  const clear = useCallback(() => setItens([]), []);

  const value = useMemo<CartValue>(() => {
    const subtotal = itens.reduce((acc, i) => acc + i.preco * i.quantidade, 0);
    return {
      itens,
      count: itens.length,
      subtotal,
      taxa,
      total: subtotal + taxa,
      add,
      setQuantidade,
      remove,
      clear,
    };
  }, [itens, taxa, add, setQuantidade, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart precisa estar dentro de <CartProvider>");
  return ctx;
}
