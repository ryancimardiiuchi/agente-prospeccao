/** Helper de metadados por página (cada rota tem título e descrição próprios). */
export function seo(title: string, description: string) {
  const full = `${title} | Lavô+ Lavanderia Online`;
  return {
    meta: [
      { title: full },
      { name: "description", content: description },
      { property: "og:title", content: full },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  };
}
