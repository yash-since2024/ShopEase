// ==========================================
// USER MODEL
// MongoDB User Schema
// ==========================================


const mongoose = require("mongoose");







// ==========================================
// USER SCHEMA
// ==========================================


const userSchema = mongoose.Schema(

{


    // User name

    name: {

        type: String,

        required: true,

        trim: true

    },








    // User email

    email: {


        type: String,


        required: true,


        unique: true,


        lowercase: true,


        trim: true


    },








    // Hashed password

    password: {


        type: String,


        required: true,


        minlength: 6


    },








    // Phone number

    phone: {


        type: String,


        default: ""


    },








    // Address

    address: {


        type: String,


        default: ""


    },








    // User role

    role: {


        type: String,


        enum: [


            "user",


            "admin"


        ],


        default: "user"


    },








    // Profile image

    avatar: {


        type: String,


        default: "/images/users/default-avatar.png"


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

    "User",

    userSchema

);