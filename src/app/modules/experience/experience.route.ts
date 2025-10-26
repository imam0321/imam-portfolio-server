import { Router } from "express";
import { checkAuth } from "../../utils/checkAuth";
import { ExperienceController } from "./experience.controller";


const router = Router();

router.post("/", checkAuth(), ExperienceController.createExperience);
router.get("/", ExperienceController.getAllExperiences);
router.get("/:id", ExperienceController.getSingleExperience);

export const ExperienceRouters = router;