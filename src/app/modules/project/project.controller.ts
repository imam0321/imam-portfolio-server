import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ProjectService } from "./project.service";
import { JwtPayload } from "jsonwebtoken";

const createProject = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as JwtPayload;
  const result = await ProjectService.createProject(user.userId, req);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Create project successfully",
    data: result
  })
})

export const ProjectController = {
  createProject
}