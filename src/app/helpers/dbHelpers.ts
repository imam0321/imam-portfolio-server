import { prisma } from "../config/db";
import AppError from "../errorHelpers/AppError";
import httpStatus from "http-status-codes";

export const ensureUserExists = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, "User not found");
  }

  return user;
};
