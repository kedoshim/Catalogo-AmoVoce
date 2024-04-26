// Caixa section

let caixaImages = document.querySelector("#caixa .images");

let open = false;
let caixaData = {
    open: "img/caixa/open.png",
    closed: "img/caixa/closed.png",
}
function switchCaixa() {

    switch (open) {
        case true: open = false;
            caixaImages.innerHTML = `<img src=${caixaData.closed} /><p class="text" style="text-align:center;">&nbsp</p>`;
            break;
        case false: open = true;
            caixaImages.innerHTML = `<img src=${caixaData.open} /><p class="text" style="text-align:center;">Clique para abrir</p>`
            break;
    }


}

caixaImages.addEventListener("click", switchCaixa);