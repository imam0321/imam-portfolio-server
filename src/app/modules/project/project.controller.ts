import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ProjectService } from "./project.service";
import { JwtPayload } from "jsonwebtoken";

const createProject = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as JwtPayload;
  const result = await ProjectService.createProject(user.userId, req);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Create project successfully",
    data: result
  })
})

const getAllProjects = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const result = await ProjectService.getAllProjects();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Projects retrieve successfully",
    data: result
  })
})

const getSingleProject = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const result = await ProjectService.getSingleProject(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Project retrieve successfully",
    data: result
  })
})
const deleteProject = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as JwtPayload;
  const result = await ProjectService.deleteProject(user.userId, req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Project deleted successfully",
    data: result
  })
})

export const ProjectController = {
  createProject,
  getAllProjects,
  getSingleProject,
  deleteProject
}