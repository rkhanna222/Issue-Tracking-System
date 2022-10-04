import mongoose from "mongoose";
import config from "config";

const url = config.get("mongoURL"); // imports the url for connection

const connectDB = async() => {
    try{

        await mongoose.connect(url); // actual connection method

        console.log("MongoDB Atlas Connected Successfully .....")

    } catch(err){
        console.error(err.message);
        process.exit(1); //exists the process incase of faliure

    }
}

export default connectDB; // exports the connection function