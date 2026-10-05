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
  "amo-descobrir",
  "amo-petiscos"
];

console.log("Iniciando validação de produtos...");

if (products.length !== 12) {
  throw new Error(`Esperado 12 produtos, encontrado ${products.length}`);
}

const seenSlugs = new Set();
for (const p of products) {
  if (!p.id || !p.title || !p.price || !p.category || !p.tagline || !p.categoryName) {
    throw new Error(`Produto com campos obrigatórios ausentes: ${JSON.stringify(p)}`);
  }
  if (seenSlugs.has(p.id)) {
    throw new Error(`Slug duplicado: ${p.id}`);
  }
  seenSlugs.add(p.id);

  if (!Array.isArray(p.items) || p.items.length === 0) {
    throw new Error(`Produto ${p.id} não possui lista de itens válida`);
  }
  for (const item of p.items) {
    if (!item.text) {
      throw new Error(`Item inválido no produto ${p.id}: ${JSON.stringify(item)}`);
    }
  }

  if (!Array.isArray(p.images) || p.images.length === 0) {
    throw new Error(`Produto ${p.id} não possui imagens`);
  }

  for (const img of p.images) {
    if (!fs.existsSync(img)) {
      const altImg = img.endsWith(".jpg") ? img.replace(".jpg", ".jpeg") : img.replace(".jpeg", ".jpg");
      if (!fs.existsSync(altImg)) {
        console.warn(`Aviso: imagem não encontrada no disco: ${img}`);
      }
    }
  }
}

for (const slug of expectedSlugs) {
  if (!seenSlugs.has(slug)) {
    throw new Error(`Slug esperado não encontrado: ${slug}`);
  }
}

console.log("✓ Todos os 12 produtos foram validados com sucesso!");
