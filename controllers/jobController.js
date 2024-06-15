import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Job } from "../models/jobSchema.js";

export const getAllJobs = catchAsyncError(async(req,res,next)=>{
    
    const jobs = await Job.find({expired:false});

    res.status(200).json({
        success:true,
        jobs,
    })

})

export const postJob = catchAsyncError(async(req,res,next)=>{

    const {role} = req.user;
    
    if(role === "Job Seeker"){
        return next(new ErrorHandler("Job Seeker is not allowed to access this resource",400));
    }

    const {title,description,category,country,city,location,fixedSalary,salaryFrom,salaryTo} = req.body;

    if(!title|| !description|| !category ||!country || !city || !location){
        return next(new ErrorHandler("Please provide all the job details",400));
    }

    if((!salaryFrom || !salaryTo) && !fixedSalary){
        return next(new ErrorHandler("Please either provide fixed salary or ranged salary",400));
    }

    if(salaryFrom && salaryTo && fixedSalary){
        return next(new ErrorHandler("Cannot enter fxed and ranged salary at same time",400));
    }

    const postedBy = req.user._id;

    const job = await Job.create({title,description,category,country,city,location,fixedSalary,salaryFrom,salaryTo,postedBy});
    
    res.status(200).json({
        success:true,
        message:"Job created successfuly",
        job
    })


})

// for employer --> to access all the jobs provided by it
export const getMyJobs = catchAsyncError(async(req,res,next)=>{
    
    const {role} = req.user;
    
    if(role === "Job Seeker"){
        return next(new ErrorHandler("Job Seeker is not allowed to access this resource",400));
    }

    const myJobs = await Job.find({postedBy:req.user._id});

    res.status(200).json({
        success:true,
        message:"Jobs fetched success",
        myJobs
    })

});


export const updateJob = catchAsyncError(async(req,res,next)=>{

    const {role} = req.user;
    
    if(role === "Job Seeker"){
        return next(new ErrorHandler("Job Seeker is not allowed to access this resource",400));
    }

    const id = req.params.id;

    let job = await Job.findById(id);

    if(!job){
        return next(new ErrorHandler("Job not found",404));
    }

    job = await Job.findByIdAndUpdate(id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        success:true,
        message:"Job updated successfully",
        job
    })

})

export const deleteJob = catchAsyncError(async(req,res,next)=>{

    const {role} = req.user;
    
    if(role === "Job Seeker"){
        return next(new ErrorHandler("Job Seeker is not allowed to access this resource",400));
    }

    const id = req.params.id;

    let job = await Job.findById(id);

    if(!job){
        return next(new ErrorHandler("Job not found",404));
    }

    await Job.findByIdAndDelete(id);

    res.status(200).json({
        success:true,
        message:"Job deleted succesfuly"
    })

})

export const  getSingleJob = catchAsyncError(async(req,res,next)=>{
    const {id}=req.params;
    try{

        const job = await Job.findById(id);

        if(!job){
            return next(new ErrorHandler("Job not found",404));
        }
        res.status(200).json({
            success:true,
            job
        })

    }
    catch(err){
        return next(new ErrorHandler("Invalid id or CasteError",400));
    }
})