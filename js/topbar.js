import { links } from "./topbar-links.js";

let lastScroll = 0;
let scrollThreshold = 30;
let appearTopBarThreshold = 500
const topbar = document.getElementById("topbar");

window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;
    let scrollAmount = Math.abs(currentScroll - lastScroll);
    // console.log(`Current Scroll: ${currentScroll}, Appear Threshold: ${appearTopBarThreshold}, Scroll Amount: ${scrollAmount}`);
    if (currentScroll < appearTopBarThreshold) {
        topbar.classList.remove("hidden");
        topbar.classList.add("clear");
        lastScroll = currentScroll;
        return;
    }
    if (scrollAmount < scrollThreshold) {
        lastScroll = currentScroll;
        return;
    }
    if (currentScroll > lastScroll) {
        // Scroll down
        topbar.classList.add("hidden");
    }
    // else if (currentScroll < lastScroll && scrollAmount < appearTopBarThreshold) {
    //     topbar.classList.add("hidden");
    // }
    else {
        // Scroll up
        topbar.classList.remove("hidden");
        topbar.classList.remove("clear");
    }
    lastScroll = currentScroll;
});

const navbar = document.getElementById("navbar");
links.forEach((link) => {
    const a = document.createElement("a");
    a.href = link.path;
    a.textContent = link.label;
    navbar.appendChild(a);
});
