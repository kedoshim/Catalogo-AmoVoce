import { setupProductSection } from "./productSection.js";
import { products } from "../products/products-pais-26.js";

document.addEventListener("DOMContentLoaded", function () {
    var body = document.querySelector("#cestas");

    if (body) {
        products.forEach((product) => {
            setupProductSection(body, product);
        });
    }
});
