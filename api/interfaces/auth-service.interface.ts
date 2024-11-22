import {IUserResponse} from "../models/user-response.model";
import {User} from "../models/user.model";

export interface IAuthService {
    register(user: User): Promise<IUserResponse>;

    login(username: string, password: string): Promise<string | null>;
}
