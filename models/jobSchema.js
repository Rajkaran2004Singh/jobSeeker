import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Please provide job title"],
        minLength:[3,"Minimum 3 characters required"]
    },
    description:{
        type:String,
        required:[true,"Please provide job description"]
    },
    category:{
        type:String,
        required:[true,"Job category is required"]
    },
    country:{
        type:String,
        required : [true,"Job country is required"]
    },
    city:{
        type:String,
        required : [true,"Job city is required"]
    },
    location:{
        type:String,
        required : [true,"Job location is required"],
        minLength:[10,"Exact location must contain atleast 10 characters"]
    },
    fixedSalary:{
        type:Number,
        minLength:[4,"Atleast 4 characters required"],
        maxLength:[10,"Maximum 4 characters are required"]
    },
    salaryFrom:{
        type:Number,
        minLength:[4,"Atleast 4 characters required"],
        maxLength:[10,"Maximum 4 characters are required"]
    },
    salaryTo:{
        type:Number,
        minLength:[4,"Atleast 4 characters required"],
        maxLength:[10,"Maximum 4 characters are required"]
    },
    expired:{
        type:Boolean,
        default:false
    },
    jobPostedOn:{
        type:Date,
        default:Date.now
    },
    postedBy:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
})

export const Job = mongoose.model("Job",jobSchema)