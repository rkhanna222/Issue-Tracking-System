import mongoose from "mongoose";
import project from "../models/Project.js";
import user from "../models/User.js";
import UserProject from "../models/UserProject.js";

const ObjectId = mongoose.Types.ObjectId

export const getUserProjects = () => {

    return (UserProject.find()
        .populate({ path: "project", model: project })
        .populate({ path: "user", model: user })
    );
}

export const getProjectUsers = (project) => {

    project = new ObjectId(project)
    return UserProject.find({ 'project': project });

}

export const deleteUsersProject = (user) => {

    user = new ObjectId(user)
    return UserProject.deleteMany({ 'user': user });

}



export const removeProjectUsers = (user) => {

    user = new ObjectId(user)
    return UserProject.findOneAndDelete({ 'user': user });

}