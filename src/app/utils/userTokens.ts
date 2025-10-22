import { envVars } from "../config/env";
import { generateToken } from "./jwt";

export const createUserTokens = (user: { id: string, email: string }) => {
  const jwtPayload = {
    userId: user.id,
    email: user.email,
  };

  const accessToken = generateToken(
    jwtPayload,
    envVars.JWT.JWT_ACCESS_SECRET,
    envVars.JWT.JWT_ACCESS_EXPIRES
  );

  const refreshToken = generateToken(
    jwtPayload,
    envVars.JWT.JWT_REFRESH_SECRET,
    envVars.JWT.JWT_REFRESH_EXPIRES
  );

  return {
    accessToken,
    refreshToken,
  };
};