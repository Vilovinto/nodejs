import { NextFunction, Request, Response } from "express";

import { StatusCodesEnum } from "../enums/status_codes_enum";
import { IUserCreateDTO } from "../interfaces/user_interface";
import { authService } from "../services/auth.service";

class AuthController {
  public async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body as IUserCreateDTO;
      const data = await authService.singUp(body);
      res.status(StatusCodesEnum.CREATED).json(data);
    } catch (e) {
      next(e);
    }
  }
  public async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as any;
      const data = await authService.signIn(dto);
      res.status(StatusCodesEnum.OK).json(data);
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new AuthController();
