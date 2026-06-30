// ==========================================
// PRODUCT SEED FILE
// Adds demo products to MongoDB Atlas
// ==========================================


const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Product = require("../models/Product");
const products = require("./products");


// Load .env file

dotenv.config();



// Connect to MongoDB

mongoose
    .connect(process.env.MONGO_URI)
    .then(async () => {


        console.log("MongoDB Connected for Seeding");



        // Remove old products

        await Product.deleteMany();



        // Insert new products

        await Product.insertMany(products);



        console.log("Products Added Successfully ✅");



        process.exit();



    })
    .catch((error) => {


        console.log(
            "Seeding Error:",
            error.message
        );


        process.exit(1);


    });