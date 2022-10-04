import mongoose from "mongoose";
import * as usersProjectServices from "../services/userProject-service.js"
import { getUserById } from "../services/user-service.js"
import UserProject from "../models/UserProject.js";
const toDo = mongoose.Types.ObjectId;

let uDetails = [];

//boiler plate for error response
const setErrorResponse = (error, response, status) => {
    response.status(status);
    response.json(error)

}

// @route   POST /api/userProjects/projectId/UserId
// @desc    add user to project
// @access  private
export const addUserToProject = async (request, response) => {

    try {
        const projectID = toDo(request.params.project);
        const userid = toDo(request.params.user);

        const uP = new UserProject();
        uP.project = projectID;
        uP.user = userid;
        uP.save();

        response.status(200).json({ msg: uP });

    } catch (error) {

        console.error(error.message);
        setErrorResponse(error, response, 500)

    }

}

// @route   Delee /api/userProjects/projectId/UserId
// @desc    remove user from project
// @access  private

export const removeUserFromProject = async (request, response) => {
    try {
        const projectID = request.params.project;
        const userProject = await usersProjectServices.getProjectUsers(projectID);
        const userid = toDo(request.params.user);

        const mapLoop = async _ => {
            const promises = userProject.map(async projectUser => {
                const userDetails = await usersProjectServices.removeProjectUsers(userid)
                return userDetails;
            });
            const userDetails = await Promise.all(promises);
            response.json(userDetails);
        };

        mapLoop();
    } catch (error) {

        console.error(error.message);
        setErrorResponse(error, response, 500)

    }

}

// @route   GET /api/userProjects/projectId/UserId
// @desc    get user  projects
// @access  private

export const getUsersProject = async (request, response) => {

    try {

        const userProject = await usersProjectServices.getUserProjects();

        response.status(200).json({ userProject });

    } catch (error) {
        console.error(error.message);
        setErrorResponse(error, response, 500)

    }

}

// @route   GET /api/userProjects/projectId/UserId
// @desc    GET project by users
// @access  private

export const getProjectUsers = async (request, response) => {

    try {
        const projectID = request.params.project;

        const userProject = await usersProjectServices.getProjectUsers(projectID);


        const mapLoop = async _ => {

            const promises = userProject.map(async projectUser => {
                const user = projectUser.user
                const userDetails = await getUserById(user)
                return userDetails;
            });

            const userDetails = await Promise.all(promises);

            response.json(userDetails);
        };

        mapLoop();

    } catch (error) {
        console.error(error.message);
        setErrorResponse(error, response, 500)

    }

}

