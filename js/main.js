import { setupBolsa } from "./bolsa.js";
import { setupCarta } from "./carta.js";
import { setupCaixa } from "./caixa.js";

document.addEventListener("DOMContentLoaded", function () {
    setupBolsa();
    setupCarta();
    setupCaixa();
});

