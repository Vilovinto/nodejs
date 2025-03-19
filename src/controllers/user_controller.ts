import { NextFunction, Request, Response } from "express";

import { StatusCodesEnum } from "../enums/status_codes_enum";
import { IUserDTO } from "../interfaces/user_interface";
import { userService } from "../services/user_service";

class UserController {
  public async getAll(req: Request, res: Response) {
    const data = await userService.getAll();
    res.status(StatusCodesEnum.OK).json(data);
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.body as IUserDTO;
      const data = await userService.create(user);
      res.status(StatusCodesEnum.CREATED).json(data);
    }
    catch (e){
      next(e)
    }
  }

  public async getById(req: Request, res: Response) {
    const { id } = req.params;
    const data = await userService.getById(id);
    res.status(StatusCodesEnum.OK).json(data);
  }

  public async updateById(req: Request, res: Response) {
    const { id } = req.params;
    const user = req.body as IUserDTO;
    const data = await userService.updateById(id, user);
    res.status(StatusCodesEnum.OK).json(data);
  }

  public async deleteById(req: Request, res: Response) {
    const { id } = req.params;
    await userService.deleteById(id);
    res.status(StatusCodesEnum.NO_CONTENT).end();
  }
}

export const userController = new UserController();
