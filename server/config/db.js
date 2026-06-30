// ==========================================
// DATABASE CONNECTION
// MongoDB + Mongoose
// ==========================================


const mongoose = require("mongoose");





// ==========================================
// CONNECT DATABASE FUNCTION
// ==========================================


const connectDB = async () => {


    try {


        const conn = await mongoose.connect(
            process.env.MONGO_URI,
            {
                serverSelectionTimeoutMS: 15000,
                family: 4,
                retryWrites: true,
                w: "majority"
            }
        );



        console.log(
            `MongoDB Connected: ${conn.connection.host}`
        );



    } catch (error) {



        console.error(
            `Database Connection Failed: ${error.message}`
        );



        process.exit(1);



    }


};






module.exports = connectDB;