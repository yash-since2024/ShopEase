// ==========================================
// CART ROUTES
// Handles Cart API Endpoints
// ==========================================


const express = require("express");


const router = express.Router();






// Controller Functions

const {


    getCart,


    addToCart,


    updateCart,


    removeFromCart,


    clearCart



} = require("../controllers/cartController");







// Middleware

const protect = require("../middleware/authMiddleware");









// ==========================================
// CART ROUTES
// ==========================================





// Get user's cart

router.get(

    "/",

    protect,

    getCart

);








// Add product to cart

router.post(

    "/add",

    protect,

    addToCart

);








// Update cart quantity

router.put(

    "/update",

    protect,

    updateCart

);








// Remove item from cart

router.delete(

    "/remove",

    protect,

    removeFromCart

);








// Clear entire cart

router.delete(

    "/clear",

    protect,

    clearCart

);









module.exports = router;