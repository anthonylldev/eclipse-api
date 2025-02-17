import { PartialType } from '@nestjs/swagger';
import { CreateDjDto } from './create-dj.dto';
import { SocialMediaDto } from '../../social-medias/dto/social-media.dto';

export class UpdateDjDto extends PartialType(CreateDjDto) {
  socialMedias: SocialMediaDto[];
}
