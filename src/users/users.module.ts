import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { DatabaseModule } from '../common/database/database.module';
import { userProvider } from './providers/user.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [...userProvider, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
