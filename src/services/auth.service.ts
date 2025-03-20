import { StatusCodesEnum } from "../enums/status_codes_enum";
import { ApiError } from "../errors/api_error";
import { ITokenPair } from "../interfaces/token.interface";
import { IUser, IUserCreateDTO } from "../interfaces/user_interface";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user_repository";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";
import { userService } from "./user_service";

class AuthService {
  public async singUp(
    user: IUserCreateDTO,
  ): Promise<{ user: IUser; tokens: ITokenPair }> {
    await userService.isEmailUnique(user.email);
    const password = await passwordService.hashPassword(user.password);
    const newUser = await userRepository.create({ ...user, password });
    const tokens = tokenService.generateTokens({
      userId: newUser._id,
      role: newUser.role,
    });
    await tokenRepository.create({ ...tokens, _userId: newUser._id });
    return { user: newUser, tokens };
  }
  public async signIn(dto: any): Promise<{ user: IUser; tokens: ITokenPair }> {
    const user = await userRepository.getByEmail(dto.email);
    const isValidPassword = await passwordService.comparePassword(
      dto.password,
      user.password,
    );
    if (!isValidPassword) {
      throw new ApiError(
        "Invalid email or password",
        StatusCodesEnum.UNAUTHORIZED,
      );
    }
    const tokens = tokenService.generateTokens({
      userId: user._id,
      role: user.role,
    });
    await tokenRepository.create({ ...tokens, _userId: user._id });
    return { user, tokens };
  }
}

export const authService = new AuthService();
