const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");
const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector("#primary-nav");

if (!currentYear || !lastModified || !menuToggle || !primaryNav) {
    console.error("Temple Album page is missing a required footer or navigation element.");
} else {
    currentYear.textContent = new Date().getFullYear();
    lastModified.textContent = `Last Modification: ${document.lastModified}`;

    const closeMenu = () => {
        primaryNav.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open menu");
        menuToggle.querySelector("span").textContent = "☰";
    };

    menuToggle.addEventListener("click", () => {
        const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

        if (isOpen) {
            closeMenu();
            return;
        }

        primaryNav.classList.add("is-open");
        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.setAttribute("aria-label", "Close menu");
        menuToggle.querySelector("span").textContent = "×";
    });

    primaryNav.addEventListener("click", (event) => {
        if (event.target instanceof HTMLAnchorElement) {
            closeMenu();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });
}
