# Redesenho do Catálogo Principal Amo Você — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reformular o catálogo principal da Amo Você Cestas em uma jornada de duas etapas (Vitrine Geral para Descoberta e Página de Detalhes para Decisão), com identidade visual renovada, nova paleta de cores, tipografia elegante e dados completos das 11 cestas.

**Architecture:** Frontend estático modular em Vanilla JS/CSS com duas páginas principais: `index.html` (vitrine categorizada com cards limpos) e `cesta.html?id=[slug]` (template dinâmico de detalhes do produto). Uma base de dados centralizada em `products/products-catalogo.js` abastece ambas as páginas.

**Tech Stack:** HTML5 semântico, Vanilla CSS moderno (Grid, Flexbox, Variáveis CSS, Glassmorphism), JavaScript ES6 Modules, Google Fonts (Playfair Display + Montserrat).

**Spec:** [docs/superpowers/specs/2026-10-01-catalogo-principal-redesign.md](file:///c:/Users/abraa/Codigos/Catalogo-AmoVoce/docs/superpowers/specs/2026-10-01-catalogo-principal-redesign.md)

## Global Constraints

- Fundo Principal: `#FAF6F2` (Warm Off-white)
- Rosa Principal: `#C66B8A` (Hover: `#B25577`)
- Rosa Claro: `#E9C8D1`
- Verde Leve: `#DCE7D5`
- Texto Principal: `#4A3B37`
- Texto Secundário: `#75655F`
- Cores de fundo das 6 categorias: Café da Manhã (`#F7E8E4`), Bem-Estar (`#EEF3E8`), Doces e Carinho (`#F8ECEF`), Celebração (`#FFF2DD`), Infantil (`#EAF2FF`), Happy Hour (`#F6EFE6`).
- Tipografia: `Playfair Display` para títulos e frases emocionais; `Montserrat` para textos corridos, preços e botões.
- WhatsApp: número oficial `5532991162238`. Mensagem automática nas páginas de produto: `"Olá! Gostaria de mais informações sobre a cesta [NOME_DA_CESTA]."`.
- Sem lista completa de itens nos cards da vitrine inicial (apenas foto, selo, nome, frase de posicionamento, preço e botão "Ver Detalhes").
- Commits git: por instrução expressa do usuário, NÃO realizar commits intermediários durante as tarefas; todo o desenvolvimento será commitado de forma unificada ao final.

## Review Focus

1. **Parâmetro de URL ausente ou slug inválido em `cesta.html`:** Usuário acessa `cesta.html` sem `?id=` ou com ID inexistente (ex: `?id=invalido`); a página deve exibir um estado amigável com mensagem clara e botão para retornar à vitrine inicial, sem quebrar o JavaScript.
2. **Fallback e integridade de imagens:** Todas as imagens referenciadas para as 11 cestas devem existir no diretório `img/catalogo/` e possuir fallback para `.jpeg`/`.jpg` caso ocorra divergência de extensão.
3. **Escaneabilidade e responsividade no mobile (320px - 480px):** Os cards da vitrine e a página de detalhes não devem gerar overflow horizontal, os botões e links de WhatsApp devem ter touch target mínimo de 44px e o botão flutuante "Quero Presentear" não deve cobrir informações essenciais.
4. **Codificação correta de URLs de WhatsApp:** Os links `https://api.whatsapp.com/send?...` devem usar `encodeURIComponent` para formatar adequadamente acentos, espaços e quebras de linha.
5. **Navegação de retorno intuitiva:** Qualquer ponto da página interna deve permitir voltar para a vitrine na posição exata da categoria ou topo sem recarregar desnecessariamente.

---

### Task 1: Enriquecimento da Base de Dados de Produtos (`products/products-catalogo.js`)

**Files:**
- Modify: `products/products-catalogo.js`
- Create: `tests/verify-products.js` (script de teste de integridade em Node.js)

**Interfaces:**
- Produces: `export const products: Product[]` contendo 11 objetos de produtos com campos: `id`, `title`, `category`, `categoryName`, `price`, `tag`, `tagline`, `description`, `signaturePhrase`, `items`, `highlights`, `occasions`, `targetAudience`, `images`.

- [ ] **Step 1: Escrever teste de integridade da base de produtos em `tests/verify-products.js`**

Validar que todos os 11 produtos exigidos em `docs/cestas.md` estão presentes, possuem slugs únicos, preços formatados, categorias corretas, listas de itens com ícones e caminhos de imagens válidos.

```javascript
// tests/verify-products.js
import { products } from "../products/products-catalogo.js";
import fs from "fs";
import path from "path";

const expectedSlugs = [
  "amo-cafezinho",
  "amo-afeto",
  "amo-estar-com-voce",
  "amo-frutas",
  "amo-leveza",
  "amo-bombons",
  "simples-amor",
  "amo-momentos",
  "amo-celebrar",
  "bela-infancia",
  "amo-petiscos"
];

console.log("Validando produtos...");
if (products.length !== 11) {
  throw new Error(`Esperado 11 produtos, encontrado ${products.length}`);
}

const seenSlugs = new Set();
for (const p of products) {
  if (!p.id || !p.title || !p.price || !p.category || !p.tagline) {
    throw new Error(`Produto com campos obrigatórios ausentes: ${JSON.stringify(p)}`);
  }
  if (seenSlugs.has(p.id)) {
    throw new Error(`Slug duplicado: ${p.id}`);
  }
  seenSlugs.add(p.id);

  if (!Array.isArray(p.items) || p.items.length === 0) {
    throw new Error(`Produto ${p.id} não possui lista de itens válida`);
  }
  if (!Array.isArray(p.images) || p.images.length === 0) {
    throw new Error(`Produto ${p.id} não possui imagens`);
  }
  for (const img of p.images) {
    if (!fs.existsSync(img)) {
      console.warn(`Aviso: imagem não encontrada no disco: ${img}`);
    }
  }
}

for (const slug of expectedSlugs) {
  if (!seenSlugs.has(slug)) {
    throw new Error(`Slug esperado não encontrado: ${slug}`);
  }
}

console.log("✓ Todos os 11 produtos foram validados com sucesso!");
```

- [ ] **Step 2: Executar o teste para verificar falha inicial**

Run: `node tests/verify-products.js`  
Expected: FAIL (campos novos não existem no formato legado).

- [ ] **Step 3: Implementar a base enriquecida em `products/products-catalogo.js`**

Cadastrar detalhadamente cada uma das 11 cestas com base nos textos de `docs/cestas.md`:
1. `amo-cafezinho`: Categoria `cafe-da-manha`, preço "169,90", selo "⭐ Mais Vendida"
2. `amo-afeto`: Categoria `cafe-da-manha`, preço "179,90", selo "🥐 Sabores Artesanais"
3. `amo-estar-com-voce`: Categoria `cafe-da-manha`, preço "199,90", selo "💝 Momentos Especiais"
4. `amo-frutas`: Categoria `bem-estar`, preço "189,90", selo "🍓 Favorita para Recuperação"
5. `amo-leveza`: Categoria `bem-estar`, preço "209,90", selo "🌿 Opção Leve"
6. `amo-bombons`: Categoria `doces-e-carinho`, preço "139,90", selo "🍫 Puro Chocolate"
7. `simples-amor`: Categoria `doces-e-carinho`, preço "199,90", selo "💌 Delicado e Marcante"
8. `amo-momentos`: Categoria `doces-e-carinho`, preço "189,90", selo "🤎 Charmosa & Acolhedora"
9. `amo-celebrar`: Categoria `celebracao`, preço "269,90", selo "🎂 Aniversários"
10. `bela-infancia`: Categoria `infantil`, preço "159,90", selo "🎈 Diversão e Cores"
11. `amo-petiscos`: Categoria `happy-hour`, preço "179,90", selo "🍻 Happy Hour"

- [ ] **Step 4: Executar o teste para verificar sucesso**

Run: `node tests/verify-products.js`  
Expected: PASS com "✓ Todos os 11 produtos foram validados com sucesso!".

---

### Task 2: Design System e Estilos da Vitrine Principal (`css/catalogo-theme.css`)

**Files:**
- Modify: `css/catalogo-theme.css`
- Modify: `css/base.css` (se necessário para fontes e variáveis globais)

**Interfaces:**
- Consumes: Variáveis e tokens de cor definidos na especificação.
- Produces: Classes CSS reutilizáveis: `.hero`, `.category-nav`, `.category-section`, `.category-section--cafe-da-manha`, `.category-section--bem-estar`, etc., `.basket-card`, `.basket-badge`, `.basket-actions`, `.extras-section`, `.instructions-section`, `.whatsapp-float`.

- [ ] **Step 1: Adicionar variáveis CSS globais e fontes em `css/catalogo-theme.css`**

Definir:
```css
:root {
  --color-bg: #FAF6F2;
  --color-primary: #C66B8A;
  --color-primary-hover: #B25577;
  --color-rose-light: #E9C8D1;
  --color-green-light: #DCE7D5;
  --color-text-main: #4A3B37;
  --color-text-muted: #75655F;

  /* Categorias */
  --bg-cat-cafe: #F7E8E4;
  --bg-cat-bem-estar: #EEF3E8;
  --bg-cat-doces: #F8ECEF;
  --bg-cat-celebrar: #FFF2DD;
  --bg-cat-infantil: #EAF2FF;
  --bg-cat-petiscos: #F6EFE6;

  /* Fontes */
  --font-serif: "Playfair Display", Georgia, serif;
  --font-sans: "Montserrat", -apple-system, BlinkMacSystemFont, sans-serif;

  /* Espaçamento & Formas */
  --radius-sm: 8px;
  --radius-md: 16px;
  --radius-lg: 24px;
  --radius-full: 999px;
  --shadow-card: 0 10px 25px rgba(74, 59, 55, 0.06);
  --shadow-hover: 0 16px 36px rgba(74, 59, 55, 0.12);
}
```

- [ ] **Step 2: Estilizar a Hero Section e a Barra de Categorias**

Criar `.hero` com alinhamento centralizado, tipografia elegante, botões de ação `.btn-primary` e `.btn-secondary`, e `.category-nav` com overflow horizontal suave no mobile e chips com efeito hover.

- [ ] **Step 3: Estilizar Seções de Categoria e Cards da Vitrine**

Estilizar `.category-section` aplicando o padding em sistema 8pt e os fundos temáticos específicos.  
Estilizar `.basket-card`:
- Card com fundo branco e borda sutil.
- Imagem com proporção 4:3, cantos superiores arredondados e transição suave no hover.
- Selo flutuante `.basket-badge` posicionado sobre a imagem.
- Título em Playfair Display, frase de posicionamento em Montserrat com cor secundária, preço em destaque e botão "Ver Detalhes".
- Sem elementos de lista de itens.

- [ ] **Step 4: Harmonizar Seções de Adicionais e Instruções**

Atualizar estilos de `#extras` e `#end` para utilizarem a mesma paleta e tipografia, com cards arredondados e sombra suave.

- [ ] **Step 5: Estilizar o Botão Flutuante Geral do WhatsApp**

Criar `.whatsapp-float` fixo na base da tela, com transição de hover, ícone oficial e texto legível.

---

### Task 3: Estrutura e Lógica da Vitrine Geral (`index.html` e `js/main-catalogo.js`)

**Files:**
- Modify: `index.html`
- Modify: `js/main-catalogo.js`

**Interfaces:**
- Consumes: `products` de `products/products-catalogo.js`.
- Produces: Marcação semântica e renderização dinâmica dos blocos de categorias e cards de produto.

- [ ] **Step 1: Atualizar o HTML em `index.html` com a estrutura semântica**

- Adicionar tags de fontes `Playfair Display` e `Montserrat` no `<head>`.
- Inserir a Hero Section contendo:
  - Logo Amo Você
  - `<h1>` "Mais do que cestas, entregamos experiências."
  - `<p class="subtitle">` "Presentes que transformam momentos em lembranças."
  - Botão "Ver Catálogo" ancorando para `#vitrine` e botão "Falar no WhatsApp".
- Inserir container de navegação rápida por chips de categorias.
- Inserir `<div id="vitrine">` para renderização das categorias e produtos.
- Manter e estilizar as seções de Adicionais e Instruções.
- Inserir botão flutuante de WhatsApp.

- [ ] **Step 2: Implementar renderização dinâmica em `js/main-catalogo.js`**

Agrupar os produtos por categoria nas 6 seções especificadas:
1. `cafe-da-manha` ("☕ Café da Manhã e Acolhimento")
2. `bem-estar` ("🍃 Bem-Estar")
3. `doces-e-carinho` ("💝 Doces e Carinho")
4. `celebracao` ("🎉 Celebração")
5. `infantil` ("🧸 Infantil")
6. `happy-hour` ("🍻 Happy Hour")

Para cada categoria, gerar a seção temática com cabeçalho e seu grid de cards. Cada card exibirá:
- Foto principal (com fallback para `.jpeg`/`.jpg`).
- Selo estratégico (`tag`).
- Título da cesta.
- Frase de posicionamento (`tagline`).
- Preço (`R$ ${price}`).
- Botão "Ver Detalhes" com link direto `<a href="cesta.html?id=${product.id}">Ver Detalhes</a>`.

- [ ] **Step 3: Testar visualmente a vitrine e a navegação no navegador**

Verificar carregamento da página inicial, navegação suave por âncoras e clique nos botões "Ver Detalhes".

---

### Task 4: Template e Estilos da Página de Detalhes da Cesta (`cesta.html` e `css/cesta-detalhes.css`)

**Files:**
- Create: `cesta.html`
- Create: `css/cesta-detalhes.css`

**Interfaces:**
- Produces: Estrutura HTML/CSS completa para o template de detalhes do produto.

- [ ] **Step 1: Criar o esqueleto HTML semântico em `cesta.html`**

- `<head>` com meta tags, fontes Google Fonts (Playfair Display + Montserrat), favicon, stylesheets (`css/base.css`, `css/cesta-detalhes.css`).
- `<header class="detail-topbar">` com link de retorno `← Voltar ao Catálogo` e logo.
- `<main id="product-detail-root" class="detail-container">` (onde o JavaScript irá injetar o conteúdo dinâmico).
- Botão flutuante fixo de WhatsApp (`.cta-float-whatsapp`).
- Inclusão do script modular `js/cesta-detalhes.js`.

- [ ] **Step 2: Desenvolver os estilos responsivos em `css/cesta-detalhes.css`**

- Layout Desktop em duas colunas (`display: grid; grid-template-columns: 1fr 1fr; gap: 48px;`):
  - Coluna esquerda: Imagem principal (`.main-image-wrapper`) com aspect ratio harmônico + container de miniaturas (`.thumbnails-grid`).
  - Coluna direita: Bloco de informações comerciais (`.product-info-panel`), selo, título em Playfair, frase de impacto, descrição, preço destacado, condições de pagamento e botão "Solicitar pelo WhatsApp".
- Seções de aprofundamento:
  - `.items-grid`: Grid responsivo (2 colunas) de cartões de itens com ícones circulares e texto legível.
  - `.highlights-container`: Cards de destaque da cesta.
  - `.occasions-grid`: Cards de ocasiões recomendadas.
  - `.audience-list`: Seção de perfis de quem costuma escolher a cesta.
  - `.signature-box`: Caixa com acabamento artesanal, borda delicada e laços de cetim.
- Mobile Layout (breakpoint `< 768px`):
  - Grid colapsa para 1 coluna fluida.
  - Imagem principal e miniaturas com rolagem horizontal se necessário.
  - Botão flutuante "Quero Presentear" fixado na parte inferior da tela.

---

### Task 5: Lógica Interativa dos Detalhes da Cesta (`js/cesta-detalhes.js`)

**Files:**
- Create: `js/cesta-detalhes.js`

**Interfaces:**
- Consumes: `products` de `products/products-catalogo.js`.
- Produces: Renderização dinâmica completa da cesta baseada no parâmetro `?id=[slug]`, controle de galeria de miniaturas, lightbox e links do WhatsApp.

- [ ] **Step 1: Implementar extração de parâmetro de URL e busca de produto**

```javascript
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");
const product = products.find((p) => p.id === productId);
```

- [ ] **Step 2: Implementar fallback de erro para ID não encontrado ou ausente**

Se `!product`, renderizar mensagem amigável:
```html
<div class="product-not-found">
  <h2>Cesta não encontrada</h2>
  <p>Não encontramos a cesta solicitada. Que tal explorar nosso catálogo completo?</p>
  <a href="index.html" class="btn-primary">Ver todas as cestas</a>
</div>
```

- [ ] **Step 3: Implementar renderização dinâmica do produto**

Injetar dinamicamente todos os dados da cesta no `#product-detail-root`:
- Título da página (`document.title = `${product.title} | Amo Você Cestas``).
- Galeria de fotos: Imagem principal + miniaturas.
- Informações comerciais, selo e preço.
- Grid de itens com ícones.
- Destaques, ocasiões e público-alvo.
- Caixa de assinatura artesanal.
- Botão "Solicitar pelo WhatsApp" e botão flutuante "Quero Presentear" com link:
  `https://api.whatsapp.com/send?phone=5532991162238&text=${encodeURIComponent("Olá! Gostaria de mais informações sobre a cesta " + product.title + ".")}`

- [ ] **Step 4: Implementar interatividade da galeria de miniaturas**

Ao clicar em qualquer miniatura:
- Atualizar a imagem principal com efeito suave de fade.
- Destacar a miniatura ativa com borda/sombra.
- Fallback automático caso a extensão da foto seja `.jpeg`/`.jpg`.

- [ ] **Step 5: Implementar modal de imagem em tela cheia (Lightbox)**

Ao clicar na imagem principal, abrir um modal overlay permitindo visualizar a foto em tamanho expandido.

---

### Task 6: Testes Integrados, Validação de Links, Imagens e Responsividade

**Files:**
- Create: `tests/verify-catalog-integration.js`
- Test: Todas as 11 cestas no navegador

**Interfaces:**
- Consumes: `index.html`, `cesta.html`, `products-catalogo.js`.
- Produces: Relatório de conformidade sem erros.

- [ ] **Step 1: Criar script de teste de integração em Node.js (`tests/verify-catalog-integration.js`)**

Validar:
- Todos os IDs geram links funcionais.
- Todas as fotos existem no sistema de arquivos.
- Os links do WhatsApp estão codificados sem caracteres corrompidos.

```javascript
// tests/verify-catalog-integration.js
import { products } from "../products/products-catalogo.js";
import fs from "fs";

let errors = [];

products.forEach(p => {
  // Test WhatsApp message format
  const msg = encodeURIComponent(`Olá! Gostaria de mais informações sobre a cesta ${p.title}.`);
  const url = `https://api.whatsapp.com/send?phone=5532991162238&text=${msg}`;
  if (!url.includes(encodeURIComponent(p.title))) {
    errors.push(`Erro no link WhatsApp para ${p.id}`);
  }

  // Check images
  p.images.forEach(img => {
    let exists = fs.existsSync(img);
    if (!exists) {
      const altImg = img.endsWith(".jpg") ? img.replace(".jpg", ".jpeg") : img.replace(".jpeg", ".jpg");
      if (!fs.existsSync(altImg)) {
        errors.push(`Imagem faltando: ${img}`);
      }
    }
  });
});

if (errors.length > 0) {
  console.error("Falhas encontradas:", errors);
  process.exit(1);
} else {
  console.log("✓ Todos os testes de integração passaram com sucesso!");
}
```

- [ ] **Step 2: Executar teste de integração**

Run: `node tests/verify-catalog-integration.js`  
Expected: PASS com "✓ Todos os testes de integração passaram com sucesso!".

- [ ] **Step 3: Verificação manual no navegador via servidor local**

Verificar:
- Navegação completa: Página inicial -> Hero -> Categorias -> Clicar em "Ver Detalhes" -> Página de Detalhes carregada corretamente.
- Troca de fotos na galeria por miniatura.
- Clicar no botão do WhatsApp e conferir o texto gerado.
- Responsividade no mobile (Chrome DevTools em 375px e 414px).
