export function setupCaixa() {
    const caixaImages = document.querySelector("#caixa .images");

    
    if (!caixaImages) {
        console.log("Caixa not found");
        return;
    }

    let open = false;
    let caixaData = {
        open: "img/caixa/open.png",
        closed: "img/caixa/closed.png",
    };

    // Preload images
    const preloadImages = () => {
        for (let key in caixaData) {
            const img = new Image();
            img.src = caixaData[key];
        }
    };
    preloadImages();

    // Create image elements
    const closedImage = new Image();
    closedImage.src = caixaData.closed;
    const openImage = new Image();
    openImage.src = caixaData.open;

    // Create text elements
    const closedText = document.createElement("p");
    closedText.className = "text";
    closedText.style.textAlign = "center";
    closedText.textContent = "clique para abrir";

    const openText = document.createElement("p");
    openText.className = "text";
    openText.style.textAlign = "center";
    openText.textContent = "clique para fechar";

    function switchCaixa() {
        // Clear existing content
        while (caixaImages.firstChild) {
            caixaImages.removeChild(caixaImages.firstChild);
        }

        if (open) {
            open = false;
            caixaImages.appendChild(closedImage);
            caixaImages.appendChild(closedText);
        } else {
            open = true;
            caixaImages.appendChild(openImage);
            caixaImages.appendChild(openText);
        }
    }

    caixaImages.addEventListener("click", switchCaixa);
}
 