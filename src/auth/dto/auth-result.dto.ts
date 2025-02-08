import { Types } from 'mongoose';

export interface AuthResultDto {
  accessToken: string;
  userId: Types.ObjectId;
  email: string;
}
