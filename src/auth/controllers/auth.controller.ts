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
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthResultDto } from '../dto/auth-result.dto';
import { LoginDto } from '../dto/login.dto';
import { UnauthorizedResponseDto } from '../../common/dto/unauthorized-response.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(PassportLocalGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Authenticate user and return access token',
    description:
      'This endpoint allows a user to log in by validating their credentials. Upon successful authentication, an access token and other user information are returned.',
  })
  @ApiBody({
    required: true,
    description:
      'User login details. The email and password fields are mandatory.',
    type: LoginDto,
  })
  @ApiResponse({
    status: 200,
    description:
      'Successfully authenticated. The response includes an access token and user information.',
    type: AuthResultDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials. The user was not authenticated.',
    type: UnauthorizedResponseDto,
  })
  login(@Request() request: UserRequest): Promise<AuthResultDto> {
    return this.authService.signIn(request.user);
  }
}
