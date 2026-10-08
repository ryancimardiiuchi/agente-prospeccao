import { useQuery } from "@tanstack/react-query";
import { servicosApi } from "@/lib/api";
import { normalizarServico, SERVICOS_REFERENCIA, type Servico } from "@/data/servicos";

export interface ServicosResult {
  servicos: Servico[];
  /** "api" = vindo de GET /servicos · "referencia" = tabela do briefing (API indisponível). */
  origem: "api" | "referencia";
}

const REFERENCIA: ServicosResult = { servicos: SERVICOS_REFERENCIA, origem: "referencia" };

export function useServicos() {
  const query = useQuery<ServicosResult>({
    queryKey: ["servicos"],
    retry: false,
    staleTime: 60_000,
    placeholderData: REFERENCIA,
    queryFn: async () => {
      try {
        const { data } = await servicosApi.listar();
        const lista: unknown[] = Array.isArray(data) ? data : (data?.servicos ?? []);
        if (!lista.length) return REFERENCIA;
        return {
          servicos: lista.map((s, i) => normalizarServico(s as Record<string, unknown>, i)),
          origem: "api" as const,
        };
      } catch {
        return REFERENCIA;
      }
    },
  });
  return {
    servicos: query.data?.servicos ?? SERVICOS_REFERENCIA,
    origem: query.data?.origem ?? "referencia",
    carregando: query.isFetching && query.isPlaceholderData,
  };
}
