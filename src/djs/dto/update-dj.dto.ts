import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateDjDto } from './create-dj.dto';

export class UpdateDjDto extends PartialType(
  OmitType(CreateDjDto, ['socialMedias'] as const),
) {}
