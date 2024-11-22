import {IUserRepository} from "../interfaces/user-repository.interface";
import {User, UserModel} from "../models/user.model";

class UserRepository implements IUserRepository {

  private static instance: UserRepository;

  private constructor() {
  }

  static getInstance(): UserRepository {
    if (!UserRepository.instance) {
      UserRepository.instance = new UserRepository();
    }
    return UserRepository.instance;
  }

  private sanitizeUsername(username: string): string {
    return username.replace(/[^a-zA-Z0-9]/g, '');
  }

  async saveUser(user: User): Promise<User> {
    const newUser = new UserModel(user);
    return newUser.save();
  }

  async findByUsernameAndPassword(username: string, password: string): Promise<User | null> {
    const sanitizedUsername = this.sanitizeUsername(username);
    const user = await UserModel.findOne({ username: sanitizedUsername }).exec();

    if (user && await user.comparePassword(password)) {
      return user;
    }

    return null;
  }
}

export const userRepository: IUserRepository = UserRepository.getInstance();
