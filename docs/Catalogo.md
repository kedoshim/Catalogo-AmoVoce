# SDD — Catálogo Digital Amo Você Cestas e Presentes

## Objetivo

Transformar o catálogo atual em uma experiência de compra mais intuitiva, emocional e organizada.

O catálogo deve funcionar em duas etapas:

1. Descoberta (Visão Geral)
2. Decisão (Detalhes da Cesta)

O objetivo é reduzir a sobrecarga de informação e facilitar a comparação entre as opções, seguindo princípios de hierarquia visual, categorização e progressão de conteúdo. Usuários tomam decisões mais facilmente quando primeiro visualizam opções resumidas e só depois aprofundam nos detalhes. :contentReference[oaicite:0]{index=0}

---

# Estrutura Geral

## Página Inicial

### Hero

Logo Amo Você

Título:

"Mais do que cestas, entregamos experiências."

Subtítulo:

"Presentes que transformam momentos em lembranças."

Botão principal:

"Ver Catálogo"

Botão secundário:

"Falar no WhatsApp"

---

# Fluxo do Catálogo

## Etapa 1 — Vitrine Geral

Esta página deve funcionar como uma "coleção de produtos".

Objetivo:
Permitir comparação rápida entre as cestas.

Cada cesta deve exibir apenas:

- Foto principal
- Nome
- Categoria
- Destaque
- Valor
- Botão "Ver Detalhes"

Não exibir lista completa de itens nesta etapa.

Princípio UX:
Usuários escaneiam primeiro e aprofundam depois. A página deve favorecer comparação rápida. :contentReference[oaicite:1]{index=1}

---

# Categorias

## ☕ Café da Manhã e Acolhimento

- Amo Cafezinho
- Amo Afeto
- Amo Estar com Você

Cor da seção:

```css
background: #F7E8E4;
```

---

## 🍃 Bem-Estar

- Amo Frutas
- Amo Leveza

Cor da seção:

```css
background: #EEF3E8;
```

---

## 💝 Doces e Carinho

- Amo Bombons
- Simples Amor
- Amo Momentos

Cor da seção:

```css
background: #F8ECEF;
```

---

## 🎉 Celebração

- Amo Celebrar

Cor da seção:

```css
background: #FFF2DD;
```

---

## 🧸 Infantil

- Bela Infância

Cor da seção:

```css
background: #EAF2FF;
```

---

## 🍻 Happy Hour

- Amo Petiscos

Cor da seção:

```css
background: #F6EFE6;
```

---

# Card da Cesta

## Layout

Foto

Nome

Frase de posicionamento

Preço

Botão Ver Detalhes

---

## Exemplo

### Amo Cafezinho

"Um café da manhã completo para começar o dia com carinho."

R$ 169,90

[ Ver Detalhes ]

---

# Selos Estratégicos

Adicionar badges discretos.

Exemplos:

Amo Cafezinho

```text
⭐ Mais Vendida
```

Amo Celebrar

```text
🎂 Aniversários
```

Amo Frutas

```text
🍓 Favorita para Recuperação
```

Amo Petiscos

```text
🍻 Happy Hour
```

Amo Leveza

```text
🌿 Opção Leve
```

Princípio UX:
Facilita a tomada de decisão sem exigir leitura extensa. :contentReference[oaicite:2]{index=2}

---

# Página de Detalhes da Cesta

Ao clicar em uma cesta:

Abrir página exclusiva.

---

## Layout Desktop

```text
-------------------------------------
| Foto Grande | Informações         |
|             |                     |
|             | Nome                |
|             | Descrição           |
|             | Preço               |
|             | WhatsApp            |
-------------------------------------

Itens Inclusos

Galeria de Fotos

Ocasiões Indicadas

Avaliações
```

---

# Seção Superior

## Foto Principal

Imagem grande.

Prioridade para foto frontal da cesta.

---

## Informações

Nome

Categoria

Preço

Descrição emocional

Exemplo:

"A combinação perfeita de café, sabores artesanais e carinho para começar o dia de forma especial."

---

# Lista de Itens

Utilizar ícones.

Exemplo:

```text
☕ Drip Coffee

🍰 Bolo de Cenoura Amovocê

🍓 Frutas da Estação

🍪 Biscoitos Artesanais

🌷 Vaso de Flores
```

Melhora escaneabilidade. :contentReference[oaicite:3]{index=3}

---

# Galeria

Exibir 4 a 6 imagens.

Não usar carrossel automático.

Miniaturas clicáveis.

Fotos recomendadas:

1. Foto frontal
2. Foto aérea
3. Detalhe dos laços
4. Detalhe das frutas
5. Detalhe dos doces
6. Foto embalada

Princípio UX:
Produtos visuais exigem múltiplas imagens para aumentar confiança e percepção de valor. :contentReference[oaicite:4]{index=4}

---

# Ocasiões Indicadas

Mostrar em cards.

Exemplo:

```text
🎂 Aniversário

🙏 Gratidão

💕 Casais

🏥 Recuperação

👵 Dia dos Avós
```

---

# Seção "Quem costuma escolher esta cesta?"

Exemplo:

### Amo Frutas

✓ Recuperação

✓ Pessoas que gostam de alimentação leve

✓ Presente de cuidado

---

### Amo Petiscos

✓ Homens

✓ Happy Hour

✓ Aniversários

✓ Presentes corporativos

---

# CTA Fixo

Botão flutuante WhatsApp.

Texto:

```text
Quero Presentear
```

Cor:

```css
#C66B8A
```

Hover:

```css
#B25577
```

---

# Paleta Oficial

## Fundo Principal

```css
#FAF6F2
```

---

## Rosa Principal

```css
#C66B8A
```

---

## Rosa Claro

```css
#E9C8D1
```

---

## Verde Leve

```css
#DCE7D5
```

---

## Texto Principal

```css
#4A3B37
```

---

## Texto Secundário

```css
#75655F
```

---

# Tipografia

## Títulos

Playfair Display

ou

Cormorant Garamond

---

## Textos

Poppins

ou

Montserrat

---

# Espaçamento

Sistema 8pt.

```css
8px
16px
24px
32px
48px
64px
```

---

# Mobile

Cada card ocupa 100%.

Ordem:

Foto

Nome

Descrição

Preço

Botão

Galeria horizontal por swipe.

CTA WhatsApp sempre visível.

---

# Conversão

Adicionar botão em todas as páginas:

```text
Solicitar pelo WhatsApp
```

Mensagem automática:

Olá! Gostaria de mais informações sobre a cesta [NOME_DA_CESTA].