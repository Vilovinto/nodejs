import jwt from "jsonwebtoken";

import { config } from "../configs/config";
import { StatusCodesEnum } from "../enums/status_codes_enum";
import { ApiError } from "../errors/api_error";
import { ITokenPair, ITokenPayload } from "../interfaces/token.interface";

class TokenService {
  public generateTokens(payload: ITokenPayload): ITokenPair {
    const accessToken = jwt.sign(payload, config.JWT_ACCESS_SECRET, {
      expiresIn: config.JWT_ACCESS_LIFETIME,
    });
    const refreshToken = jwt.sign(payload, config.JWT_REFRESH_SECRET, {
      expiresIn: config.JWT_REFRESH_LIFETIME,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  public verifyToken(token: string, type: "access" | "refresh"): ITokenPayload {
    try {
      let secret: string;

      switch (type) {
        case "access":
          secret = config.JWT_ACCESS_SECRET;
          break;
        case "refresh":
          secret = config.JWT_REFRESH_SECRET;
          break;
        default:
          throw new ApiError("Invalid token type", StatusCodesEnum.BED_REQUEST);
      }
      return jwt.verify(token, secret) as ITokenPayload;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      throw new ApiError("Invalid token", StatusCodesEnum.UNAUTHORIZED);
    }
  }
}

export const tokenService = new TokenService();
