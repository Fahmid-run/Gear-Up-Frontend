import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

export const verfiyToken = (token: string, jwtSecret: string) => {
  try {
    const verfiyToken = jwt.verify(token, jwtSecret);

    if (!verfiyToken) {
      throw new Error("Token Not verified");
    }

    return {
      success: true,
      token: verfiyToken,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
};
