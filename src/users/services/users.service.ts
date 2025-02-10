import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from '../entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findAll(): Promise<UserDto[]> {
    return this.userModel.find().select('-password').exec();
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }
}
