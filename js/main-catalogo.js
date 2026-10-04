import { products } from "../products/products-catalogo.js";

const categories = [
  {
    id: "cat-cafe",
    slug: "cafe-da-manha",
    title: "☕ Café da Manhã e Acolhimento",
    subtitle: "Para começar o dia com calma, aconchego e sabores artesanais especiais.",
    className: "cat-cafe-da-manha"
  },
  {
    id: "cat-bem-estar",
    slug: "bem-estar",
    title: "🍃 Bem-Estar",
    subtitle: "Frescor, equilíbrio e opções com frutas e escolhas pensadas para o cuidado da saúde.",
    className: "cat-bem-estar"
  },
  {
    id: "cat-doces",
    slug: "doces-e-carinho",
    title: "💝 Doces e Carinho",
    subtitle: "Chocolates nobres, cafés e delícias que transformam momentos simples em lembranças doces.",
    className: "cat-doces-e-carinho"
  },
  {
    id: "cat-celebrar",
    slug: "celebracao",
    title: "🎉 Celebração",
    subtitle: "Uma mesa comemorativa completa e generosa para aniversários e grandes datas.",
    className: "cat-celebracao"
  },
  {
    id: "cat-infantil",
    slug: "infantil",
    title: "🧸 Infantil",
    subtitle: "Cores, surpresas e guloseimas para iluminar o sorriso e encantar os pequenos.",
    className: "cat-infantil"
  },
  {
    id: "cat-petiscos",
    slug: "happy-hour",
    title: "🍻 Happy Hour",
    subtitle: "Petiscos selecionados, aperitivos crocantes e cerveja gelada para brindar bons momentos.",
    className: "cat-happy-hour"
  }
];

function setImageWithFallback(img, src) {
  img.src = src;
  img.onerror = function () {
    img.onerror = null;
    if (this.src.endsWith(".jpg")) {
      this.src = this.src.replace(/\.jpg$/, ".jpeg");
    } else if (this.src.endsWith(".jpeg")) {
      this.src = this.src.replace(/\.jpeg$/, ".jpg");
    }
  };
}

document.addEventListener("DOMContentLoaded", function () {
  const vitrineRoot = document.getElementById("vitrine");
  if (!vitrineRoot) {
    console.error("Elemento #vitrine não encontrado");
    return;
  }

  vitrineRoot.innerHTML = "";

  categories.forEach((cat) => {
    const categoryProducts = products.filter((p) => p.category === cat.slug);
    if (categoryProducts.length === 0) return;

    const section = document.createElement("section");
    section.id = cat.id;
    section.className = `category-section ${cat.className}`;

    const container = document.createElement("div");
    container.className = "category-container";

    const header = document.createElement("div");
    header.className = "category-header";

    const title = document.createElement("h2");
    title.className = "category-title";
    title.textContent = cat.title;

    const subtitle = document.createElement("p");
    subtitle.className = "category-subtitle";
    subtitle.textContent = cat.subtitle;

    header.appendChild(title);
    header.appendChild(subtitle);
    container.appendChild(header);

    const grid = document.createElement("div");
    grid.className = "baskets-grid";

    categoryProducts.forEach((product) => {
      const card = document.createElement("article");
      card.className = "basket-card";
      card.id = `card-${product.id}`;

      // Media
      const media = document.createElement("div");
      media.className = "basket-card-media";

      if (product.tag || product.secondaryTag) {
        const badgeWrap = document.createElement("div");
        badgeWrap.className = "basket-card-badges-wrap";

        if (product.tag) {
          const badge = document.createElement("span");
          badge.className = "basket-card-badge";
          badge.textContent = product.tag;
          badgeWrap.appendChild(badge);
        }

        if (product.secondaryTag) {
          const secBadge = document.createElement("span");
          secBadge.className = "basket-card-badge basket-card-badge-secondary";
          secBadge.textContent = product.secondaryTag;
          badgeWrap.appendChild(secBadge);
        }

        media.appendChild(badgeWrap);
      }

      const img = document.createElement("img");
      img.className = "basket-card-image";
      img.alt = product.title;
      img.loading = "lazy";
      setImageWithFallback(img, product.images[0]);
      media.appendChild(img);

      // Body
      const body = document.createElement("div");
      body.className = "basket-card-body";

      const cardTitle = document.createElement("h3");
      cardTitle.className = "basket-card-title";
      cardTitle.textContent = product.title;

      const tagline = document.createElement("p");
      tagline.className = "basket-card-tagline";
      tagline.textContent = `“${product.tagline}”`;

      const priceRow = document.createElement("div");
      priceRow.className = "basket-card-price-row";

      const price = document.createElement("span");
      price.className = "basket-card-price";
      price.textContent = `R$ ${product.price}`;

      const paymentNote = document.createElement("span");
      paymentNote.className = "basket-card-payment-note";
      paymentNote.textContent = "Pix à vista ou cartão de crédito*";

      priceRow.appendChild(price);
      priceRow.appendChild(paymentNote);

      const actionBtn = document.createElement("a");
      actionBtn.className = "basket-card-action";
      actionBtn.href = `cesta.html?id=${product.id}`;
      actionBtn.innerHTML = `Ver Detalhes <span>→</span>`;

      body.appendChild(cardTitle);
      body.appendChild(tagline);
      body.appendChild(priceRow);
      body.appendChild(actionBtn);

      card.appendChild(media);
      card.appendChild(body);
      grid.appendChild(card);
    });

    container.appendChild(grid);
    section.appendChild(container);
    vitrineRoot.appendChild(section);
  });

  const disclaimer = document.createElement("p");
  disclaimer.className = "catalog-payment-disclaimer";
  disclaimer.textContent = "*Pagamento no cartão sujeito a acréscimo de 6%.";
  vitrineRoot.appendChild(disclaimer);
});
