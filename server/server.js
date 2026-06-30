// ==========================================
// SERVER ENTRY POINT
// Starts Express Backend Server
// ==========================================



const dotenv = require("dotenv");

const app = require("./app");

const connectDB = require("./config/db");







// ==========================================
// LOAD ENVIRONMENT VARIABLES
// ==========================================


dotenv.config();








// ==========================================
// CONNECT DATABASE
// ==========================================


connectDB();








// ==========================================
// SERVER PORT
// ==========================================


const PORT = process.env.PORT || 5000;









// ==========================================
// START SERVER
// ==========================================


app.listen(

    PORT,

    () => {


        console.log(

            `Server running on port ${PORT} 🚀`

        );


    }

);