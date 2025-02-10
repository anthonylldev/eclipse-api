import { Request } from '@nestjs/common';
import { SignInData } from '../dto/sign-in-data.dto';

export interface UserRequest extends Request {
  user: SignInData;
}
