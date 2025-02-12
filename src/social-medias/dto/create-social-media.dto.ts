import { IsEnum, IsUrl, MaxLength, MinLength } from 'class-validator';
import { SocialMediaType } from '../enums/social-media-type.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSocialMediaDto {
  @ApiProperty({
    description: 'The type of the social media',
    example: 'INSTAGRAM',
  })
  @IsEnum(SocialMediaType)
  type: SocialMediaType;

  @ApiProperty({
    description: 'The url of the social media',
    example: 'https://www.instagram.com/johndoe/',
  })
  @IsUrl()
  @MinLength(5)
  @MaxLength(2048)
  url: string;
}
