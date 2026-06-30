// ==========================================
// ADMIN MIDDLEWARE
// Restricts Routes To Admin Users
// ==========================================






const admin = (req, res, next) => {



    try {





        // Check if user exists

        if(!req.user){


            return res.status(401).json({


                success:false,


                message:"Authentication required"


            });



        }









        // Check admin role


        if(req.user.role !== "admin"){



            return res.status(403).json({


                success:false,


                message:"Access denied. Admins only."


            });



        }








        // Allow request


        next();






    }catch(error){





        res.status(500).json({


            success:false,


            message:error.message


        });





    }





};









module.exports = admin;