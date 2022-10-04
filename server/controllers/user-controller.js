import * as userService from "../services/user-service.js";
import * as userProjectServices from "../services/userProject-service.js"
import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "config";
// import mongoose from "mongoose";
// import expressValidator from "express-validaor";
// import check from "express-validator/check";

// const toDo = mongoose.Types.ObjectId.isValid;

const setSuccessResponse = (obj, response) => {
    response.status(200);
    response.json(obj);
}

//boiler plate for error response
const setErrorResponse = (error, response, status) => {
    response.status(status);
    response.json(error)

}
// @route   POST /api/users
// @desc    Register user
// @access  public
export const post = async (request, response) => {
    
    try {
        const { firstname, lastname, phone, email, password, confirmPassword, auth } = request.body;
        //see if user exists

        let isUser = await User.findOne({ email });
        if (isUser) {
            setErrorResponse({ message: "User already exists" }, response, 500);
        } else {

            //encrypt the password
            const payload = new User({
                firstname,
                lastname,
                phone,
                email,
                password,
                confirmPassword,
                auth
            });

            const salt = await bcryptjs.genSalt(10);

            payload.password = await bcryptjs.hash(password, salt);

            //return JSON web token for session as user would be in a session after registering
            const user = await userService.post(payload);
            const token = jwt.sign({ id: user.id }, config.get("jwtSecret"), { expiresIn: 3600 });
            response.status(200).send({
                id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                phone: user.phone,
                email: user.email,
                password: user.password,
                confirmPassword: user.confirmPassword,
                accessToken: token,
                auth: user.auth
            });
            // setSuccessResponse(user,response);

        }

    } catch (error) {
        console.error(error.message);
        setErrorResponse(error, response, 500)

    }

}

// @route   POST /api/login
// @desc    login user
// @access  public
export const login = async (request, response) => {
    try {
        const { email, password } = request.body;
        //see if user exists

        //let isUser = await User.findOne({email});
        const user = await User.findOne({ email });
        if (user && bcryptjs.compareSync(password, user.password)) {

            const token = jwt.sign({ id: user._id }, config.get("jwtSecret"), { expiresIn: 3600 });
            response.status(200).send({
                id: user._id,
                firstName: user.firstname,
                lastName: user.lastname,
                email: user.email,
                token: token,
                auth: user.auth,
            });

            console.log("Done.....");
        } else {
            console.log("Failed.....");

            setErrorResponse({ message: "not valid" }, response, 500);



        }
    }
    catch (error) {
        console.error(error.message);
        console.log(error);
        setErrorResponse(error, response, 500);

    }
}


//Get all users
export const getUsers = async (request, response) => {

    try {
        const users = await userService.getAllUsers();
        response.send(users);
    }
    catch (error) {

    }

}
//get users by id
export const getUserById = async (request, response) => {

    try {
        const userid = request.params.id;
        const user = await userService.getUserById(userid);
        response.status(200).send({
            user: user,
        });

    } catch (error) {

        console.log(error);
        setErrorResponse(error, response, 500);

    }
}

//Get users by email
export const getUserByEmail = async (request, response) => {

    try {
        const email = request.params.email;
        const user = await userService.getUserByEmail(email);
        response.status(200).send({
            user: user,

        });
    } catch (error) {
        console.log(error);
        setErrorResponse(error, response, 500);

    }
}

// @route   POST /api/users/:id
// @desc    Register user
// @access  public

export const updateUser = async (request, response) => {
    try {
        const id = request.params.id;
       
        const user = await userService.getUserById(id);
        if (!user) {
            setErrorResponse({ msg: "User not found" }, response, 404);
            return;
        }
        const { firstname, lastname, phone, email, auth } = request.body;
        console.log(request.body);

        const payload = {
            firstname: firstname,
            lastname: lastname,
            phone: phone,
            email: email,
            auth: auth
        };

        const updatedUser = await userService.updateUser(id, payload); // do not give filter here, do not create new user schema object for payload
        if (!updatedUser) {
            setErrorResponse({ msg: "Cannot update user" }, response, 404);
            return;

        }

        const userToSend = await userService.getUserById(id);

        response.status(200).send({
            msg: "user updated successfully",
            user: userToSend,

        });



    } catch (error) {
        console.log(error);
        setErrorResponse(error, response, 500);

    }
}

// @route   DELETE /api/users/:id
// @desc    Remove user
// @access  public

export const removeUser = async (request, response) => {
    try {
        const id = request.params.id;
        
        const user = await userService.getUserById(id);
        if (!user) {
            setErrorResponse({ msg: "User not found" }, response, 404);
            return;
        }

        const removeFromProject = await userProjectServices.deleteUsersProject(id);
        const removedUser = await userService.removeUser(id);

        if (!removedUser) {
            setErrorResponse({ msg: "Cannot delete user" }, response, 404);
            return;
        }

        response.status(200).send({
            msg: "user deleted successfully"

        });


    } catch (error) {
        console.log(error);
        setErrorResponse(error, response, 500);

    }
}

// @route   PUT /api/users/:id
// @desc    Update user
// @access  public

export function updatePassword() {
    const baseURL = "http://localhost:3000/api/users";
    const put_email = useRef(null);
    const put_password = useRef(null);

    const [putResult, setPutResult] = useState(null);
    const fortmatResponse = (res) => {
        return JSON.stringify(res, null, 2);
    }

    async function putData() {
        const email = put_email.current.value;
        if (email) {
            const putData = {
                password: put_password.current.value,


            };
            try {
                const res = await fetch(`${baseURL}/email/${email}`, {
                    method: "put",
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": "token-value",
                    },
                    body: JSON.stringify(putData),
                });
                if (!res.ok) {
                    const message = `An error has occured: ${res.status} - ${res.statusText}`;
                    throw new Error(message);
                }
                const data = await res.json();
                const result = {
                    status: res.status + "-" + res.statusText,
                    headers: { "Content-Type": res.headers.get("Content-Type") },
                    data: data,
                };
                setPutResult(fortmatResponse(result));
            } catch (err) {
                setPutResult(err.message);
            }
        }
    }
}