import { ApiProperty } from '@nestjs/swagger';

export class AuthResultDto {
  @ApiProperty({
    description:
      'The JWT access token used for authorization on secure endpoints.',
    example: '<TOKEN>',
  })
  accessToken: string;

  @ApiProperty({
    description: 'The unique identifier of the authenticated user.',
    example: '<ID>',
  })
  userId: number;

  @ApiProperty({
    description: 'The email address of the authenticated user.',
    example: 'user@example.com',
  })
  email: string;
}
