import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/env";
import { verifyToken } from "../utils/jwt";
import { prisma } from "../config/db";
import httpStatus from "http-status-codes"
import AppError from "../errorHelpers/AppError";

export const checkAuth =
  () =>
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const accessToken = req.cookies.accessToken || req.headers.authorization;

        if (!accessToken) {
          throw new AppError(httpStatus.NOT_FOUND, "No Token found");
        }

        const verifiedToken = verifyToken(
          accessToken,
          envVars.JWT.JWT_ACCESS_SECRET
        ) as JwtPayload;

        const isUserExist = await prisma.user.findFirst({ where: { email: verifiedToken.email } });

        if (!isUserExist) {
          throw new AppError(httpStatus.NOT_FOUND, "User Not Exist!");
        }

        req.user = verifiedToken;
        next();
      } catch (error) {
        next(error);
      }
    };