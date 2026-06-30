/* ==========================================
   MAIN.JS
   Shared UI helpers for the frontend
========================================== */

function formatCurrency(price) {
    const value = Number(price) || 0;
    return `₹${value.toLocaleString("en-IN")}`;
}

function showMessage(message, type = "success") {
    const existing = document.querySelector(".toast-message");
    if (existing) existing.remove();

    const alertBox = document.createElement("div");
    alertBox.className = `toast-message ${type}`;
    alertBox.textContent = message;
    document.body.appendChild(alertBox);

    setTimeout(() => alertBox.classList.add("show"), 50);
    setTimeout(() => {
        alertBox.classList.remove("show");
        setTimeout(() => alertBox.remove(), 300);
    }, 2200);
}

function showLoader() {
    const loader = document.querySelector(".loader");
    if (loader) loader.style.display = "flex";
}

function hideLoader() {
    const loader = document.querySelector(".loader");
    if (loader) loader.style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
    const currentPage = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll(".nav-links a");

    navLinks.forEach(link => {
        const page = link.getAttribute("href");
        if (page === currentPage) {
            link.classList.add("active");
        }
    });
});
