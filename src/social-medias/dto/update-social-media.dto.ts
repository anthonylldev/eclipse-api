import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateSocialMediaDto } from './create-social-media.dto';

export class UpdateSocialMediaDto extends PartialType(
  OmitType(CreateSocialMediaDto, ['dj'] as const),
) {}
