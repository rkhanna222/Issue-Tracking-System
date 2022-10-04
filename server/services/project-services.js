import Project from "../models/Project.js"

export const post = (project) => {
    const newProject = new Project(project);
    return newProject.save();
}

export const getProjects = () => {

    return Project.find();
}




export const getProjectbyId = (id) => {

    return Project.findById(id).exec();
}

export const removeProject = (id) => {

    return Project.findByIdAndDelete(id).exec();
}

export const updateProject = (id,payload) => {
    return Project.findByIdAndUpdate(id,payload);
}