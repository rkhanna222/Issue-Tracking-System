import mongoose from "mongoose";

const ticketSchema = mongoose.Schema({
    ticketTitle : {
        type : String,
        required : true

    },
    ticketDescription : {
        type : String,
        required : true

    },
    firstname : {
        type : String,
        required : true

    },
    lastname : {
        type : String,
        required : true

    },
    projectId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "project"
    },
    ticketAuthor : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"

    },
    timeEstimate : {
        type : String,
        required : true
    },
    ticketType : {
        type : String,
        required : true
    },
    priority : {
        type : String,
        required : true
    },
    ticketStatus : {
        type : String,
        required : true,
        default : "Active"

    },assignees : [
        {
        firstname : {
            type : String
        },
        userId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "user"
        },
        lastname : {
            type  :String
        },
        email : {
            type : String
        }
    }
    ],
    comments : [{
            firstname : {
                type : String
            },
            userId : {
                type : mongoose.Schema.Types.ObjectId,
                ref : "user"
            },
            lastname : {
                type  :String
            },
            commentText : {
                type : String
            },
            createdTime : {
                type : Date,
               
            }

    }]
        


}, {skipVersioning : true});


const ticketModel = mongoose.model("ticket",ticketSchema);

export default ticketModel;