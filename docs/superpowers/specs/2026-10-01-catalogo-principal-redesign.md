# Especificação Técnica e de Design: Redesenho do Catálogo Principal Amo Você

**Data:** 01/10/2026  
**Status:** Aprovado em Brainstorming — Pronto para Planejamento  
**Documentos de Referência:** [docs/Catalogo.md](file:///c:/Users/abraa/Codigos/Catalogo-AmoVoce/docs/Catalogo.md), [docs/cestas.md](file:///c:/Users/abraa/Codigos/Catalogo-AmoVoce/docs/cestas.md)

---

## 1. Visão Geral & Objetivos

Transformar o catálogo digital atual da **Amo Você Cestas e Presentes** em uma experiência de compra mais intuitiva, emocional e estruturada em um funil de duas etapas:

1. **Etapa 1 — Descoberta (Vitrine Geral em `index.html`):**  
   Permite comparação rápida e fluida entre as opções disponíveis, organizadas por 6 categorias temáticas, com cards resumidos contendo foto, selo estratégico, nome, frase de posicionamento, preço e botão "Ver Detalhes" (sem listar todos os itens na vitrine para evitar sobrecarga cognitiva).
2. **Etapa 2 — Decisão (Página de Detalhes da Cesta em `cesta.html?id=[slug]`):**  
   Página dedicada para aprofundamento nos detalhes de cada cesta, contendo galeria com miniaturas clicáveis, lista completa de itens inclusos com ícones personalizados, destaques da cesta, ocasiões recomendadas, perfil de público, acabamento artesanal e múltiplos pontos de contato diretos com o WhatsApp com mensagens pré-formatadas.

---

## 2. Identidade Visual & Design System

### 2.1 Paleta Oficial
- **Fundo Principal:** `#FAF6F2` (Warm Off-white)
- **Rosa Principal (Acentos e CTAs):** `#C66B8A` (Hover: `#B25577`)
- **Rosa Claro:** `#E9C8D1`
- **Verde Leve:** `#DCE7D5`
- **Texto Principal:** `#4A3B37`
- **Texto Secundário / Muted:** `#75655F`

### 2.2 Cores de Fundo por Categoria
- ☕ **Café da Manhã e Acolhimento:** `#F7E8E4`
- 🍃 **Bem-Estar:** `#EEF3E8`
- 💝 **Doces e Carinho:** `#F8ECEF`
- 🎉 **Celebração:** `#FFF2DD`
- 🧸 **Infantil:** `#EAF2FF`
- 🍻 **Happy Hour:** `#F6EFE6`

### 2.3 Tipografia
- **Títulos e Destaques Emocionais:** `Playfair Display`, serif (pesos 500, 600, 700)
- **Corpo, Menus, Preços e Botões:** `Montserrat`, sans-serif (pesos 400, 500, 600, 700)

### 2.4 Sistema de Espaçamento & Componentes
- Grid baseado em múltiplos de 8px (8, 16, 24, 32, 48, 64px).
- Bordas arredondadas suaves (`border-radius: 16px` a `24px` para cards e containers; `999px` para pills/botões).
- Sombras elegantes e suaves (`box-shadow: 0 10px 30px rgba(74, 59, 55, 0.06)`).

---

## 3. Modelagem de Dados (`products/products-catalogo.js`)

O arquivo [products/products-catalogo.js](file:///c:/Users/abraa/Codigos/Catalogo-AmoVoce/products/products-catalogo.js) conterá a lista completa dos 11 produtos com tipagem enriquecida para suprir tanto a vitrine quanto as páginas de detalhes:

### 3.1 Estrutura do Objeto de Produto
```typescript
interface Product {
  id: string; // Slug único (ex: "amo-cafezinho")
  title: string; // Nome exibido (ex: "Amo Cafezinho")
  category: "cafe-da-manha" | "bem-estar" | "doces-e-carinho" | "celebracao" | "infantil" | "happy-hour";
  categoryName: string; // Nome amigável da categoria
  price: string; // Ex: "169,90"
  tag: string; // Selo discreto (ex: "⭐ Mais Vendida")
  tagline: string; // Frase curta para o card da vitrine
  description: string; // Descrição emocional completa para o detalhe
  signaturePhrase: string; // Frase de acabamento artesanal
  items: Array<{ icon: string; text: string }>; // Itens com ícones
  highlights: string[]; // Destaques da cesta
  occasions: Array<{ icon: string; label: string }>; // Ocasiões indicadas
  targetAudience: string[]; // "Quem costuma escolher esta cesta?"
  images: string[]; // Lista de caminhos para as imagens (ex: ["img/catalogo/amoCafezinho/1.jpg", ...])
}
```

### 3.2 Relação das 11 Cestas Cadastradas
1. **Amo Cafezinho** (`amo-cafezinho`, R$ 169,90) — Café da Manhã | Selo: `⭐ Mais Vendida`
2. **Amo Afeto** (`amo-afeto`, R$ 179,90) — Café da Manhã | Selo: `🥐 Sabores Artesanais`
3. **Amo Estar com Você** (`amo-estar-com-voce`, R$ 199,90) — Café da Manhã | Selo: `💝 Momentos Especiais`
4. **Amo Frutas** (`amo-frutas`, R$ 189,90) — Bem-Estar | Selo: `🍓 Favorita para Recuperação`
5. **Amo Leveza** (`amo-leveza`, R$ 209,90) — Bem-Estar | Selo: `🌿 Opção Leve`
6. **Amo Bombons** (`amo-bombons`, R$ 139,90) — Doces e Carinho | Selo: `🍫 Puro Chocolate`
7. **Simples Amor** (`simples-amor`, R$ 199,90) — Doces e Carinho | Selo: `💌 Delicado e Marcante`
8. **Amo Momentos** (`amo-momentos`, R$ 189,90) — Doces e Carinho | Selo: `🤎 Charmosa & Acolhedora`
9. **Amo Celebrar** (`amo-celebrar`, R$ 269,90) — Celebração | Selo: `🎂 Aniversários`
10. **Bela Infância** (`bela-infancia`, R$ 159,90) — Infantil | Selo: `🎈 Diversão e Cores`
11. **Amo Petiscos** (`amo-petiscos`, R$ 179,90) — Happy Hour | Selo: `🍻 Happy Hour`

---

## 4. Arquitetura da Vitrine Geral (`index.html`)

### 4.1 Topbar
- Logo oficial Amo Você.
- Links rápidos: Início, Categorias, Adicionais, Instruções e WhatsApp.

### 4.2 Hero Section
- Fundo elegante com degradê sutil e elementos decorativos delicados.
- Logo em destaque.
- Título: *"Mais do que cestas, entregamos experiências."*
- Subtítulo: *"Presentes que transformam momentos em lembranças."*
- CTAs:
  - Primário: "Ver Catálogo" (scroll suave para a âncora `#vitrine`).
  - Secundário: "Falar no WhatsApp" (link direto).

### 4.3 Navegador Rápido de Categorias (Category Pills)
- Barra horizontal com chips clicáveis com ícones para scroll suave até a categoria desejada:
  `[ ☕ Café da Manhã ] [ 🍃 Bem-Estar ] [ 💝 Doces e Carinho ] [ 🎉 Celebração ] [ 🧸 Infantil ] [ 🍻 Happy Hour ]`

### 4.4 Seções de Categorias e Cards de Produto
- Cada seção possui título com ícone, descrição da atmosfera e o fundo temático definido na paleta.
- Grid de cards de produtos (1 coluna no mobile, 2 ou 3 colunas no desktop).
- **Conteúdo de cada Card:**
  - Container da imagem com aspect-ratio consistente (4:3 ou 1:1) e zoom suave ao hover.
  - Selo estratégico no topo da foto (pill translúcida com fundo branco/rosado).
  - Título da cesta em *Playfair Display*.
  - Frase de posicionamento emocional curta.
  - Preço formatado em destaque.
  - Botão de ação: **"Ver Detalhes"** direcionando para `cesta.html?id=[id]`.
  - **Atenção:** Nenhum item individual é listado no card da vitrine, conforme o princípio UX de escaneabilidade rápida do SDD.

### 4.5 Seções Complementares Harmonizadas
- **Adicionais:** Cards com fotos arredondadas, nomes com emojis (📸 Polaroid, 🎈 Balões, 🍊 Suco, 🍰 Naked Cake, 🎈✨ Balão metalizado, ✍️ Nome escrito), descrição com storytelling e preço.
- **Instruções (FAQ & Logística):** Seção organizada em cartões limpos cobrindo Pedidos, Frete, Formas de Pagamento, Agendamento, Horários, Domingo, Confirmação, Marcas e Fotos Ilustrativas.
- **Botão Flutuante de WhatsApp:** CTA flutuante visível em toda a navegação com link de atendimento geral.

---

## 5. Arquitetura da Página de Detalhes (`cesta.html`)

### 5.1 Carregamento Dinâmico & Roteamento
- A página `cesta.html` importa [products/products-catalogo.js](file:///c:/Users/abraa/Codigos/Catalogo-AmoVoce/products/products-catalogo.js) via módulo ES6.
- Lê o parâmetro `?id=[slug]` via `new URLSearchParams(window.location.search)`.
- Se o ID não for informado ou não existir na lista, exibe uma tela amigável informando produto não encontrado e um botão para voltar ao catálogo principal.

### 5.2 Estrutura Visual da Página de Detalhes
1. **Header / Breadcrumb:**
   - Link de retorno evidente: `← Voltar ao Catálogo`.
2. **Seção Superior (2 Colunas no Desktop / 1 no Mobile):**
   - **Coluna Esquerda (Galeria de Imagens):**
     - Imagem principal grande, com bordas arredondadas e sombra suave.
     - Galeria de 4 a 6 miniaturas clicáveis abaixo da imagem principal (ao clicar em uma miniatura, a imagem principal é atualizada com animação suave de fade). Sem carrossel automático que gere distração.
     - Suporte a Lightbox/Modal de tela cheia ao clicar na imagem principal.
   - **Coluna Direita (Informações Comerciais & Decisão):**
     - Categoria e Selo de destaque.
     - Nome da cesta em *Playfair Display* em tamanho de destaque.
     - Frase de impacto e descrição emocional detalhada.
     - Bloco de Preço (`R$ ...`) e nota de condições de pagamento (PIX ou Cartão).
     - Botão primário de conversão: **"Solicitar pelo WhatsApp"** com ícone do WhatsApp e mensagem pré-formatada.
3. **Seções de Conteúdo Aprofundado:**
   - **✨ Itens Inclusos:** Grid de 2 colunas com cards/itens organizados com ícones correspondentes para excelente escaneabilidade.
   - **💝 Destaques da Cesta:** Bloco ressaltando os produtos nobres (frutas no coco, bolos caseiros, etc.).
   - **🎂 Ocasiões Indicadas:** Cards visuais destacando Aniversários, Gratidão, Recuperação, Momentos a dois, etc.
   - **👤 Quem Costuma Escolher Esta Cesta:** Tópicos com perfil de quem mais se encanta com a opção.
   - **🎀 Toque Artesanal Exclusivo:** Mensagem de assinatura reforçando o cuidado manual, os laços de cetim e a embalagem em celofane.
4. **CTA Fixo de Conversão:**
   - Botão flutuante fixado no rodapé inferior direito: **"Quero Presentear"** (Cor `#C66B8A`, hover `#B25577`), abrindo diretamente o WhatsApp.
   - Mensagem padrão ao clicar:  
     `Olá! Gostaria de mais informações sobre a cesta [NOME_DA_CESTA].`

---

## 6. Arquivos e Estrutura do Projeto

```
Catalogo-AmoVoce/
├── index.html                   # Vitrine Principal (Descoberta)
├── cesta.html                   # Página de Detalhes Dinâmica (Decisão)
├── products/
│   └── products-catalogo.js     # Base de dados centralizada dos 11 produtos
├── js/
│   ├── main-catalogo.js         # Lógica da vitrine (renderização de categorias e cards)
│   ├── cesta-detalhes.js        # Lógica do template de detalhes (galeria, URL params, renderização)
│   ├── topbar.js                # Comportamento do cabeçalho
│   └── topbar-links.js          # Links da navegação
├── css/
│   ├── base.css                 # Reset, variáveis e regras globais
│   ├── catalogo-theme.css       # Estilos específicos da vitrine e categorias
│   └── cesta-detalhes.css       # Estilos da página de detalhes da cesta
└── docs/
    └── superpowers/specs/
        └── 2026-10-01-catalogo-principal-redesign.md # Este documento de especificação
```

---

## 7. Critérios de Aceite e Verificação

- [ ] Todas as 11 cestas catalogadas em `docs/cestas.md` estão presentes em `products/products-catalogo.js` com todos os atributos preenchidos.
- [ ] A página inicial `index.html` exibe a vitrine com Hero, as 6 categorias com suas cores oficiais, cards sem lista de itens e botões "Ver Detalhes".
- [ ] Clicar em "Ver Detalhes" de qualquer cesta direciona para `cesta.html?id=[slug]` com todos os dados preenchidos corretamente.
- [ ] A galeria de miniaturas permite trocar a foto principal suavemente por clique.
- [ ] O botão flutuante e os botões "Solicitar pelo WhatsApp" geram o link correto com o número `5532991162238` e a mensagem contendo o nome da cesta selecionada.
- [ ] As seções de Adicionais e Instruções continuam acessíveis e estão visualmente harmonizadas.
- [ ] Layout perfeitamente responsivo no mobile e desktop, sem overflow horizontal e sem erros de console.
