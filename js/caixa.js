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

    // HTML templates
    const closedTemplate = `
        <img src="${caixaData.closed}" />
        <p class="text" style="text-align:center;">clique para abrir</p>
    `;
    const openTemplate = `
        <img src="${caixaData.open}" />
        <p class="text" style="text-align:center;">clique para fechar</p>
    `;

    function switchCaixa() {
        if (open) {
            open = false;
            caixaImages.innerHTML = closedTemplate;
        } else {
            open = true;
            caixaImages.innerHTML = openTemplate;
        }
    }

    caixaImages.addEventListener("click", switchCaixa);
}
