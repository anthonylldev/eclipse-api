import {
  IsEnum,
  IsOptional,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import { SocialMediaType } from '../enums/social-media-type.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSocialMediaDto {
  @ApiProperty({
    description: 'The type of the social media',
    example: 'INSTAGRAM',
  })
  @IsEnum(SocialMediaType)
  type: SocialMediaType;

  @ApiProperty({
    description: 'The url of the social media',
    example: 'https://www.instagram.com/user/',
  })
  @IsUrl()
  @MinLength(5)
  @MaxLength(2048)
  url: string;

  @ApiPropertyOptional({
    description: 'The id of the dj',
    example: '<ID>',
  })
  @IsOptional()
  dj: number;
}
