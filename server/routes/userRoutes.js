// ==========================================
// USER ROUTES
// Handles Authentication API Endpoints
// ==========================================


const express = require("express");


const router = express.Router();






// Controllers

const {


    registerUser,


    loginUser,


    getProfile,


    updateProfile



} = require("../controllers/userController");








// Middleware

const protect = require("../middleware/authMiddleware");









// ==========================================
// PUBLIC ROUTES
// ==========================================


// Register new user

router.post(

    "/register",

    registerUser

);







// Login user

router.post(

    "/login",

    loginUser

);









// ==========================================
// PRIVATE ROUTES
// ==========================================


// Get logged-in user profile

router.get(

    "/profile",

    protect,

    getProfile

);








// Update user profile

router.put(

    "/profile",

    protect,

    updateProfile

);









module.exports = router;