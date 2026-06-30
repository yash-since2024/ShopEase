// ==========================================
// EXPRESS APP CONFIGURATION
// Main Application Setup
// ==========================================



const express = require("express");

const cors = require("cors");

const path = require("path");






// Routes

const productRoutes = require("./routes/productRoutes");

const userRoutes = require("./routes/userRoutes");

const cartRoutes = require("./routes/cartRoutes");







// Error Middleware

const {

    notFound,

    errorHandler

} = require("./middleware/errorMiddleware");









// Create Express App

const app = express();









// ==========================================
// MIDDLEWARE
// ==========================================



// Accept JSON data

app.use(

    express.json()

);







// Accept form data

app.use(

    express.urlencoded({

        extended:true

    })

);







// Enable CORS

app.use(

    cors()

);









// Static folder for images/uploads

app.use(

    "/uploads",

    express.static(

        path.join(__dirname,"uploads")

    )

);


// Serve the frontend files from the client folder

app.use(express.static(path.join(__dirname, "..", "client")));









// ==========================================
// API ROUTES
// ==========================================



app.use(

    "/api/products",

    productRoutes

);






app.use(

    "/api/users",

    userRoutes

);






app.use(

    "/api/cart",

    cartRoutes

);









// Serve the home page for the root route

app.get("/", (req, res) => {

    res.sendFile(path.join(__dirname, "..", "client", "index.html"));

});









// ==========================================
// ERROR HANDLING
// Must be at bottom
// ==========================================


app.use(notFound);


app.use(errorHandler);









module.exports = app;