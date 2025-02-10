import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateClubEventDto {
  @ApiProperty({
    description: 'The name of the event',
    example: 'Eclipse opening',
    minLength: 3,
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  name: string;

  @ApiPropertyOptional({
    description: 'A brief description of the event',
    example: 'Openings for the Eclipse, djs and other guests',
    minLength: 10,
    maxLength: 500,
  })
  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(500)
  description: string;

  @ApiProperty({
    description: 'The date of the event in ISO string format',
    example: '2023-12-15T09:00:00.000Z',
    format: 'date-time',
  })
  @IsDateString()
  @IsNotEmpty()
  date: string;

  @ApiPropertyOptional({
    description: 'A URL pointing to the tickets page',
    example: 'https://example.com/tickets',
    minLength: 5,
    maxLength: 2048,
    format: 'uri',
  })
  @IsOptional()
  @IsUrl()
  @MinLength(5)
  @MaxLength(2048)
  ticketsUrl: string;

  @ApiPropertyOptional({
    description: 'A URL pointing to the event image',
    example: 'https://example.com/event-image.jpg',
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
