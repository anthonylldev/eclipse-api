import { Types } from 'mongoose';

export class SignInData {
  userId: Types.ObjectId;
  email: string;
}
