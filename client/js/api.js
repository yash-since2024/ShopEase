/* ==========================================
   API.JS
   Handles all API requests
========================================== */

const BASE_URL = "http://localhost:5000/api";

function getToken() {
    return localStorage.getItem("token");
}

async function apiRequest(endpoint, method = "GET", body = null) {
    const options = {
        method,
        headers: {
            "Content-Type": "application/json"
        }
    };

    const token = getToken();
    if (token) {
        options.headers.Authorization = `Bearer ${token}`;
    }

    if (body) {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Something went wrong.");
    }

    return data;
}

async function getAllProducts() {
    return await apiRequest("/products");
}

async function getProductById(id) {
    return await apiRequest(`/products/${id}`);
}

async function register(userData) {
    return await apiRequest("/users/register", "POST", userData);
}

async function login(userData) {
    return await apiRequest("/users/login", "POST", userData);
}

async function getProfile() {
    return await apiRequest("/users/profile");
}

async function updateProfile(userData) {
    return await apiRequest("/users/profile", "PUT", userData);
}

function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "../pages/login.html";
}

function isLoggedIn() {
    return localStorage.getItem("token") !== null;
}
