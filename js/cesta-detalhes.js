import { products, extras } from "../products/products-catalogo.js";

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

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("product-detail-root");
  const floatingCta = document.getElementById("floating-cta-whatsapp");
  const lightbox = document.getElementById("image-lightbox");
  const lightboxImg = document.getElementById("lightbox-image");
  const lightboxClose = document.getElementById("lightbox-close");
  const lightboxOverlay = document.getElementById("lightbox-overlay");

  if (!root) {
    console.error("Elemento #product-detail-root não encontrado");
    return;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");
  const product = products.find((p) => p.id === productId);

  // 1. Caso de Erro / Produto não encontrado
  if (!product) {
    document.title = "Cesta não encontrada | Amo Você Cestas";
    if (floatingCta) floatingCta.style.display = "none";

    root.innerHTML = `
      <div class="product-not-found">
        <h2>Cesta não encontrada</h2>
        <p>Não encontramos a cesta solicitada. Que tal explorar todas as opções em nosso catálogo completo?</p>
        <a href="index.html" class="btn-primary">Ver todas as cestas</a>
      </div>
    `;
    return;
  }

  // 2. Atualizar título da página e dados de SEO
  document.title = `${product.title} — R$ ${product.price} | Amo Você Cestas`;

  // 3. Montar URLs do WhatsApp com mensagem personalizada
  const whatsappMsg = encodeURIComponent(
    `Olá! Gostaria de mais informações sobre a cesta ${product.title}.`
  );
  const whatsappUrl = `https://api.whatsapp.com/send?phone=5532991162238&text=${whatsappMsg}`;

  if (floatingCta) {
    floatingCta.href = whatsappUrl;
  }

  // 4. Renderizar a Estrutura Superior (2 Colunas)
  const heroGrid = document.createElement("section");
  heroGrid.className = "detail-hero-grid";

  // --- Coluna Esquerda: Galeria de Fotos ---
  const galleryCol = document.createElement("div");
  galleryCol.className = "detail-gallery-col";

  const mainWrapper = document.createElement("div");
  mainWrapper.className = "main-photo-wrapper";
  mainWrapper.setAttribute("title", "Clique para ampliar a foto");

  const mainImg = document.createElement("img");
  mainImg.className = "main-photo";
  mainImg.alt = product.title;
  setImageWithFallback(mainImg, product.images[0]);

  const zoomHint = document.createElement("div");
  zoomHint.className = "zoom-hint";
  zoomHint.innerHTML = `<span>Ampliar Foto</span>`;

  mainWrapper.appendChild(mainImg);
  mainWrapper.appendChild(zoomHint);
  galleryCol.appendChild(mainWrapper);

  // Miniaturas
  if (product.images.length > 1) {
    const thumbsGrid = document.createElement("div");
    thumbsGrid.className = "thumbnails-grid";

    product.images.forEach((imgSrc, index) => {
      const thumbBtn = document.createElement("button");
      thumbBtn.className = `thumbnail-btn ${index === 0 ? "active" : ""}`;
      thumbBtn.setAttribute("type", "button");
      thumbBtn.setAttribute("aria-label", `Ver foto ${index + 1} de ${product.title}`);

      const thumbImg = document.createElement("img");
      setImageWithFallback(thumbImg, imgSrc);
      thumbImg.alt = `Miniatura ${index + 1}`;

      thumbBtn.appendChild(thumbImg);

      thumbBtn.addEventListener("click", () => {
        // Troca suave de imagem principal
        mainImg.style.opacity = "0.4";
        setTimeout(() => {
          setImageWithFallback(mainImg, imgSrc);
          mainImg.style.opacity = "1";
        }, 150);

        thumbsGrid.querySelectorAll(".thumbnail-btn").forEach((btn) => {
          btn.classList.remove("active");
        });
        thumbBtn.classList.add("active");
      });

      thumbsGrid.appendChild(thumbBtn);
    });

    galleryCol.appendChild(thumbsGrid);
  }

  // --- Coluna Direita: Informações Comerciais ---
  const infoCol = document.createElement("div");
  infoCol.className = "detail-info-col";

  const badgeRow = document.createElement("div");
  badgeRow.className = "detail-badge-row";

  const catChip = document.createElement("span");
  catChip.className = "detail-category-chip";
  catChip.textContent = product.categoryName;
  badgeRow.appendChild(catChip);

  if (product.tag) {
    const tagBadge = document.createElement("span");
    tagBadge.className = "detail-strategic-tag";
    tagBadge.textContent = product.tag;
    badgeRow.appendChild(tagBadge);
  }

  if (product.secondaryTag) {
    const secBadge = document.createElement("span");
    secBadge.className = "detail-strategic-tag detail-strategic-tag-secondary";
    secBadge.textContent = product.secondaryTag;
    badgeRow.appendChild(secBadge);
  }

  const title = document.createElement("h1");
  title.className = "detail-title";
  title.textContent = product.title;

  const tagline = document.createElement("p");
  tagline.className = "detail-tagline";
  tagline.textContent = `“${product.tagline}”`;

  const desc = document.createElement("p");
  desc.className = "detail-description";
  desc.textContent = product.description;

  const priceBox = document.createElement("div");
  priceBox.className = "detail-price-box";
  priceBox.innerHTML = `
    <div class="detail-price-label">Valor do Presente</div>
    <div class="detail-price-value">R$ ${product.price}</div>
    <div class="detail-payment-terms">
      <span>Pix à vista ou cartão de crédito*</span>
      <span class="detail-payment-disclaimer">*Pagamento no cartão sujeito a acréscimo de 6%.</span>
    </div>
  `;

  const orderBtn = document.createElement("a");
  orderBtn.className = "btn-whatsapp-order";
  orderBtn.href = whatsappUrl;
  orderBtn.target = "_blank";
  orderBtn.rel = "noopener noreferrer";
  orderBtn.innerHTML = `
    <img src="img/icons/whatsapp.svg" alt="WhatsApp" />
    <span>Solicitar pelo WhatsApp</span>
  `;

  infoCol.appendChild(badgeRow);
  infoCol.appendChild(title);
  infoCol.appendChild(tagline);
  infoCol.appendChild(desc);
  infoCol.appendChild(priceBox);
  infoCol.appendChild(orderBtn);

  // 4b. Itens Inclusos — inline dentro da coluna de info para hierarquia clara
  if (Array.isArray(product.items) && product.items.length > 0) {
    const itemsInline = document.createElement("div");
    itemsInline.className = "detail-items-inline";

    const itemsTitle = document.createElement("h2");
    itemsTitle.className = "detail-items-inline-title";
    itemsTitle.textContent = "🎁 O que vem na cesta";

    const itemsList = document.createElement("ul");
    itemsList.className = "detail-items-inline-list";

    product.items.forEach((item) => {
      const li = document.createElement("li");
      li.className = "detail-items-inline-item";
      li.innerHTML = `<span class="item-dot"></span><span>${item.text}</span>`;
      itemsList.appendChild(li);
    });

    itemsInline.appendChild(itemsTitle);
    itemsInline.appendChild(itemsList);
    infoCol.appendChild(itemsInline);
  }

  heroGrid.appendChild(galleryCol);
  heroGrid.appendChild(infoCol);
  root.appendChild(heroGrid);

  // 5. (Itens Inclusos agora renderizados na coluna de info acima)

  // 6. Seção de Destaques da Cesta
  if (Array.isArray(product.highlights) && product.highlights.length > 0) {
    const highlightsSection = document.createElement("section");
    highlightsSection.className = "detail-section";

    highlightsSection.innerHTML = `
      <div class="detail-section-header">
        <h2 class="detail-section-title">✨ Destaques Desta Cesta</h2>
        <p class="detail-section-subtitle">Os diferenciais e sabores marcantes que encantam:</p>
      </div>
      <div class="highlights-grid" id="highlights-grid-container"></div>
    `;

    const highlightsGrid = highlightsSection.querySelector("#highlights-grid-container");
    product.highlights.forEach((hl) => {
      const hlCard = document.createElement("div");
      hlCard.className = "highlight-card";
      hlCard.textContent = hl;
      highlightsGrid.appendChild(hlCard);
    });

    root.appendChild(highlightsSection);
  }

  // 7. Seção de Ocasiões Indicadas
  if (Array.isArray(product.occasions) && product.occasions.length > 0) {
    const occasionsSection = document.createElement("section");
    occasionsSection.className = "detail-section";

    occasionsSection.innerHTML = `
      <div class="detail-section-header">
        <h2 class="detail-section-title">🎉 Ocasiões Indicadas</h2>
        <p class="detail-section-subtitle">Momentos perfeitos para surpreender com este presente:</p>
      </div>
      <div class="occasions-grid" id="occasions-grid-container"></div>
    `;

    const occasionsGrid = occasionsSection.querySelector("#occasions-grid-container");
    product.occasions.forEach((occ) => {
      const occCard = document.createElement("div");
      occCard.className = "occasion-card";
      occCard.innerHTML = `
        <span class="occasion-label">${occ.label}</span>
      `;
      occasionsGrid.appendChild(occCard);
    });

    root.appendChild(occasionsSection);
  }

  // 8. Seção "Quem Costuma Escolher Esta Cesta"
  if (Array.isArray(product.targetAudience) && product.targetAudience.length > 0) {
    const audienceSection = document.createElement("section");
    audienceSection.className = "detail-section";

    audienceSection.innerHTML = `
      <div class="detail-section-header">
        <h2 class="detail-section-title">👥 Quem Costuma Escolher Esta Cesta?</h2>
        <p class="detail-section-subtitle">Perfis e motivações de quem mais se apaixona por esta opção:</p>
      </div>
      <ul class="audience-list" id="audience-list-container"></ul>
    `;

    const audienceList = audienceSection.querySelector("#audience-list-container");
    product.targetAudience.forEach((aud) => {
      const audItem = document.createElement("li");
      audItem.className = "audience-item";
      audItem.innerHTML = `<span class="audience-check">✓</span><span>${aud}</span>`;
      audienceList.appendChild(audItem);
    });

    root.appendChild(audienceSection);
  }

  // 8b. Seção de Adicionais para Personalizar o Presente
  if (Array.isArray(extras) && extras.length > 0) {
    const extrasSection = document.createElement("section");
    extrasSection.className = "detail-section detail-extras-section";

    extrasSection.innerHTML = `
      <div class="detail-section-header">
        <h2 class="detail-section-title">✨ Adicionais para Encantar Ainda Mais</h2>
        <p class="detail-section-subtitle">Que tal personalizar seu presente? Você pode incluir qualquer um desses mimos ao fazer seu pedido:</p>
      </div>
      <div class="detail-extras-grid" id="detail-extras-container"></div>
      <div class="detail-extras-footer">
        <p>💡 <em>Deseja incluir algum adicional? Basta nos avisar no WhatsApp ao solicitar sua cesta!</em></p>
      </div>
    `;

    const extrasGrid = extrasSection.querySelector("#detail-extras-container");
    extras.forEach((extra) => {
      const extraCard = document.createElement("div");
      extraCard.className = "detail-extra-card";
      extraCard.innerHTML = `
        <div class="detail-extra-media">
          <img src="${extra.image}" alt="${extra.title}" loading="lazy" />
        </div>
        <div class="detail-extra-body">
          <div class="detail-extra-title-row">
            <h3 class="detail-extra-title">${extra.title}</h3>
            <span class="detail-extra-price">R$ ${extra.price}${extra.unit ? ` <small>${extra.unit}</small>` : ""}</span>
          </div>
          <p class="detail-extra-desc">${extra.description}</p>
        </div>
      `;
      extrasGrid.appendChild(extraCard);
    });

    root.appendChild(extrasSection);
  }

  // 9. Assinatura Artesanal Amo Você
  const signatureSection = document.createElement("div");
  signatureSection.className = "signature-box";
  signatureSection.innerHTML = `
    <div class="signature-logo-wrap">
      <img src="img/icons/logo.png" alt="Amo Você Cestas" class="signature-logo" />
    </div>
    <h3 class="signature-title">Toque Artesanal Exclusivo</h3>
    <p class="signature-phrase">“${product.signaturePhrase}”</p>
  `;
  root.appendChild(signatureSection);

  // 10. Interatividade do Lightbox
  if (lightbox && lightboxImg) {
    mainWrapper.addEventListener("click", () => {
      lightboxImg.src = mainImg.src;
      lightbox.classList.add("active");
      lightbox.setAttribute("aria-hidden", "false");
    });

    function closeLightbox() {
      lightbox.classList.remove("active");
      lightbox.setAttribute("aria-hidden", "true");
    }

    if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
    if (lightboxOverlay) lightboxOverlay.addEventListener("click", closeLightbox);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && lightbox.classList.contains("active")) {
        closeLightbox();
      }
    });
  }
});
