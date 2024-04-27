export function setupCaixote() {
    const caixoteMainImage = document.querySelector("#caixote .images>img");
    const caixoteThumbnails = document.querySelectorAll("#caixote #thumbnails img");

    
    if (!caixoteMainImage) {
        console.log("Caixote not found");
        return;
    }

    var imagePaths = {
        1: "img/caixote/1.png",
        2: "img/caixote/2.png",
        3: "img/caixote/3.png",
        4: "img/caixote/4.png",
        5: "img/caixote/5.png",
        6: "img/caixote/6.png",
    };

    let previousIndex = 1;
    function changeMainImage(index) {
        caixoteMainImage.src = imagePaths[index];
        
        caixoteThumbnails[index - 1].classList.toggle("selected")
        caixoteThumbnails[previousIndex - 1].classList.toggle("selected")
        

        previousIndex = index;
    }

    caixoteThumbnails.forEach((thumb, index) => {
        thumb.addEventListener("click", () => {
            changeMainImage(index + 1);
        })
    });
}
