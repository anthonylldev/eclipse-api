import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class AuthResultDto {
  @ApiProperty({
    description:
      'The JWT access token used for authorization on secure endpoints.',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZGQxNjAyMTQzMTY3MDMwNTQyNDIiLCJpYXQiOjE2OTU4Mzg5Nzd9.tcNS9JdaP8d-Wc9jI5bhJy8ZYwf0N_OB-DLOyyVoQi8',
  })
  accessToken: string;

  @ApiProperty({
    description:
      'The unique identifier of the authenticated user, represented as a MongoDB ObjectId.',
    example: '64d1a402147860301542c0b3',
    type: 'string',
  })
  userId: Types.ObjectId;

  @ApiProperty({
    description: 'The email address of the authenticated user.',
    example: 'johndoe@example.com',
  })
  email: string;
}
