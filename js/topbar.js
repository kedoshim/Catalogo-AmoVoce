import { links } from "./topbar-links.js";

let lastScroll = 0;
let scrollThreshold = 30;
let appearTopBarThreshold = 500;
const topbar = document.getElementById("topbar");

if (topbar) {
    window.addEventListener("scroll", () => {
        const currentScroll = window.scrollY;
        let scrollAmount = Math.abs(currentScroll - lastScroll);
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
            topbar.classList.add("hidden");
        } else {
            topbar.classList.remove("hidden");
            topbar.classList.remove("clear");
        }
        lastScroll = currentScroll;
    });
}

const navbar = document.getElementById("navbar");
if (navbar) {
    const isInPagesDir = window.location.pathname.includes("/pages/");
    links.forEach((link) => {
        const a = document.createElement("a");
        let href = link.path;
        if (isInPagesDir && href.startsWith("./pages/")) {
            href = href.replace("./pages/", "./");
        }
        a.href = href;
        a.textContent = link.label;
        navbar.appendChild(a);
    });
}
