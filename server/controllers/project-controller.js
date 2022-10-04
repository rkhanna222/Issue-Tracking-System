import * as projectServices from "../services/project-services.js";
import * as ticketService from "../services/ticket-service.js";
import Project from "../models/Project.js"

// import expressValidator from "express-validaor";
// import check from "express-validator/check";

const setSuccessResponse = (obj, response) => {
    response.status(200);
    response.json(obj);
}

//boiler plate for error response
const setErrorResponse = (error, response, status) => {
    response.status(status);
    response.json(error)

}
// @route   POST /api/projects
// @desc    Create project
// @access  private
export const postProject = async (request, response) => {
    console.log(request.body)
    try {
        const { projectTitle, projectDesc } = request.body;
        const payload = new Project({
            projectTitle,
            projectDesc
        });

        console.log(payload, "@@@@@");

        const project = await projectServices.post(payload);
        console.log(project, "######");
        response.status(200).send({
            id: project._id,
            title: project.projectTitle
        });
        //setSuccessResponse(project,response);

    }

    catch (error) {
        console.error(error.message);
        setErrorResponse(error, response, 500);

    }

}

// @route   POST /api/projects/
// @desc    get all projects
// @access  private

export const getAllProject = async (request, response) => {

    try {
        const project = await projectServices.getProjects();
        response.send(project);
    }
    catch (error) {
        console.error(error.message);
        setErrorResponse(error, response, 500);
    }

}

// @route   GET /api/projects/:id
// @desc    get project by id
// @access  private

export const getProjectById = async (request, response) => {

    try {
        const id = request.params.id;
        const project = await projectServices.getProjectbyId(id);
        response.send(project);
    }
    catch (error) {
        console.error(error.message);
        setErrorResponse(error, response, 500);

    }

}


// @route   DELETE /api/projects/:id
// @desc    delete project by id
// @access  private

export const removeProjectById = async (request, response) => {

    try {
        const id = request.params.id;
        const project = await projectServices.removeProject(id);
        const tickets = await ticketService.deleteTicketsByProject(id);
        response.send(project);
    }
    catch (error) {
        console.error(error.message);
        setErrorResponse(error, response, 500);

    }

}



// @route   POST /api/projects/:id
// @desc    update project by id
// @access  private

export const updateProject = async (request, response) => {
    try {
        const projectId = request.params.id;

        const project = await projectServices.getProjectbyId(projectId);
        if (!project) {
            setErrorResponse({ msg: "Cannot find the project to update" }, response, 404);

        }

        const { projectTitle, projectDesc } = request.body;
        const payload = {
            projectTitle: projectTitle,
            projectDesc: projectDesc
        };

        const updatedProject = await projectServices.updateProject(projectId, payload); // always add await to avoid converting circular structure to JSON error

        if (!updatedProject) {
            setErrorResponse({ msg: "Cannot update the project" }, response, 404);
        }

        const projectToSend = await projectServices.getProjectbyId(projectId);

        response.status(200).send({
            msg: "Project updated successfully",
            project: projectToSend,
        })



    } catch (error) {
        console.error(error.message);
        setErrorResponse(error, response, 500);
    }
}

