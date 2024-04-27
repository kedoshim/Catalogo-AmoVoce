// <div class="images">
//     <img src="img/bolsa/1.png" id="main" />
//     <div class="arrow" id="left">
//         <img src="img/icons/left-arrow.svg" />
//     </div>
//     <div class="arrow" id="right">
//         <img src="img/icons/right-arrow.svg" />
//     </div>
//     <div id="selector-lines">
//         <div class="cream-line"></div>
//         <div class="cream-line"></div>
//         <div class="cream-line"></div>
//         <div class="cream-line"></div>
//     </div>
// </div>;

export function setupBolsa() {
    let selectorLines = document.querySelectorAll("#selector-lines div");
    let mainImage = document.querySelector("#bolsa #main");

    const leftButton = document.querySelector(".arrow#left");
    const rightButton = document.querySelector(".arrow#right");

    if (!mainImage) { console.log("Bolsa not found"); return; }

    leftButton.addEventListener("click", moveImageLeft);
    rightButton.addEventListener("click", moveImageRight);


    const imagePaths = {
        1: "img/bolsa/1.png",
        2: "img/bolsa/2.png",
        3: "img/bolsa/3.png",
        4: "img/bolsa/4.png",
    };

    let previousIndex = 1;

    function moveImageRight() {
        let currentIndex = previousIndex + 1;
        if (currentIndex > 4) currentIndex = 1;
        mainImage.src = imagePaths[currentIndex];
        updateLines(currentIndex);
    }

    function moveImageLeft() {
        let currentIndex = previousIndex - 1;
        if (currentIndex < 1) currentIndex = 4;
        mainImage.src = imagePaths[currentIndex];
        updateLines(currentIndex);
    }

    function updateLines(index) {
        selectorLines[previousIndex - 1].classList = "cream-line";
        selectorLines[index - 1].classList = "red-line";

        previousIndex = index;
    }
}
