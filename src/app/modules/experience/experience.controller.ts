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


export const ExperienceController = {
  createExperience,
}