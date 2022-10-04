import config from "config";
import jwt from "jsonwebtoken";



// @desc    Verify login token for protected routes
// @access  private
const verifyToken = (request, response, next) => {
    const token = request.header('x-auth-token');
    if (!token) {
        return response.status(401).json({ msg: "No token, authorization denied" });

    }

    //verify token

    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        request.id = decoded.id;

        // next();

    } catch (error) {
        response.status(401).json({ msg: "Token is not valid" });

    }

    next();
}

export default verifyToken;