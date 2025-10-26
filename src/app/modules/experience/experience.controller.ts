import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { JwtPayload } from "jsonwebtoken";
import { ExperienceService } from "./experience.service";

const createExperience = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as JwtPayload;
  const result = await ExperienceService.createExperience(user.userId, req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Create experience successfully",
    data: result
  })
})

const getAllExperiences = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const result = await ExperienceService.getAllExperiences();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Experience retrieve successfully",
    data: result
  })
})

const getSingleExperience = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const result = await ExperienceService.getSingleExperience(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Experience retrieve successfully",
    data: result
  })
})


export const ExperienceController = {
  createExperience,
  getAllExperiences,
  getSingleExperience,
}