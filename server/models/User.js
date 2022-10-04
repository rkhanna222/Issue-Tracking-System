import mongoose from "mongoose";

const userSchema = mongoose.Schema({ //do not use new here 
    firstname : {
        type: String,
        required: true
    },
    lastname : {
        type: String,
        required: true
    },
    phone : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    auth: {
        type : String,
        required : true
    },
    
},
{
    timestamps: true,
  },
   {skipVersioning : true});

//    userSchema.pre("save", async function (next) {
//     if (!this.isModified("password")) {
//       return next();
//     }
//     const hash = await bcrypt.hash(this.password, Number(bcryptSalt));
//     this.password = hash;
//     next();
//   });   

const user = mongoose.model("user",userSchema);

export default user;