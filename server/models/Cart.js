// ==========================================
// CART MODEL
// MongoDB Cart Schema
// ==========================================


const mongoose = require("mongoose");







// ==========================================
// CART ITEM SCHEMA
// ==========================================


const cartItemSchema = mongoose.Schema(


{


    // Product reference

    product: {


        type: mongoose.Schema.Types.ObjectId,


        ref: "Product",


        required: true


    },







    // Quantity of product

    quantity: {


        type: Number,


        required: true,


        default: 1


    }



}





);









// ==========================================
// CART SCHEMA
// ==========================================


const cartSchema = mongoose.Schema(


{


    // User who owns this cart

    user: {


        type: mongoose.Schema.Types.ObjectId,


        ref: "User",


        required: true


    },








    // Products inside cart

    items: [cartItemSchema]






},




{


    timestamps: true


}






);









// ==========================================
// EXPORT MODEL
// ==========================================


module.exports = mongoose.model(

    "Cart",

    cartSchema

);