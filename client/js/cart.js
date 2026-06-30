/* ==========================================
   CART.JS
   Shopping Cart Management
========================================== */

function getCartKey() {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const userId = user && (user.id || user._id) ? (user.id || user._id) : null;
    return userId ? `cart_${userId}` : "cart_guest";
}

function getCart() {
    const key = getCartKey();
    return JSON.parse(localStorage.getItem(key)) || [];
}

function saveCartItems(items) {
    const key = getCartKey();
    localStorage.setItem(key, JSON.stringify(items));
}

let cart = getCart();

document.addEventListener("DOMContentLoaded", () => {
    cart = getCart();
    displayCart();
    updateCartCount();
});

function displayCart() {
    const cartContainer = document.querySelector(".cart-items");
    const emptyCart = document.querySelector(".empty-cart");

    if (!cartContainer) return;
    cartContainer.innerHTML = "";

    if (cart.length === 0) {
        if (emptyCart) emptyCart.style.display = "block";
        updateSummary();
        return;
    }

    if (emptyCart) emptyCart.style.display = "none";

    cart.forEach((item, index) => {
        const safePrice = Number(item.price) || 0;
        const safeQuantity = Number(item.quantity) || 1;
        const safeName = item.name || "Product";
        const safeCategory = item.category || "General";
        const imageUrl = (() => {
            const imageNameMap = {
                "Wireless Headphones": "headphone.jpg",
                "Smart Watch": "smart watch.jpg",
                "Classic T-Shirt": "t shirt.jpg",
                "Running Shoes": "shoes.jpg",
                "Laptop Backpack": "bagpack.jpg",
                "Coffee Maker": "coffee maker.jpg"
            };

            const mappedImage = imageNameMap[item.name] || item.image;

            if (!mappedImage) {
                return "https://via.placeholder.com/120x120?text=No+Image";
            }

            if (mappedImage.startsWith("http") || mappedImage.startsWith("/")) {
                return mappedImage;
            }

            if (mappedImage.includes("images/")) {
                return mappedImage;
            }

            return `../images/${encodeURI(mappedImage)}`;
        })();

        cartContainer.innerHTML += `
        <div class="cart-item">
            <img src="${imageUrl}" alt="${safeName}">
            <div class="item-details">
                <h3>${safeName}</h3>
                <p class="item-category">${safeCategory}</p>
                <p class="item-price">₹${safePrice}</p>
                <div class="quantity-control">
                    <button onclick="decreaseQuantity(${index})">−</button>
                    <span>${safeQuantity}</span>
                    <button onclick="increaseQuantity(${index})">+</button>
                </div>
                <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
            </div>
        </div>`;
    });

    updateSummary();
}

function saveCart() {
    saveCartItems(cart);
    displayCart();
    updateCartCount();
}

function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    showMessage("Item removed", "error");
}

function increaseQuantity(index) {
    cart[index].quantity = (Number(cart[index].quantity) || 1) + 1;
    saveCart();
}

function decreaseQuantity(index) {
    if ((Number(cart[index].quantity) || 1) > 1) {
        cart[index].quantity = (Number(cart[index].quantity) || 1) - 1;
    } else {
        cart.splice(index, 1);
    }
    saveCart();
}

function updateSummary() {
    const subtotalElement = document.querySelector(".subtotal");
    const shippingElement = document.querySelector(".shipping");
    const totalElement = document.querySelector(".total-price");

    let subtotal = 0;
    cart.forEach(item => {
        const price = Number(item.price) || 0;
        const quantity = Number(item.quantity) || 1;
        subtotal += price * quantity;
    });

    const shipping = subtotal > 0 ? 99 : 0;
    const total = subtotal + shipping;

    if (subtotalElement) subtotalElement.textContent = `₹${subtotal.toLocaleString("en-IN")}`;
    if (shippingElement) shippingElement.textContent = `₹${shipping.toLocaleString("en-IN")}`;
    if (totalElement) totalElement.textContent = `₹${total.toLocaleString("en-IN")}`;
}

function updateCartCount() {
    const badge = document.querySelector(".cart-count");
    if (!badge) return;
    badge.textContent = cart.reduce((total, item) => total + Number(item.quantity || 1), 0);
}

function clearCart() {
    if (!confirm("Clear entire cart?")) return;
    cart = [];
    saveCart();
    showMessage("Cart cleared");
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }
    alert("Checkout feature coming soon!");
}

function continueShopping() {
    window.location.href = "products.html";
}
