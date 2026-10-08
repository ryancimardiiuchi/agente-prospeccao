/**
 * Tabela de referência dos serviços do Lavô+ (briefing).
 * É usada como visual quando a API (GET /servicos) não está acessível e para
 * completar ícone/descrição dos serviços recebidos da API.
 * A fonte da verdade continua sendo a API.
 */
export type ServicoIcone = "lavagem" | "passadoria" | "seco" | "tenis" | "edredom" | "cortinas";

export interface Servico {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  /** "kg", "peça", "par" ou "" (preço por unidade). */
  unidade: string;
  icone: ServicoIcone;
}

export const SERVICOS_REFERENCIA: Servico[] = [
  {
    id: "lavagem",
    nome: "Lavagem",
    descricao: "Lavagem e secagem do dia a dia, com cuidado e cheirinho de limpo.",
    preco: 15,
    unidade: "kg",
    icone: "lavagem",
  },
  {
    id: "passadoria",
    nome: "Passadoria",
    descricao: "Peças passadas e prontas para guardar ou vestir.",
    preco: 8,
    unidade: "peça",
    icone: "passadoria",
  },
  {
    id: "lavagem-a-seco",
    nome: "Lavagem a seco",
    descricao: "Para roupas delicadas e peças que não podem ser lavadas na água.",
    preco: 20,
    unidade: "peça",
    icone: "seco",
  },
  {
    id: "tenis",
    nome: "Tênis",
    descricao: "Limpeza cuidadosa para o seu tênis voltar com cara de novo.",
    preco: 25,
    unidade: "par",
    icone: "tenis",
  },
  {
    id: "edredom",
    nome: "Edredom",
    descricao: "Edredons limpos e macios, sem ocupar a sua máquina nem o seu fim de semana.",
    preco: 35,
    unidade: "",
    icone: "edredom",
  },
  {
    id: "cortinas",
    nome: "Cortinas",
    descricao: "Cortinas limpas sem você precisar subir na escada.",
    preco: 20,
    unidade: "kg",
    icone: "cortinas",
  },
];

const norm = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

/**
 * Converte um serviço vindo da API para o formato da interface.
 * CONFIRMAR nomes dos campos reais (aqui aceitamos nome/name, preco/price...).
 */
export function normalizarServico(raw: Record<string, unknown>, index: number): Servico {
  const nome = String(raw.nome ?? raw.name ?? raw.titulo ?? `Serviço ${index + 1}`);
  const ref = SERVICOS_REFERENCIA.find((s) => norm(s.nome) === norm(nome));
  const preco = Number(raw.preco ?? raw.price ?? raw.valor ?? ref?.preco ?? 0);
  return {
    id: String(raw.id ?? raw._id ?? ref?.id ?? nome),
    nome,
    descricao: String(raw.descricao ?? raw.description ?? ref?.descricao ?? ""),
    preco: Number.isFinite(preco) ? preco : 0,
    unidade: String(raw.unidade ?? raw.unit ?? ref?.unidade ?? ""),
    icone: ref?.icone ?? "lavagem",
  };
}

export const brl = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: v % 1 ? 2 : 0 });

export const precoLabel = (s: Pick<Servico, "preco" | "unidade">) =>
  `${brl(s.preco)}${s.unidade ? `/${s.unidade}` : ""}`;
