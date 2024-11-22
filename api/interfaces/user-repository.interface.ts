import {User} from "../models/user.model";

export interface IUserRepository {
  findByUsernameAndPassword(username: string, password: string): Promise<User | null>;

  saveUser(user: User): Promise<User>;
}
