import {IUser, IUserDTO} from "../interfaces/user_interface";
import {userRepository} from "../repositories/user_repository";

class UserService {
    public getAll(): Promise<IUser[]> {
        return userRepository.getAll()
    }
    public create(user: IUserDTO): Promise<IUser> {
        return userRepository.create(user)
    }
    public getById(userId: string): Promise<IUserDTO> {
        return userRepository.getById(userId)
    }
}


export const userService = new UserService()