// ==========================================
// CART CONTROLLER
// Handles Cart Operations
// ==========================================


const Cart = require("../models/Cart");

const Product = require("../models/Product");






// ==========================================
// GET USER CART
// ==========================================


const getCart = async(req,res)=>{


    try{


        const cart = await Cart.findOne({

            user:req.user.id

        }).populate("items.product");





        if(!cart){


            return res.status(200).json({

                success:true,

                items:[]

            });


        }






        res.status(200).json({


            success:true,

            cart


        });







    }catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};









// ==========================================
// ADD PRODUCT TO CART
// ==========================================


const addToCart = async(req,res)=>{


    try{


        const {

            productId,

            quantity

        } = req.body;






        const product = await Product.findById(

            productId

        );






        if(!product){


            return res.status(404).json({

                success:false,

                message:"Product not found"

            });


        }








        let cart = await Cart.findOne({

            user:req.user.id

        });








        if(!cart){


            cart = await Cart.create({


                user:req.user.id,


                items:[]

            });


        }









        const existingItem = cart.items.find(

            item =>

            item.product.toString() === productId

        );









        if(existingItem){



            existingItem.quantity += quantity || 1;



        }

        else{



            cart.items.push({


                product:productId,


                quantity:quantity || 1


            });



        }








        await cart.save();







        res.status(200).json({


            success:true,

            message:"Product added to cart",

            cart


        });






    }catch(error){



        res.status(500).json({


            success:false,

            message:error.message


        });


    }


};









// ==========================================
// UPDATE CART ITEM QUANTITY
// ==========================================


const updateCart = async(req,res)=>{


    try{


        const {


            productId,

            quantity


        } = req.body;







        const cart = await Cart.findOne({

            user:req.user.id

        });







        if(!cart){


            return res.status(404).json({


                success:false,

                message:"Cart not found"


            });


        }








        const item = cart.items.find(


            item =>

            item.product.toString() === productId


        );








        if(item){


            item.quantity = quantity;


        }







        await cart.save();







        res.status(200).json({


            success:true,

            message:"Cart updated",

            cart


        });






    }catch(error){



        res.status(500).json({


            success:false,

            message:error.message


        });



    }



};









// ==========================================
// REMOVE ITEM FROM CART
// ==========================================


const removeFromCart = async(req,res)=>{


    try{



        const {

            productId

        } = req.body;







        const cart = await Cart.findOne({

            user:req.user.id

        });








        cart.items = cart.items.filter(


            item =>

            item.product.toString() !== productId


        );







        await cart.save();








        res.status(200).json({


            success:true,

            message:"Item removed",

            cart


        });






    }catch(error){



        res.status(500).json({


            success:false,

            message:error.message


        });


    }


};









// ==========================================
// CLEAR CART
// ==========================================


const clearCart = async(req,res)=>{


    try{



        const cart = await Cart.findOne({

            user:req.user.id

        });







        if(cart){


            cart.items = [];


            await cart.save();


        }







        res.status(200).json({


            success:true,

            message:"Cart cleared"


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


    getCart,


    addToCart,


    updateCart,


    removeFromCart,


    clearCart


};