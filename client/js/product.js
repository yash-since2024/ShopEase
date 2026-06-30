/* ==========================================
   PRODUCT.JS
   Handles single-product detail view
========================================== */

const PRODUCT_API_URL = "http://localhost:5000/api/products";

function getImageBasePath() {
    return window.location.pathname.includes("/pages/") ? "../images/" : "./images/";
}

function resolveProductImage(product) {
    const imageNameMap = {
        "Wireless Headphones": "headphone.jpg",
        "Smart Watch": "smart watch.jpg",
        "Classic T-Shirt": "t shirt.jpg",
        "Running Shoes": "shoes.jpg",
        "Laptop Backpack": "bagpack.jpg",
        "Coffee Maker": "coffee maker.jpg"
    };

    const mappedImage = imageNameMap[product.name] || product.image;

    if (!mappedImage) {
        return "../images/misc/no-image.png";
    }

    if (mappedImage.startsWith("http") || mappedImage.startsWith("/")) {
        return mappedImage;
    }

    if (mappedImage.includes("images/")) {
        return mappedImage;
    }

    return `${getImageBasePath()}${encodeURI(mappedImage)}`;
}

function populateProduct(product) {
    const imageEl = document.getElementById("productImage");
    const categoryEl = document.getElementById("productCategory");
    const nameEl = document.getElementById("productName");
    const priceEl = document.getElementById("productPrice");
    const descriptionEl = document.getElementById("productDescription");
    const quantityInput = document.getElementById("quantity");
    const addToCartBtn = document.getElementById("addToCartBtn");

    if (imageEl) imageEl.src = resolveProductImage(product);
    if (categoryEl) categoryEl.textContent = product.category || "General";
    if (nameEl) nameEl.textContent = product.name || "Product";
    if (priceEl) priceEl.textContent = `₹${Number(product.price || 0).toLocaleString("en-IN")}`;
    if (descriptionEl) descriptionEl.textContent = product.description || "A great product from ShopEase.";

    if (quantityInput) quantityInput.value = 1;

    if (addToCartBtn) {
        addToCartBtn.onclick = () => {
            const quantity = Number(quantityInput?.value || 1);
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            const existing = cart.find(item => item.id === product._id || item._id === product._id);

            if (existing) {
                existing.quantity = Number(existing.quantity || 1) + quantity;
            } else {
                cart.push({ ...product, id: product._id, _id: product._id, quantity });
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            showMessage("Added to cart", "success");
            updateCartCount();
        };
    }
}

async function loadProduct() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");

    if (!productId) {
        showMessage("No product selected", "error");
        return;
    }

    try {
        const response = await fetch(`${PRODUCT_API_URL}/${productId}`);
        if (!response.ok) throw new Error("Failed to fetch product");

        const data = await response.json();
        const product = data.product || data;
        if (!product) throw new Error("Product not found");

        populateProduct(product);
    } catch (error) {
        console.error(error);
        showMessage("Unable to load product details", "error");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadProduct();

    const quantityInput = document.getElementById("quantity");
    const decreaseBtn = document.getElementById("decreaseQty");
    const increaseBtn = document.getElementById("increaseQty");

    if (decreaseBtn && quantityInput) {
        decreaseBtn.onclick = () => {
            const value = Math.max(1, Number(quantityInput.value || 1) - 1);
            quantityInput.value = value;
        };
    }

    if (increaseBtn && quantityInput) {
        increaseBtn.onclick = () => {
            const value = Number(quantityInput.value || 1) + 1;
            quantityInput.value = value;
        };
    }
});
