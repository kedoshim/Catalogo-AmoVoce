import { setupProductSection } from "./productSection.js";
import { products } from "../products/products-namorados-25.js";

document.addEventListener("DOMContentLoaded", function () {
    var body = document.querySelector("#cestas");

    products.forEach((product) => {
        setupProductSection(body, product);
    });

    
});

