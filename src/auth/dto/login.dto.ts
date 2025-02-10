import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'The email address of the authenticated user.',
    example: 'user@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'The password of the authenticated user.',
    example: '<PASSWORD>',
  })
  password: string;
}
