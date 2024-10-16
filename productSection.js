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

    const hasDescription = description != '';

    const imagesContainer = document.createElement("div");
    imagesContainer.classList.add("image-gallery");

    // Create main image element
    const mainFrame = document.createElement("div");
    mainFrame.classList.add("main-frame");

    // Create main image element
    const mainImage = document.createElement("img");
    mainImage.src = images[1]; // Default to first image
    mainImage.classList.add("main-image");

    // Create thumbnail container
    const thumbnailContainer = document.createElement("div");
    thumbnailContainer.id = "thumbnails";
    thumbnailContainer.classList.add("thumbnail-container");

    let previousIndex = 1;

    function changeMainImage(index) {
        mainImage.src = images[index];
        const selectedThumbnail = thumbnailContainer.querySelector(".selected");
        if (selectedThumbnail) selectedThumbnail.classList.remove("selected");
        thumbnailContainer.children[index - 1].classList.add("selected");
        previousIndex = index;
    }

    // Populate thumbnails
    Object.keys(images).forEach((key, index) => {
        const frame = document.createElement("div");
        frame.classList.add("thumb-frame");
        const thumb = document.createElement("img");
        thumb.src = images[key];
        if (index === 0) frame.classList.add("selected"); // Mark first as selected
        frame.addEventListener("click", () => {
            changeMainImage(index + 1);
        });
        frame.appendChild(thumb);
        thumbnailContainer.appendChild(frame);
    });

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

    if (hasDescription) {
    const textDiv = document.createElement("div");
    textDiv.classList.add("text");

        const descriptionText = document.createElement("p");
        descriptionText.textContent = description;
        textDiv.appendChild(descriptionText);
    }

    const itemsDiv = document.createElement("div");
    itemsDiv.classList.add("items");

    // Create a dropdown for items using <details> and <summary>
    const details = document.createElement("details");
    const summary = document.createElement("summary");
    summary.textContent = "Items";
    details.appendChild(summary);

    const itemsList = document.createElement("p");
    itemsList.textContent = items; // Assuming 'items' is a text, modify if needed.
    details.appendChild(itemsList);

    itemsDiv.appendChild(details);

    // Append all elements to the container
    mainFrame.appendChild(mainImage);
    imagesContainer.appendChild(mainFrame);
    imagesContainer.appendChild(thumbnailContainer);
    container.appendChild(imagesContainer);
    descriptionDiv.appendChild(descriptionHeader);
    if (hasDescription) descriptionDiv.appendChild(textDiv);
    descriptionDiv.appendChild(itemsDiv);
    container.appendChild(descriptionDiv);

    // Append the complete product section container into the provided parent div
    parentDiv.appendChild(container);
}
