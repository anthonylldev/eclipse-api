import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { PassportLocalGuard } from '../guards/passport-local/passport-local.guard';
import { UserRequest } from '../interfaces/user-request.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(PassportLocalGuard)
  login(@Request() request: UserRequest) {
    return this.authService.signIn(request.user);
  }
}
