import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { PassportJwtGuard } from '../../auth/guards/passport-jwt/passport-jwt.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserDto } from '../dto/user.dto';
import { ExceptionResponseDto } from '../../common/dto/exception-response.dto';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(PassportJwtGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Retrieve all users',
    description:
      'This endpoint retrieves a list of all registered users in the system. Requires JWT authentication.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of all users retrieved successfully.',
    type: UserDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized. The JWT was missing or invalid.',
    type: ExceptionResponseDto,
    example: {
      statusCode: HttpStatus.UNAUTHORIZED,
      message: 'Unauthorized',
    },
  })
  findAll(): Promise<UserDto[]> {
    return this.usersService.findAll();
  }
}
