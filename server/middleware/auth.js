import config from "config";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'; // Import dotenv
dotenv.config(); // Load environment variables



// @desc    Verify login token for protected routes
// @access  private
const verifyToken = (request, response, next) => {
    const token = request.header('x-auth-token');
    if (!token) {
        return response.status(401).json({ msg: "No token, authorization denied" });

    }

    //verify token

    try {
        console.log(process.env.JWT_SECRET);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        request.id = decoded.id;

        // next();

    } catch (error) {
        response.status(401).json({ msg: "Token is not valid" });

    }

    next();
}

export default verifyToken;