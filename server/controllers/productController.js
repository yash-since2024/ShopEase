// ==========================================
// PRODUCT CONTROLLER
// Handles Product CRUD Operations
// ==========================================


const Product = require("../models/Product");





// ==========================================
// GET ALL PRODUCTS
// ==========================================


const getProducts = async (req, res) => {


    try {


        const products = await Product.find();



        res.status(200).json({

            success: true,

            count: products.length,

            products

        });



    } catch (error) {



        res.status(500).json({

            success: false,

            message: error.message

        });



    }


};









// ==========================================
// GET SINGLE PRODUCT
// ==========================================


const getProductById = async (req, res) => {



    try {



        const product = await Product.findById(
            req.params.id
        );





        if (!product) {


            return res.status(404).json({

                success:false,

                message:"Product not found"

            });


        }





        res.status(200).json({


            success:true,

            product


        });





    } catch(error){



        res.status(500).json({

            success:false,

            message:error.message

        });



    }


};









// ==========================================
// CREATE PRODUCT
// ==========================================


const createProduct = async(req,res)=>{


    try{


        const product = await Product.create(

            req.body

        );



        res.status(201).json({


            success:true,

            product


        });




    }catch(error){



        res.status(500).json({

            success:false,

            message:error.message

        });



    }


};









// ==========================================
// UPDATE PRODUCT
// ==========================================


const updateProduct = async(req,res)=>{


    try{



        const product = await Product.findByIdAndUpdate(


            req.params.id,


            req.body,


            {

                new:true,

                runValidators:true

            }


        );






        if(!product){


            return res.status(404).json({

                success:false,

                message:"Product not found"

            });


        }







        res.status(200).json({


            success:true,

            product


        });






    }catch(error){



        res.status(500).json({

            success:false,

            message:error.message

        });



    }



};









// ==========================================
// DELETE PRODUCT
// ==========================================


const deleteProduct = async(req,res)=>{


    try{



        const product = await Product.findByIdAndDelete(

            req.params.id

        );






        if(!product){


            return res.status(404).json({

                success:false,

                message:"Product not found"

            });


        }





        res.status(200).json({


            success:true,

            message:"Product deleted successfully"


        });






    }catch(error){



        res.status(500).json({

            success:false,

            message:error.message

        });



    }


};








// ==========================================
// EXPORT CONTROLLERS
// ==========================================


module.exports = {


    getProducts,

    getProductById,

    createProduct,

    updateProduct,

    deleteProduct


};