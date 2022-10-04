import cors from "cors";
import express from "express";
import connectDB from "./config/db.js";
import routes from "../server/routes/index.js";

connectDB(); // mongodb connection function

const app = express(); //Creates an Express application. The express() function is a top-level function exported by the express module.
app.use(express.json()); //This is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.urlencoded()); //This is a built-in middleware function in Express. It parses incoming requests with urlencoded payloads
app.use(cors()); //(CORS) is an HTTP-header based mechanism that allows a server to indicate any origins (domain, scheme, or port) other than its own from which a browser should permit loading resources.

routes(app); //used to set route
console.log("check 0");
export default app;
