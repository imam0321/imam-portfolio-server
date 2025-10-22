import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { setAuthCookie } from "../../utils/setCookies";
import { AuthService } from "./auth.service";

const credentialLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const result = await AuthService.credentialLogin(req.body);

  setAuthCookie(res, result)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Admin login successfully",
    data: result
  })
})

export const AuthController = {
  credentialLogin
}