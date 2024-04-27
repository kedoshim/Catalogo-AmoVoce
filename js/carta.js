/* 
<img id="main" src="img/carta/1.png" />
<div id="thumbnails">
    <img src="img/carta/1.png" />
    <img src="img/carta/2.png" />
    <img src="img/carta/3.png" />
    <img src="img/carta/4.png" />
    <img src="img/carta/5.png" />
    <img src="img/carta/6.png" />
</div> 
*/

export function setupCarta() {
    const cartaMainImage = document.querySelector("#carta .images>img");
    const cartaThumbnails = document.querySelectorAll("#carta #thumbnails img");

    
    if (!cartaMainImage) {
        console.log("Carta not found");
        return;
    }

    var imagePaths = {
        1: "img/carta/1.png",
        2: "img/carta/2.png",
        3: "img/carta/3.png",
        4: "img/carta/4.png",
        5: "img/carta/5.png",
        6: "img/carta/6.png",
    };

    let previousIndex = 1;
    function changeMainImage(index) {
        cartaMainImage.src = imagePaths[index];
        
        cartaThumbnails[index - 1].classList.toggle("selected")
        cartaThumbnails[previousIndex - 1].classList.toggle("selected")
        

        previousIndex = index;
    }

    cartaThumbnails.forEach((thumb, index) => {
        thumb.addEventListener("click", () => {
            changeMainImage(index + 1);
        })
    });
}
