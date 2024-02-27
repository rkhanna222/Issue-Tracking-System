import dotenv from 'dotenv'; // Import dotenv
dotenv.config(); // Load environment variables

import mongoose from "mongoose";

// Removed the config import since you're using dotenv now

const url = process.env.DB_URL;

console.log(process.env.DB_URL); // Debugging line to ensure URL is loaded

const connectDB = async() => {
    try {
        await mongoose.connect(url); // actual connection method
        console.log("MongoDB Atlas Connected Successfully .....");
    } catch(err) {
        console.error(err.message);
        process.exit(1); //exits the process in case of failure
    }
}

export default connectDB; // exports the connection function
