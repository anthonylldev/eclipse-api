import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { SocialMediaDto } from '../../social-medias/dto/social-media.dto';

export class DjDto {
  @ApiProperty({
    description: 'The unique identifier for the dj',
    example: '<ID>',
  })
  @Expose()
  id: number;

  @ApiProperty({
    description: 'The name of the dj',
    example: 'Dj Eclipse',
    minLength: 3,
    maxLength: 100,
  })
  @Expose()
  name: string;

  @ApiPropertyOptional({
    description: 'A brief description of the dj',
    example: 'Dj resident for the Eclipse',
    minLength: 10,
    maxLength: 500,
  })
  @Expose()
  description: string;

  @ApiPropertyOptional({
    description: 'A URL pointing to the dj image',
    example: 'https://example.com/dj-image.jpg',
    minLength: 5,
    maxLength: 2048,
    format: 'uri',
  })
  @Expose()
  imageUrl: string;

  @ApiPropertyOptional({
    description: 'Social media links for the dj',
    type: SocialMediaDto,
    isArray: true,
  })
  @Expose()
  @Type(() => SocialMediaDto)
  socialMedias: SocialMediaDto[];
}
