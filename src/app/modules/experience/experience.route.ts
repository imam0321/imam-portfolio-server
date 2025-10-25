import { Router } from "express";
import { checkAuth } from "../../utils/checkAuth";
import { ExperienceController } from "./experience.controller";


const router = Router();

router.post("/", checkAuth(), ExperienceController.createExperience);


export const ExperienceRouters = router;