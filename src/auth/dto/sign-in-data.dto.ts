import { Types } from 'mongoose';

export interface SignInData {
  userId: Types.ObjectId;
  email: string;
}
