import { Inject, Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UserDto } from '../dto/user.dto';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { USER_REPOSITORY } from '../../config/constants/repositories.constant';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<UserDto[]> {
    const users = await this.userRepository.find();

    return users.map((event) =>
      plainToInstance(UserDto, event, {
        excludeExtraneousValues: true,
      }),
    );
  }

  findUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({ email });
  }
}
