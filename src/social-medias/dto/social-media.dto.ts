import { ApiProperty } from '@nestjs/swagger';
import { SocialMediaType } from '../enums/social-media-type.enum';
import { Expose } from 'class-transformer';

export class SocialMediaDto {
  @ApiProperty({
    description: 'The unique identifier for the dj',
    example: '<ID>',
  })
  @Expose()
  id: number;

  @ApiProperty({
    description: 'The type of the social media',
    example: 'INSTAGRAM',
  })
  @Expose()
  type: SocialMediaType;

  @ApiProperty({
    description: 'The url of the social media',
    example: 'https://www.instagram.com/user/',
  })
  @Expose()
  url: string;
}
