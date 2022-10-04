import mongoose from "mongoose";

const userProjectSchema = mongoose.Schema({ //do not use new here 
    project : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "project"
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }

   
}, {skipVersioning : true});

const userProject = mongoose.model("userProject",userProjectSchema);

export default userProject;