import { setupCaixote } from "./caixote.js";
import { setupBolsa } from "./bolsa.js";
import { setupCarta } from "./carta.js";
import { setupCaixa } from "./caixa.js";
import { setupProductSection } from "../productSection.js";
import { products } from "./products.js";

document.addEventListener("DOMContentLoaded", function () {
    var body = document.querySelector("body");

    products.forEach((product) => {
        setupProductSection(body, product);
    });
});

