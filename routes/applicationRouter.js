import express from "express";
import { employerGetAllApplications, jobSeekerDeleteApplication, jobSeekerGetAllApplications, postApplication } from "../controllers/applicationController.js";
import { isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();

router.get("/jobseeker/getall",isAuthenticated,jobSeekerGetAllApplications);
router.delete("/delete/:id",isAuthenticated,jobSeekerDeleteApplication);
router.get("/employer/getall",isAuthenticated,employerGetAllApplications);
router.post("/post",isAuthenticated,postApplication);

export default router;