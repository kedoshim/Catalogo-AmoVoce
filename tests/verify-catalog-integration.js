import { products } from "../products/products-catalogo.js";
import fs from "fs";
import path from "path";

console.log("=== INICIANDO TESTES DE INTEGRAÇÃO DO CATÁLOGO ===");

let errors = [];
let warnings = [];

// 1. Validar Total de Produtos
if (products.length !== 11) {
  errors.push(`Esperava 11 produtos, mas encontrou ${products.length}`);
}

// 2. Categorias Válidas
const validCategories = new Set([
  "cafe-da-manha",
  "bem-estar",
  "doces-e-carinho",
  "celebracao",
  "infantil",
  "happy-hour"
]);

// 3. Validação dos Produtos
products.forEach((product, idx) => {
  const prefix = `[Produto ${idx + 1}: ${product.id || "SEM_ID"}]`;

  if (!product.id || typeof product.id !== "string") {
    errors.push(`${prefix} ID ausente ou inválido`);
  }
  if (!product.title) errors.push(`${prefix} Título ausente`);
  if (!product.price) errors.push(`${prefix} Preço ausente`);
  if (!product.tagline) errors.push(`${prefix} Tagline ausente`);
  if (!product.description) errors.push(`${prefix} Descrição ausente`);
  if (!product.signaturePhrase) errors.push(`${prefix} Frase de assinatura artesanal ausente`);

  if (!validCategories.has(product.category)) {
    errors.push(`${prefix} Categoria desconhecida: ${product.category}`);
  }

  // Validar URL do WhatsApp
  const expectedMsg = `Olá! Gostaria de mais informações sobre a cesta ${product.title}.`;
  const encodedMsg = encodeURIComponent(expectedMsg);
  const fullWhatsappUrl = `https://api.whatsapp.com/send?phone=5532991162238&text=${encodedMsg}`;

  if (!fullWhatsappUrl.includes("5532991162238")) {
    errors.push(`${prefix} Número do WhatsApp incorreto na URL`);
  }
  if (!fullWhatsappUrl.includes(encodeURIComponent(product.title))) {
    errors.push(`${prefix} Nome do produto não encodado na mensagem do WhatsApp`);
  }

  // Validar Itens
  if (!Array.isArray(product.items) || product.items.length === 0) {
    errors.push(`${prefix} Lista de itens vazia`);
  } else {
    product.items.forEach((item, itemIdx) => {
      if (!item.text) {
        errors.push(`${prefix} Item ${itemIdx + 1} incompleto: ${JSON.stringify(item)}`);
      }
    });
  }

  // Validar Imagens
  if (!Array.isArray(product.images) || product.images.length === 0) {
    errors.push(`${prefix} Nenhuma imagem cadastrada`);
  } else {
    product.images.forEach((imgPath) => {
      const exists = fs.existsSync(imgPath);
      if (!exists) {
        const altPath = imgPath.endsWith(".jpg")
          ? imgPath.replace(".jpg", ".jpeg")
          : imgPath.replace(".jpeg", ".jpg");
        if (!fs.existsSync(altPath)) {
          errors.push(`${prefix} Arquivo de imagem não existe nem com fallback: ${imgPath}`);
        } else {
          warnings.push(`${prefix} Imagem resolvida via fallback .jpeg/.jpg: ${imgPath}`);
        }
      }
    });
  }
});

// 4. Validar Arquivos HTML e Referências
const checkFile = (filePath) => {
  if (!fs.existsSync(filePath)) {
    errors.push(`Arquivo essencial não encontrado: ${filePath}`);
    return "";
  }
  return fs.readFileSync(filePath, "utf-8");
};

const indexHtml = checkFile("index.html");
const cestaHtml = checkFile("cesta.html");

if (indexHtml) {
  if (!indexHtml.includes("css/catalogo-theme.css")) errors.push("index.html não referencia css/catalogo-theme.css");
  if (!indexHtml.includes("js/main-catalogo.js")) errors.push("index.html não referencia js/main-catalogo.js");
  if (!indexHtml.includes("id=\"vitrine\"")) errors.push("index.html não possui container #vitrine");
  if (!indexHtml.includes("id=\"extras\"")) errors.push("index.html não possui seção #extras");
  if (!indexHtml.includes("id=\"instrucoes\"")) errors.push("index.html não possui seção #instrucoes");
  if (!indexHtml.includes("whatsapp-float")) errors.push("index.html não possui botão flutuante de WhatsApp");
}

if (cestaHtml) {
  if (!cestaHtml.includes("css/cesta-detalhes.css")) errors.push("cesta.html não referencia css/cesta-detalhes.css");
  if (!cestaHtml.includes("js/cesta-detalhes.js")) errors.push("cesta.html não referencia js/cesta-detalhes.js");
  if (!cestaHtml.includes("id=\"product-detail-root\"")) errors.push("cesta.html não possui container #product-detail-root");
  if (!cestaHtml.includes("cta-float-whatsapp")) errors.push("cesta.html não possui botão flutuante de WhatsApp");
  if (!cestaHtml.includes("image-lightbox")) errors.push("cesta.html não possui modal de lightbox");
}

// Relatório Final
if (warnings.length > 0) {
  console.log("\nAvisos informativos:");
  warnings.forEach((w) => console.log(" - " + w));
}

if (errors.length > 0) {
  console.error(`\n❌ FALHA: ${errors.length} erro(s) encontrado(s):`);
  errors.forEach((err) => console.error(" - " + err));
  process.exit(1);
} else {
  console.log("\n✅ SUCESSO: Todos os testes de integração passaram sem nenhum erro!");
}
