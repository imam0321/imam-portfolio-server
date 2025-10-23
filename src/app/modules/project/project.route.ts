import { NextFunction, Request, Response, Router } from "express";
import { checkAuth } from "../../utils/checkAuth";
import { ProjectController } from "./project.controller";
import { fileUploader } from "../../helpers/fileUploader";
import { ProjectValidation } from "./project.validation";

const router = Router();

router.get("/", ProjectController.getAllProjects)
router.post("/", checkAuth(),
  fileUploader.upload.array("files"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = ProjectValidation.createProjectValidation.parse(JSON.parse(req.body.data))
    ProjectController.createProject(req, res, next)
  })
router.get("/:id", ProjectController.getSingleProject)
router.delete("/:id", checkAuth(), ProjectController.deleteProject)


export const ProjectRouters = router;