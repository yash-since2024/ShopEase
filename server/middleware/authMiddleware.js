// ==========================================
// AUTHENTICATION MIDDLEWARE
// Protects Private Routes Using JWT
// ==========================================


const jwt = require("jsonwebtoken");

const User = require("../models/User");






// ==========================================
// VERIFY USER TOKEN
// ==========================================


const protect = async (req, res, next) => {


    let token;





    try {




        // Check Authorization Header


        if(

            req.headers.authorization &&

            req.headers.authorization.startsWith("Bearer")

        ){



            token = req.headers.authorization.split(" ")[1];



        }







        // No Token Found


        if(!token){



            return res.status(401).json({


                success:false,


                message:"Not authorized. Please login."


            });



        }









        // Verify Token


        const decoded = jwt.verify(


            token,


            process.env.JWT_SECRET



        );








        // Find User


        req.user = await User.findById(

            decoded.id

        ).select("-password");








        if(!req.user){



            return res.status(401).json({


                success:false,


                message:"User not found"


            });



        }








        // Continue


        next();






    }catch(error){





        res.status(401).json({


            success:false,


            message:"Invalid or expired token"


        });





    }



};








module.exports = protect;