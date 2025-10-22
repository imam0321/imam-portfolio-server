import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const credentialLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const result = await AuthService.CredentialLogin(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Admin login successfully",
    data: return
  })
})

export const AuthController = {
  credentialLogin
}