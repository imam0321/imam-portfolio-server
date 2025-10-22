import httpStatus from 'http-status-codes';
import { prisma } from "../../config/db";
import AppError from "../../errorHelpers/AppError";
import bcrypt from "bcryptjs"
import { createUserTokens } from '../../utils/userTokens';

const credentialLogin = async (payload: { email: string, password: string }) => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      email: payload.email
    }
  })

  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User not found")
  }

  const isCorrectPassword = await bcrypt.compare(payload.password, isUserExist.password);

  if (isCorrectPassword) {
    throw new AppError(httpStatus.BAD_REQUEST, "Password not match")
  }

  const JwtPayload = {
    id: isUserExist.id,
    email: isUserExist.email,
  }

  const userTokens = createUserTokens(JwtPayload);

  return {
    accessToken: userTokens.accessToken,
    refreshToken: userTokens.refreshToken,
  }

}


export const AuthService = {
  credentialLogin
}