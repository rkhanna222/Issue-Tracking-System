
import User from "../models/User.js";

export const post = (user) => {
    const newUser = new User(user);
    return newUser.save();
}

export const getAllUsers = () => {
    return User.find().exec();
}

export const getUserById = (id) => {
    return User.findById(id).exec();
}

//Service
export const getUserByEmail = (email) => {
    
    return User.find({"email":(email)}).exec();
}

export const updateUser = (id,payload) => {
    return User.findByIdAndUpdate(id,payload).exec();

}

export const removeUser = (id) => {

    return User.findByIdAndDelete(id);
}
