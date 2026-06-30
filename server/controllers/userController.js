// ==========================================
// USER CONTROLLER
// Handles Authentication & User Operations
// ==========================================


const User = require("../models/User");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");






// ==========================================
// GENERATE JWT TOKEN
// ==========================================


const generateToken = (id) => {


    return jwt.sign(

        {
            id
        },

        process.env.JWT_SECRET,

        {

            expiresIn:"7d"

        }

    );


};









// ==========================================
// REGISTER USER
// ==========================================


const registerUser = async(req,res)=>{


    try{


        const {

            name,

            email,

            password


        } = req.body;






        // Check existing user


        const existingUser = await User.findOne({

            email

        });






        if(existingUser){


            return res.status(400).json({

                success:false,

                message:"User already exists"

            });


        }








        // Hash password


        const salt = await bcrypt.genSalt(10);


        const hashedPassword = await bcrypt.hash(

            password,

            salt

        );







        // Create user


        const user = await User.create({


            name,


            email,


            password:hashedPassword



        });









        res.status(201).json({


            success:true,


            message:"Account created successfully",


            token:generateToken(user._id),


            user:{


                id:user._id,

                name:user.name,

                email:user.email


            }


        });








    }catch(error){



        res.status(500).json({

            success:false,

            message:error.message

        });



    }


};









// ==========================================
// LOGIN USER
// ==========================================


const loginUser = async(req,res)=>{


    try{



        const {


            email,

            password


        } = req.body;







        const user = await User.findOne({

            email

        });






        if(!user){


            return res.status(401).json({


                success:false,

                message:"Invalid email or password"


            });


        }








        const isMatch = await bcrypt.compare(


            password,


            user.password


        );







        if(!isMatch){


            return res.status(401).json({


                success:false,

                message:"Invalid email or password"


            });


        }









        res.status(200).json({


            success:true,


            token:generateToken(user._id),



            user:{


                id:user._id,

                name:user.name,

                email:user.email


            }


        });









    }catch(error){



        res.status(500).json({


            success:false,

            message:error.message


        });



    }



};









// ==========================================
// GET USER PROFILE
// ==========================================


const getProfile = async(req,res)=>{


    try{



        const user = await User.findById(

            req.user.id

        ).select("-password");







        res.status(200).json({


            success:true,

            user


        });






    }catch(error){



        res.status(500).json({

            success:false,

            message:error.message

        });



    }


};









// ==========================================
// UPDATE PROFILE
// ==========================================


const updateProfile = async(req,res)=>{


    try{



        const user = await User.findById(

            req.user.id

        );







        if(!user){


            return res.status(404).json({


                success:false,

                message:"User not found"


            });


        }








        const email = typeof req.body.email === "string" ? req.body.email.trim().toLowerCase() : "";

        if (email && email !== user.email) {
            const existingUser = await User.findOne({ email });

            if (existingUser && existingUser._id.toString() !== user._id.toString()) {
                return res.status(400).json({
                    success: false,
                    message: "Email already in use"
                });
            }
        }

        user.name = req.body.name || user.name;

        user.email = email || user.email;

        user.phone = req.body.phone || user.phone;

        user.address = req.body.address || user.address;








        const updatedUser = await user.save();








        res.status(200).json({


            success:true,


            user:{


                id:updatedUser._id,

                name:updatedUser.name,

                email:updatedUser.email,

                phone:updatedUser.phone,

                address:updatedUser.address


            }


        });







    }catch(error){



        res.status(500).json({


            success:false,

            message:error.message


        });



    }



};








// ==========================================
// EXPORT
// ==========================================


module.exports = {


    registerUser,


    loginUser,


    getProfile,


    updateProfile


};