export function setupCaixa() {
    const caixaImages = document.querySelector("#caixa .images");

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

    function switchCaixa() {
        switch (open) {
            case true:
                open = false;
                caixaImages.innerHTML = `<img src="${caixaData.closed}" /><p class="text" style="text-align:center;">Clique para abrir</p>`;
                break;
            case false:
                open = true;
                caixaImages.innerHTML = `<img src="${caixaData.open}" /><p class="text" style="text-align:center;">&nbsp</p>`;
                break;
        }
    }

    caixaImages.addEventListener("click", switchCaixa);
}
