import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateDjDto {
  @ApiProperty({
    description: 'The name of the dj',
    example: 'Dj Eclipse',
    minLength: 3,
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  name: string;

  @ApiPropertyOptional({
    description: 'A brief description of the dj',
    example: 'Dj resident for the Eclipse',
    minLength: 10,
    maxLength: 500,
  })
  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(500)
  description: string;

  @ApiPropertyOptional({
    description: 'A URL pointing to the dj image',
    example: 'https://example.com/dj-image.jpg',
    minLength: 5,
    maxLength: 2048,
    format: 'uri',
  })
  @IsOptional()
  @IsUrl()
  @MinLength(5)
  @MaxLength(2048)
  imageUrl: string;
}
