import mongoose from "mongoose";

const projectSchema = mongoose.Schema({ //do not use new here 
    projectTitle : {
        type: String,
        required: true
    },
    projectDesc : {
        type: String,
        required: true
    } 
}, {skipVersioning : true});

const project = mongoose.model("project",projectSchema);

export default project;