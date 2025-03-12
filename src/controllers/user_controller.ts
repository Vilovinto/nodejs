import {Request, Response} from "express";
import {userService} from "../services/user_service";
import {IUserDTO} from "../interfaces/user_interface";
import {StatusCodesEnum} from "../enums/status_codes_enum";

class UserController{
    public async getAll(req:Request, res:Response) {
        const data = await userService.getAll();
        res.status(StatusCodesEnum.OK).json(data);
    }

    public async create (req:Request, res:Response) {
        const user = req.body as IUserDTO;
        const data = await userService.create(user);
        res.status(StatusCodesEnum.CREATED).json(data);
    }

    public async getById (req:Request, res:Response) {
        const {id} = req.params;
        const data = await userService.getById(id);
        res.status(StatusCodesEnum.OK).json(data);
    }
}

export const userController = new UserController();