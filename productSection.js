export function setupProductSection(parentDiv, productData) {
    // Check if the parent div exists
    if (!parentDiv) {
        console.log("Parent div not found");
        return;
    }

    // Create main product section container
    const container = document.createElement("div");
    container.classList.add("product-section");
    container.id = productData.title;

    // Extract product data
    const { title, price, description, items, images } = productData;

    const hasDescription = description != "";

    const imagesContainer = document.createElement("div");
    imagesContainer.classList.add("image-gallery");

    // Create main image element
    const mainFrame = document.createElement("div");
    mainFrame.classList.add("main-frame");

    // Create main image element
    const mainImage = document.createElement("img");
    mainImage.src = images[1]; // Default to first image
    mainImage.classList.add("main-image");

    // Create modal for full-size image and overlay
    const modal = document.createElement("div");
    modal.classList.add("image-modal");
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");

    // Full-size image inside modal
    const fullImage = document.createElement("img");
    fullImage.classList.add("full-image");
    modal.appendChild(fullImage);

    // Append modal and overlay to the body, so it can cover the entire screen
    document.body.appendChild(modal);
    document.body.appendChild(overlay);

    const imageCount = Object.keys(images).length;
    const shouldLoop = imageCount > 2;

    // Swiper wrapper
    const swiperContainer = document.createElement("div");
    swiperContainer.classList.add("swiper");

    // Swiper wrapper interno
    const swiperWrapper = document.createElement("div");
    swiperWrapper.classList.add("swiper-wrapper");

    // Cria cada imagem como slide
    Object.keys(images).forEach((key) => {
        const slide = document.createElement("div");
        slide.classList.add("swiper-slide");

        const img = document.createElement("img");
        img.src = images[key];
        img.classList.add("slide-image");

        // img.addEventListener("click", () => {
        //     fullImage.src = img.src;
        //     modal.style.display = "block";
        //     overlay.style.display = "block";

        //     scrollY = window.scrollY;
        //     document.body.style.top = `-${scrollY}px`;
        //     const scrollbarWidth =
        //         window.innerWidth - document.documentElement.clientWidth;
        //     document.body.style.paddingRight = `${scrollbarWidth}px`;
        //     document.body.classList.add("noscroll");
        // });

        slide.appendChild(img);
        swiperWrapper.appendChild(slide);
    });

    swiperContainer.appendChild(swiperWrapper);

    // Paginação e botões
    const pagination = document.createElement("div");
    pagination.classList.add("swiper-pagination");
    swiperContainer.appendChild(pagination);

    const nextBtn = document.createElement("div");
    nextBtn.classList.add("swiper-button-next");
    swiperContainer.appendChild(nextBtn);

    const prevBtn = document.createElement("div");
    prevBtn.classList.add("swiper-button-prev");
    swiperContainer.appendChild(prevBtn);

    // Adiciona o carrossel à galeria
    imagesContainer.appendChild(swiperContainer);

    // Inicializa o Swiper (depois de adicionar ao DOM)
    setTimeout(() => {
        new Swiper(swiperContainer, {
            loop: shouldLoop,
            pagination: {
                el: pagination,
                clickable: true,
            },
            navigation: {
                nextEl: nextBtn,
                prevEl: prevBtn,
            },
            slidesPerView: 1,
            spaceBetween: 10,
            breakpoints: {
                768: {
                    slidesPerView: 1,
                },
            },
        });
    }, 0);

    // Create description structure
    const descriptionDiv = document.createElement("div");
    descriptionDiv.classList.add("description");

    const descriptionHeader = document.createElement("div");
    descriptionHeader.classList.add("description-header");

    const h2 = document.createElement("h2");
    h2.classList.add("title");
    h2.textContent = title;

    const pPrice = document.createElement("p");
    pPrice.classList.add("price");
    pPrice.textContent = price;

    descriptionHeader.appendChild(h2);
    descriptionHeader.appendChild(pPrice);

    var textDiv;
    var descriptionText;
    if (hasDescription) {
        textDiv = document.createElement("div");
        textDiv.classList.add("text");

        descriptionText = document.createElement("p");
        descriptionText.textContent = description;
        textDiv.appendChild(descriptionText);
    }

    const itemsDiv = document.createElement("div");
    itemsDiv.classList.add("items");

    // Create a dropdown for items using <details> and <summary>
    const details = document.createElement("details");
    // Open dropdown by default on desktop, closed on mobile
    if (window.innerWidth >= 768) {
        details.setAttribute("open", "");
    }
    const summary = document.createElement("summary");
    summary.textContent = "Itens";
    details.appendChild(summary);

    // Apply event listeners to the details element
    details.addEventListener("toggle", () => animateDropdown(details));

    const itemsList = document.createElement("p");
    itemsList.textContent = items; // Assuming 'items' is a text, modify if needed.

    // Initial style setup for animated dropdown
    itemsList.style.overflow = "hidden";
    itemsList.style.transition = "height 0.3s ease"; // Adjust as needed for smoothness
    itemsList.style.height = "0"; // Start with height 0

    details.appendChild(itemsList);

    itemsDiv.appendChild(details);

    // Append all elements to the container
    mainFrame.appendChild(mainImage);
    // imagesContainer.appendChild(mainFrame);
    imagesContainer.appendChild(swiperContainer);
    container.appendChild(imagesContainer);
    descriptionDiv.appendChild(descriptionHeader);
    if (hasDescription) descriptionDiv.appendChild(textDiv);
    descriptionDiv.appendChild(itemsDiv);
    container.appendChild(descriptionDiv);

    // Append the complete product section container into the provided parent div
    parentDiv.appendChild(container);
}

function animateDropdown(details) {
    const itemsList = details.querySelector("p");

    if (details.open) {
        // Smooth opening: transition to full scrollHeight
        itemsList.style.height = `${itemsList.scrollHeight}px`;

        // After the transition ends, set height to auto to allow content resizing
        itemsList.addEventListener(
            "transitionend",
            function handleTransitionEnd() {
                itemsList.style.height = "auto";
                itemsList.removeEventListener(
                    "transitionend",
                    handleTransitionEnd
                );
            }
        );
    } else {
        // Smooth closing: get current height, then set to 0 to transition out
        itemsList.style.height = `${itemsList.scrollHeight}px`; // Set the full height first
        requestAnimationFrame(() => {
            // Next frame, set height to 0 to trigger transition
            itemsList.style.height = "0";
        });
    }
}
