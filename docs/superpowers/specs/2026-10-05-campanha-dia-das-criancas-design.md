# Especificação de Design: Arquitetura de Campanhas Sazonais e Cesta Amo Descobrir

- **Data:** 2026-10-05
- **Status:** Aprovado em Brainstorming
- **Objetivo:** Implementar a cesta infantil especial de Dia das Crianças ("Amo Descobrir") por R$ 79,90 com foto real enviada pelo cliente, e estabelecer uma arquitetura reutilizável e de alta conversão para eventos sazonais no catálogo.

---

## 1. Visão Geral e Objetivos de Negócio

O Catálogo Amo Você opera com datas comemorativas cruciais ao longo do ano (Dia das Crianças, Dia das Mães, Dia dos Namorados, Dia dos Pais, Natal). 

### Objetivos:
1. **Alta Conversão (CRO):** Destacar o lançamento sazonal no topo da página e na barra de atalhos rápidos com senso de oportunidade ("Edição Limitada"), sem poluir ou quebrar a experiência de navegação do catálogo principal.
2. **Arquitetura Declarativa e Desacoplada:** Permitir que campanhas sazonais sejam ativadas ou desativadas através de uma única flag de configuração (`enabled: true/false`), sem duplicação de páginas HTML ou edições manuais em múltiplos arquivos.
3. **Novo Produto:** Cadastrar a cesta `Amo Descobrir` com preço de **R$ 79,90**, foto real oficial (`img/catalogo/amoDescobrir/1.jpg`), ficha técnica completa, galeria de fotos e fluxo integrado de pedido via WhatsApp.

---

## 2. Arquitetura de Campanhas Sazonais

### 2.1 Módulo de Configuração (`js/campaign.config.js`)
Arquivo declarativo que centraliza todas as definições da campanha ativa:

```javascript
export const activeCampaign = {
  enabled: true,
  id: "dia-das-criancas-2026",
  name: "Dia das Crianças",
  dates: "Até 12 de Outubro",
  
  topBanner: {
    enabled: true,
    badge: "Edição Especial",
    text: "🎒 Dia das Crianças Amo Você: Nova cesta Amo Descobrir por apenas R$ 79,90! Vagas limitadas para entrega.",
    ctaText: "Ver Cesta Especial",
    targetCardId: "card-amo-descobrir"
  },

  categoryNavHighlight: {
    categorySlug: "infantil",
    badgeText: "Especial 🎈",
    chipText: "🧸 Infantil • Especial 🎈"
  },

  seasonalProductIds: ["amo-descobrir"]
};
```

### 2.2 Ciclo de Vida da Campanha
1. **Quando `enabled === true`:**
   - O banner de anúncio superior é montado e inserido no início do documento.
   - O chip de navegação rápida da categoria (`#cat-infantil`) recebe estilos temáticos e texto enriquecido.
   - Os produtos com IDs listados em `seasonalProductIds` são exibidos normalmente na vitrine com selos de edição limitada.
2. **Quando `enabled === false`:**
   - O banner de anúncio não é renderizado.
   - A barra de navegação exibe o chip no formato original ("Infantil").
   - Caso desejado no futuro, produtos que sejam 100% temporários podem ser filtrados automaticamente do catálogo padrão se a flag da campanha estiver inativa.

---

## 3. Especificação do Produto "Amo Descobrir"

### 3.1 Dados Cadastrais (`products/products-catalogo.js`)
- **`id`:** `"amo-descobrir"`
- **`title`:** `"Amo Descobrir"`
- **`category`:** `"infantil"`
- **`categoryName`:** `"Infantil"`
- **`price`:** `"79,90"`
- **`tag`:** `"Edição Limitada"`
- **`secondaryTag`:** `"Dia das Crianças 🎒"`
- **`tagline`:** `"Pequenos presentes para grandes aventuras."`
- **`description`:** `"Amo Descobrir é um kit pensado para estimular a imaginação e criar momentos divertidos. Com atividades criativas, doces e uma linda mochila temática, é o presente perfeito para encantar os pequenos aventureiros neste Dia das Crianças."`
- **`signaturePhrase`:** `"💜 Uma lembrança cheia de brincadeiras, criatividade e gostosuras para tornar o Dia das Crianças ainda mais especial!"`
- **`items`:**
  1. `1 mochila temática personalizada`
  2. `1 pacote de massinha de modelar (6 cores)`
  3. `1 caixinha de giz de cera`
  4. `1 Kinder Joy`
  5. `Balas fini`
  6. `Cookies com gotas de chocolate`
  7. `Suco de uva`
  8. `1 jogo da velha em MDF`
  9. `1 cartão temático personalizado`
  10. `Balões decorativos`
- **`highlights`:**
  - `"Mochila temática personalizada 2D exclusiva"`
  - `"Atividades criativas: massinha de modelar, giz de cera e jogo da velha em MDF"`
  - `"Doces e delícias: Kinder Joy, balas Fini, cookies e suco de uva"`
- **`occasions`:**
  - `Dia das Crianças`
  - `Presente Criativo e Lúdico`
  - `Aniversários Infantis`
- **`targetAudience`:**
  - `"Pais, tios, avós e padrinhos que desejam encantar e surpreender os pequenos"`
  - `"Crianças que adoram atividades manuais, brincadeiras e momentos doces"`
- **`images`:**
  - `["img/catalogo/amoDescobrir/1.jpg"]`

### 3.2 Gestão de Imagens
- Criar a pasta `img/catalogo/amoDescobrir/`.
- Copiar a imagem oficial recebida na conversa para `img/catalogo/amoDescobrir/1.jpg`.

---

## 4. Design da Interface do Usuário (UI & CRO)

### 4.1 Top Announcement Banner
- **Elemento:** `<aside class="campaign-banner" role="complementary" aria-label="Campanha Sazonal">`
- **Localização:** Inserido dinamicamente antes ou logo acima do header/hero.
- **Design Tokens:**
  - Fundo: Gradiente sutil entre púrpura profundo da marca (`#5b2875`), ameixa suave (`#733075`) e sotaques dourados/quentes.
  - Tipografia: Montserrat 500/600, legível e contrastante (texto em `#FFF`).
  - Botão CTA: Fundo branco ou dourado suave com texto escuro, hover com micro-elevação.
  - Ação do CTA: Rola suavemente até o elemento `document.getElementById("card-amo-descobrir")`.
  - Botão de fechar (`×`): Discreto, permitindo fechar o banner caso o usuário deseje, persistindo a preferência em `sessionStorage.getItem("campaign-banner-dismissed")`.

### 4.2 Category Nav Chip Highlight
- **Elemento:** `<a href="#cat-infantil" class="category-nav-chip chip-campaign-active">`
- **Efeito:**
  - Borda colorida temático-festiva com gradiente suave.
  - Texto dinâmico: `🧸 Infantil • Especial 🎈`.
  - Micro-animação de brilho ou pulso sutil (`keyframes pulse-subtle`) a cada 4 segundos para atração visual sem desconforto.

### 4.3 Card Highlight & Scroll Focus
- Ao clicar no CTA do banner superior:
  - A janela rola suavemente até `#card-amo-descobrir`.
  - O card recebe a classe temporária `card-highlight-active` (borda dourada luminosa que desaparece suavemente após 2.5s), confirmando visualmente para o visitante que ele chegou ao item desejado.

---

## 5. Plano de Testes e Validação

### 5.1 Atualização de `tests/verify-products.js`
- Atualizar contagem total de produtos para **12** (antes 11).
- Adicionar `"amo-descobrir"` à lista `expectedSlugs`.
- Confirmar validação de existência do arquivo `img/catalogo/amoDescobrir/1.jpg`.

### 5.2 Atualização de `tests/verify-catalog-integration.js`
- Atualizar contagem total esperada para **12**.
- Validar formato de preço (`79,90`), textos obrigatórios e mensagem do WhatsApp encodada corretamente.
- Testar execução do script via Node.js sem erros nem warnings críticos.

---

## 6. Critérios de Sucesso
- [x] Cesta `Amo Descobrir` visível na vitrine na categoria Infantil.
- [x] Página de detalhes da cesta (`cesta.html?id=amo-descobrir`) funcionando com foto oficial, preço R$ 79,90, lista de itens e WhatsApp dinâmico.
- [x] Top Banner sazonal visível no topo, com CTA funcional para a cesta.
- [x] Chip da categoria Infantil destacado na navegação rápida.
- [x] Fácil desativação através de `js/campaign.config.js` (`enabled: false`).
- [x] Todos os testes automatizados executando com 100% de sucesso.
