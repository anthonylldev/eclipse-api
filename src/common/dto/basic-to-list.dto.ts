import { Expose } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BasicToListDto {
  @ApiProperty({
    description: 'The unique identifier for the <ENTITY>',
    example: '<ID>',
  })
  @Expose()
  id: number;

  @ApiProperty({
    description: 'The name of the <ENTITY>',
    example: 'Eclipse',
    minLength: 3,
    maxLength: 100,
  })
  @Expose()
  name: string;

  @ApiPropertyOptional({
    description: 'A URL pointing to the <ENTITY> image',
    example: 'https://eclipseoficial.es/image.jpg',
    minLength: 5,
    maxLength: 2048,
    format: 'uri',
  })
  @Expose()
  imageUrl: string;
}
