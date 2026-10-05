/**
 * Configuração Centralizada de Campanhas e Eventos Sazonais do Catálogo Amo Você
 * 
 * Para ativar/desativar uma campanha, basta alterar a flag `enabled: true/false`.
 * Em datas comemorativas futuras (ex: Natal, Dia das Mães, Namorados),
 * basta atualizar as propriedades deste objeto.
 */
export const activeCampaign = {
  enabled: true,
  id: "dia-das-criancas-2026",
  name: "Dia das Crianças",
  dates: "Até 12 de Outubro",

  // Banner no topo da página
  topBanner: {
    enabled: true,
    badge: "Edição Especial",
    text: "🎒 Dia das Crianças Amo Você: Nova cesta Amo Descobrir por apenas R$ 74,90! Vagas limitadas para entrega.",
    ctaText: "Ver Cesta Especial",
    targetCardId: "card-amo-descobrir"
  },

  // Destaque visual na barra de atalhos rápidos (Category Nav)
  categoryNavHighlight: {
    categorySlug: "infantil",
    badgeText: "Especial 🎈",
    chipText: "🧸 Infantil • Especial 🎈"
  },

  // IDs dos produtos sazonais vinculados
  seasonalProductIds: ["amo-descobrir"]
};
