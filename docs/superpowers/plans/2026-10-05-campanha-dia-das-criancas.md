# Campanha Dia das Crianças e Cesta Amo Descobrir Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Cadastrar a cesta infantil temporária "Amo Descobrir" (R$ 79,90) com foto real e implementar uma arquitetura declarativa de campanhas sazonais com banner superior, chip destacado na navegação rápida e foco visual.

**Architecture:** Módulo declarativo `js/campaign.config.js` consumido por `js/main-catalogo.js` para renderizar condicionalmente (`enabled: true/false`) o anúncio de topo, enriquecer o botão da categoria infantil na barra de navegação e guiar o cliente até a cesta temporária na vitrine com scroll suave e halo luminoso.

**Tech Stack:** Vanilla JavaScript (ES Modules), HTML5 semântico, Vanilla CSS moderno (tokens, animações suaves, responsividade mobile-first), Node.js para testes de validação.

**Spec:** [docs/superpowers/specs/2026-10-05-campanha-dia-das-criancas-design.md](file:///c:/Users/abraa/Codigos/Catalogo-AmoVoce/docs/superpowers/specs/2026-10-05-campanha-dia-das-criancas-design.md)

## Global Constraints

- Preço exato da cesta Amo Descobrir: `79,90`.
- Imagem oficial da cesta deve ser copiada para `img/catalogo/amoDescobrir/1.jpg`.
- Quando `activeCampaign.enabled === false`, o banner de topo não renderiza e o chip da categoria volta ao texto "Infantil" padrão.
- Número de WhatsApp oficial para o botão de pedido: `5532991162238`.
- A interface deve manter total compatibilidade com os testes de `tests/verify-products.js` e `tests/verify-catalog-integration.js`.

## Review Focus

- Imagem ausente ou com caminho incorreto que quebre em `cesta.html` ou `index.html`.
- Clique no CTA do banner deve rolar de forma suave até `#card-amo-descobrir` e ativar o halo temporário.
- Fechamento do banner deve persistir na sessão através de `sessionStorage`.
- Desativação limpa: alternar `enabled: false` não deve gerar erros de console nem deixar elementos órfãos.
- Responsividade: o banner de topo deve manter boa legibilidade e espaçamento em telas menores (mobile).

---

### Task 1: Imagem Oficial e Cadastro da Cesta Amo Descobrir

**Files:**
- Create: `img/catalogo/amoDescobrir/1.jpg`
- Modify: `products/products-catalogo.js`
- Modify: `tests/verify-products.js`

**Interfaces:**
- Produz: Produto `amo-descobrir` exportado no array `products` de `products/products-catalogo.js`.

- [x] **Step 1: Copiar a foto oficial para a pasta do produto**
  Criar diretório `img/catalogo/amoDescobrir` e copiar `C:\Users\abraa\.gemini\antigravity-ide\brain\63d4a498-0e40-47a9-be98-4d0e605ccf39\.user_uploaded\media_1791231799075.jpg` para `img/catalogo/amoDescobrir/1.jpg`.

- [x] **Step 2: Atualizar `tests/verify-products.js` com o novo produto esperado**
  Aumentar contagem esperada de 11 para 12 e adicionar `"amo-descobrir"` em `expectedSlugs`.

- [x] **Step 3: Executar teste para verificar a falha esperada (TDD)**
  Executar: `node tests/verify-products.js`
  Esperado: FAIL acusando produto `amo-descobrir` ausente.

- [x] **Step 4: Cadastrar o produto `amo-descobrir` em `products/products-catalogo.js`**
  Adicionar a cesta infantil com categoria `infantil`, preço `79,90`, selos `Edição Limitada` e `Dia das Crianças 🎒`, itens e storytelling comercial da especificação.

- [x] **Step 5: Executar teste para verificar aprovação**
  Executar: `node tests/verify-products.js`
  Esperado: PASS ("✓ Todos os 12 produtos foram validados com sucesso!").

---

### Task 2: Módulo de Configuração de Campanhas Sazonais

**Files:**
- Create: `js/campaign.config.js`

**Interfaces:**
- Produz: `export const activeCampaign` em `js/campaign.config.js`.

- [x] **Step 1: Criar `js/campaign.config.js`**
  Declarar o objeto `activeCampaign` com propriedades `enabled`, `id`, `name`, `topBanner`, `categoryNavHighlight` e `seasonalProductIds`.

- [x] **Step 2: Verificar sintaxe e exportação do arquivo**
  Executar validação de importação via Node.js para garantir que não há erros de sintaxe no módulo ES.

---

### Task 3: Injeção do Banner, Destaque do Seletor e Estilos

**Files:**
- Modify: `js/main-catalogo.js`
- Modify: `css/catalogo-theme.css`

**Interfaces:**
- Consome: `activeCampaign` de `js/campaign.config.js`.
- Produz: Banner no DOM, classe `.chip-campaign-active` em `#cat-infantil`, e animação de scroll/foco no card da cesta.

- [x] **Step 1: Implementar o renderizador de campanha em `js/main-catalogo.js`**
  - Importar `activeCampaign` de `js/campaign.config.js`.
  - Se `activeCampaign.enabled`, montar o elemento `campaign-banner` antes de `#topbar` ou como primeiro filho de `<body>`.
  - Configurar ação de scroll suave para o botão do banner rolar até `activeCampaign.topBanner.targetCardId`.
  - Configurar fechamento do banner com registro em `sessionStorage`.
  - Localizar o chip correspondente a `activeCampaign.categoryNavHighlight.categorySlug` e aplicar classe e texto temático.

- [x] **Step 2: Implementar os estilos CSS da campanha em `css/catalogo-theme.css`**
  - `.campaign-banner`: layout flex responsivo, gradiente temático sofisticado, botão de ação contrastante, botão de fechar.
  - `.chip-campaign-active`: borda luminosa, sutil pulso e badge temático.
  - `.card-highlight-active`: keyframe de halo/brilho no card ao receber o scroll vindo do banner.

- [x] **Step 3: Validar visualmente o catálogo e a navegação**
  Verificar renderização estática e comportamento do DOM.

---

### Task 4: Atualização dos Testes de Integração e Verificação Completa

**Files:**
- Modify: `tests/verify-catalog-integration.js`

**Interfaces:**
- Consome: `products`, `index.html`, `cesta.html`.

- [x] **Step 1: Atualizar `tests/verify-catalog-integration.js`**
  - Atualizar contagem esperada de produtos para 12.
  - Verificar que o teste valida `amo-descobrir` e a integridade da foto.

- [x] **Step 2: Executar testes de integração**
  Executar: `node tests/verify-catalog-integration.js`
  Esperado: SUCESSO sem erros.

- [x] **Step 3: Testar alternância da flag `enabled: false`**
  Testar se ao desligar `activeCampaign.enabled` nada quebra na página.
