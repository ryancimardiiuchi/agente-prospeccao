/**
 * DADOS DE EXEMPLO (somente visual) — vêm do briefing.
 * Substituir pelos dados reais quando os endpoints de pedidos estiverem
 * confirmados. As telas que usam estes dados exibem o aviso "Exemplo ilustrativo".
 */
export const ETAPAS_PEDIDO = [
  "Pedido realizado",
  "Coleta agendada",
  "Coletado",
  "Em processamento",
  "Pronto",
  "Em entrega",
  "Finalizado",
] as const;

export const PEDIDO_EXEMPLO = {
  numero: 1024,
  /** índice da etapa atual em ETAPAS_PEDIDO */
  etapaAtual: 3,
  horarios: {
    2: "22/08 10:00",
    3: "22/08 11:30",
  } as Record<number, string>,
  entregaPrevista: "Hoje 18:30",
  itens: [
    { nome: "Lavagem", detalhe: "5 kg × R$ 15", subtotal: 75 },
    { nome: "Passadoria", detalhe: "2 peças × R$ 8", subtotal: 16 },
  ],
  taxa: 5,
  total: 96,
  status: "Em processamento",
  data: "22/08",
};
