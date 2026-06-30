// ==========================================
// PRODUCT MODEL
// MongoDB Product Schema
// ==========================================


const mongoose = require("mongoose");






// ==========================================
// PRODUCT SCHEMA
// ==========================================


const productSchema = mongoose.Schema(


{


    // Product name

    name: {

        type: String,

        required: true,

        trim: true

    },







    // Product description

    description: {

        type: String,

        required: true

    },








    // Product price

    price: {

        type: Number,

        required: true

    },








    // Product category

    category: {

        type: String,

        required: true

    },








    // Product image URL

    image: {


        type: String,


        required: true


    },








    // Available stock

    stock: {


        type: Number,


        default: 0


    },








    // Product rating

    rating: {


        type: Number,


        default: 0


    },








    // Number of reviews

    numReviews: {


        type: Number,


        default: 0


    },








    // Featured product

    isFeatured: {


        type: Boolean,


        default: false


    }



},



{


    timestamps: true


}






);









// ==========================================
// EXPORT MODEL
// ==========================================


module.exports = mongoose.model(

    "Product",

    productSchema

);