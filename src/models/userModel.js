import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    username:{
        type: String,
        required: [true, "Username is required"],
        unique: true
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password:{
        type: String,
        required: [true, "password is required"],
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date
})

// as nextjs run on edgecases so next js dosent know that model is already created or not so we write something like below to tall if the model is created than pass me a refrence of a model else create new model
const User=mongoose.models.users || mongoose.model("users",userSchema)


export default User;