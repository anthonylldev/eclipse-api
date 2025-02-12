import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export class UserDto {
  @ApiProperty({
    description: 'Unique identifier for the user',
    example: '<ID>',
  })
  @Expose()
  id: number;

  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
  })
  @Expose()
  name: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'johndoe@example.com',
  })
  @Expose()
  email: string;

  @Exclude()
  password: string;
}
