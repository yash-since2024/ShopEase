/* ==========================================
   PRODUCTS.JS
   Handles Product Listing Page
========================================== */

const API_URL = "http://localhost:5000/api/products";

let allProducts = [];
let filteredProducts = [];

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initProducts);
} else {
    initProducts();
}

function initProducts() {
    fetchProducts();

    const searchInput = document.querySelector(".search-input");
    if (searchInput) {
        searchInput.addEventListener("keyup", function () {
            const keyword = this.value.toLowerCase();
            filteredProducts = allProducts.filter(product =>
                (product.name || "").toLowerCase().includes(keyword) ||
                (product.category || "").toLowerCase().includes(keyword)
            );
            displayProducts(filteredProducts);
        });
    }

    const categoryFilter = document.querySelector("#categoryFilter");
    if (categoryFilter) {
        categoryFilter.addEventListener("change", function () {
            const category = this.value;
            filteredProducts = category === "All"
                ? [...allProducts]
                : allProducts.filter(product => product.category === category);
            displayProducts(filteredProducts);
        });
    }

    const sortSelect = document.querySelector("#sortProducts");
    if (sortSelect) {
        sortSelect.addEventListener("change", function () {
            switch (this.value) {
                case "low": filteredProducts.sort((a, b) => (a.price || 0) - (b.price || 0)); break;
                case "high": filteredProducts.sort((a, b) => (b.price || 0) - (a.price || 0)); break;
                case "az": filteredProducts.sort((a, b) => (a.name || "").localeCompare(b.name || "")); break;
                case "za": filteredProducts.sort((a, b) => (b.name || "").localeCompare(a.name || "")); break;
                default: break;
            }
            displayProducts(filteredProducts);
        });
    }
}

async function fetchProducts() {
    try {
        showLoader();
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch products");

        const data = await response.json();
        const productsData = Array.isArray(data) ? data : data.products || [];
        allProducts = productsData;
        filteredProducts = [...allProducts];
        displayProducts(filteredProducts);
    } catch (error) {
        console.error(error);
        showMessage("Unable to load products", "error");
    } finally {
        hideLoader();
    }
}

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
        return "https://via.placeholder.com/300x300?text=No+Image";
    }

    if (mappedImage.startsWith("http") || mappedImage.startsWith("/")) {
        return mappedImage;
    }

    if (mappedImage.includes("images/")) {
        return mappedImage;
    }

    return `${getImageBasePath()}${encodeURI(mappedImage)}`;
}

function displayProducts(products) {
    const container = document.querySelector(".products-grid");
    if (!container) return;

    container.innerHTML = "";
    const safeProducts = Array.isArray(products) ? products : [];
    const isFeaturedSection = container.id === "featuredProducts";
    const visibleProducts = isFeaturedSection
        ? safeProducts.filter(product => product.isFeatured)
        : safeProducts;

    if (visibleProducts.length === 0) {
        container.innerHTML = `
            <div class="no-products">
                <h2>No Products Found</h2>
                <p>Try searching something else.</p>
            </div>
        `;
        return;
    }

    visibleProducts.forEach(product => {
        const imageUrl = resolveProductImage(product);

        container.innerHTML += `
        <div class="product-card">
            <div class="product-image">
                <img src="${imageUrl}" alt="${product.name || "Product"}">
            </div>
            <div class="product-info">
                <p class="product-category">${product.category || "General"}</p>
                <h3 class="product-title">${product.name || "Unnamed Product"}</h3>
                <p class="product-price">₹${product.price || 0}</p>
                <div class="product-buttons">
                    <button class="btn-cart" onclick="addToCart('${product._id}')">Add to Cart</button>
                    <button class="btn-details" onclick="viewProduct('${product._id}')">View</button>
                </div>
            </div>
        </div>`;
    });
}

function viewProduct(id) {
    window.location.href = `product.html?id=${id}`;
}

function getCartKey() {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const userId = user && (user.id || user._id) ? (user.id || user._id) : null;
    return userId ? `cart_${userId}` : "cart_guest";
}

function getCartItems() {
    const key = getCartKey();
    return JSON.parse(localStorage.getItem(key)) || [];
}

function saveCartItems(items) {
    const key = getCartKey();
    localStorage.setItem(key, JSON.stringify(items));
}

function addToCart(id) {
    const product = allProducts.find(item => item._id === id);
    let cart = getCartItems();

    if (!product) {
        showMessage("Product not found", "error");
        return;
    }

    const existing = cart.find(item => item.id === id || item._id === id);
    if (existing) {
        existing.quantity = Number(existing.quantity || 1) + 1;
    } else {
        cart.push({ ...product, id: product._id, _id: product._id, quantity: 1 });
    }

    saveCartItems(cart);
    showMessage("Product added to cart");
}

function updateCartCount() {
    const cart = getCartItems();
    const badge = document.querySelector(".cart-count");
    if (!badge) return;
    badge.textContent = cart.reduce((total, item) => total + Number(item.quantity || 1), 0);
}

updateCartCount();
