// ==========================================
// ERROR HANDLING MIDDLEWARE
// Centralized Express Error Handler
// ==========================================





// ==========================================
// NOT FOUND ERROR HANDLER
// Handles Invalid Routes
// ==========================================


const notFound = (req, res, next) => {



    const error = new Error(

        `Route not found - ${req.originalUrl}`

    );



    res.status(404);



    next(error);



};









// ==========================================
// GLOBAL ERROR HANDLER
// ==========================================


const errorHandler = (err, req, res, next) => {




    let statusCode = res.statusCode === 200 
        ? 500 
        : res.statusCode;





    let message = err.message;








    // MongoDB Invalid ID Error


    if(err.name === "CastError"){


        statusCode = 404;


        message = "Resource not found";


    }








    // Duplicate MongoDB Data


    if(err.code === 11000){


        statusCode = 400;


        message = "Duplicate field value entered";


    }









    res.status(statusCode).json({



        success:false,



        message,



        stack:

        process.env.NODE_ENV === "production"

        ? null

        : err.stack



    });







};








module.exports = {


    notFound,


    errorHandler


};