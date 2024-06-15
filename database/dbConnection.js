import mongoose from "mongoose";

export const dbConnection = () => {
    mongoose.connect(process.env.DB_URL,{
        dbName:"JOB_SEEKER"
    }).then(()=>{
        console.log("dbConnection success...");
    }).catch((err)=>{
        console.log(`some error occured in dbConnection ${err}`)
    })
}