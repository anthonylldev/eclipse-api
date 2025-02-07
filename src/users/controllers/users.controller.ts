import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { User } from '../entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
}
