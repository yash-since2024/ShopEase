// ==========================================
// VALIDATORS
// Input Data Validation Functions
// ==========================================





// ==========================================
// EMAIL VALIDATION
// ==========================================


const validateEmail = (email) => {


    const emailRegex =

    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;



    return emailRegex.test(email);



};









// ==========================================
// PASSWORD VALIDATION
// ==========================================


const validatePassword = (password) => {



    return password && password.length >= 6;



};









// ==========================================
// USER DATA VALIDATION
// ==========================================


const validateUser = (user) => {



    const errors = [];





    if(!user.name || user.name.trim() === ""){


        errors.push("Name is required");


    }







    if(!user.email){


        errors.push("Email is required");


    }

    else if(!validateEmail(user.email)){


        errors.push("Invalid email format");


    }







    if(!user.password){


        errors.push("Password is required");


    }

    else if(!validatePassword(user.password)){


        errors.push(
            "Password must contain at least 6 characters"
        );


    }






    return {


        isValid: errors.length === 0,


        errors


    };



};









// ==========================================
// PRODUCT DATA VALIDATION
// ==========================================


const validateProduct = (product) => {



    const errors = [];






    if(!product.name){


        errors.push("Product name required");


    }







    if(!product.description){


        errors.push("Product description required");


    }







    if(!product.price || product.price <= 0){


        errors.push("Invalid product price");


    }







    if(!product.category){


        errors.push("Product category required");


    }






    return {



        isValid: errors.length === 0,


        errors



    };



};









// ==========================================
// EXPORT
// ==========================================


module.exports = {



    validateEmail,


    validatePassword,


    validateUser,


    validateProduct



};