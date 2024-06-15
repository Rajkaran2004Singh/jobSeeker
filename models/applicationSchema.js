import mongoose from "mongoose";
import validator from "validator";

const applicationSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please provide ypur name"],
        minLength:[3,"name must contain atleast 3 characters"],
        maxLength:[25,"name must contain maximum 25 characters"]
    },
    email:{
        type:String,
        validate: [validator.isEmail, "Please provide a valid Email!"],
        required:[true,"Please provide email"]
    },
    coverLetter:{
        type:String,
        required:[true,"Please provide cover letter"]
    },
    phone:{
        type:Number,
        required:[true,"Please provide your phone number"]
    },
    address:{
        type:String,
        required:[true,"Please enter your address"]
    },
    resume:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    applicantID:{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        role:{
            type:String,
            enum:["Job Seeker"],
            required:true
        }
    },
    employerID:{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        role:{
            type:String,
            enum:["Employer"],
            required:true
        }
    }
});

export const Application = mongoose.model("Application",applicationSchema)