import {userRepository} from "../repositories/user.repository";
import {User} from "../models/user.model";
import jwt from 'jsonwebtoken';
import {IUserResponse} from "../models/user-response.model";
import {IAuthService} from "../interfaces/auth-service.interface";
import {IUserRepository} from "../interfaces/user-repository.interface";

const JWT_SECRET: string = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
  console.error("\nThe JWT_SECRET environment variable is required.\n");
  process.exit(1);
}

class AuthService implements IAuthService {

  private static instance: AuthService;

  private constructor(private readonly userRepository: IUserRepository) {
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService(userRepository);
    }
    return AuthService.instance;
  }

  async register(entity: User): Promise<IUserResponse> {
    const savedUser: User = await this.userRepository.saveUser(entity);

    if (!savedUser) {
      throw new Error("An error occurred while saving the user.");
    }

    return {
      name: savedUser.name,
      username: savedUser.username,
      email: savedUser.email,
    }
  }

  async login(username: string, password: string): Promise<string | null> {
    const user: User | null = await this.userRepository.findByUsernameAndPassword(username, password);
    if (user) {
      return jwt.sign({id: user.id, username: user.username}, JWT_SECRET, {expiresIn: '1h'});
    }
    return null;
  }
}

export const authService: AuthService = AuthService.getInstance();
