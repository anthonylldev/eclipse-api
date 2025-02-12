import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ClubEventDto {
  @ApiProperty({
    description: 'The unique identifier for the event',
    example: '<ID>',
  })
  @Expose()
  id: number;

  @ApiProperty({
    description: 'The name of the event',
    example: 'Eclipse opening',
    minLength: 3,
    maxLength: 100,
  })
  @Expose()
  name: string;

  @ApiPropertyOptional({
    description: 'A brief description of the event',
    example: 'Openings for the Eclipse, djs and other guests',
    minLength: 10,
    maxLength: 500,
  })
  @Expose()
  description: string;

  @ApiProperty({
    description: 'The date of the event in ISO string format',
    example: '2023-12-15T09:00:00.000Z',
    format: 'date-time',
  })
  @Expose()
  date: Date;

  @ApiPropertyOptional({
    description: 'A URL pointing to the tickets page',
    example: 'https://example.com/tickets',
    minLength: 5,
    maxLength: 2048,
    format: 'uri',
  })
  @Expose()
  ticketsUrl: string;

  @ApiPropertyOptional({
    description: 'A URL pointing to the event image',
    example: 'https://example.com/event-image.jpg',
    minLength: 5,
    maxLength: 2048,
    format: 'uri',
  })
  @Expose()
  imageUrl: string;
}
