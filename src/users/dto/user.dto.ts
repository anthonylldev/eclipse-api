import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    description: 'Unique identifier for the user',
    example: '64d1a402147860301542c0b3',
    type: 'string',
  })
  _id: Types.ObjectId;

  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'johndoe@example.com',
  })
  email: string;
}