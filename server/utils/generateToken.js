// ==========================================
// JWT TOKEN GENERATOR
// Creates Authentication Token
// ==========================================



const jwt = require("jsonwebtoken");







// ==========================================
// GENERATE TOKEN FUNCTION
// ==========================================


const generateToken = (id) => {



    return jwt.sign(


        {

            id: id

        },


        process.env.JWT_SECRET,


        {


            expiresIn: "7d"


        }


    );



};









module.exports = generateToken;