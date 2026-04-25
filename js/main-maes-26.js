import { setupProductSection } from "./productSection.js";
import { products } from "../products/products-mae-26.js";

document.addEventListener("DOMContentLoaded", function () {
    var body = document.querySelector("#cestas");

    products.forEach((product) => {
        setupProductSection(body, product);
    });

    
});

