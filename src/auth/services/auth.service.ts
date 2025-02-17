import { Injectable } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { SignInData } from '../dto/sign-in-data.dto';
import { UsersService } from '../../users/services/users.service';
import { AuthResultDto } from '../dto/auth-result.dto';
import { User } from '../../users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(input: LoginDto): Promise<SignInData | null> {
    const user = await this.usersService.findUserByEmail(input.email);

    if (user && (await this.comparePassword(user, input.password))) {
      return {
        userId: user.id,
        email: user.email,
      };
    }

    return null;
  }

  async comparePassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.password);
  }

  async signIn(user: SignInData): Promise<AuthResultDto> {
    const tokenPayload = {
      sub: user.userId,
      email: user.email,
    };

    const accessToken = await this.jwtService.signAsync(tokenPayload);

    return { accessToken, email: user.email, userId: user.userId };
  }
}
