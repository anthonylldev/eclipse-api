import { PartialType } from '@nestjs/swagger';
import { CreateClubEventDto } from './create-club-event.dto';

export class UpdateClubEventDto extends PartialType(CreateClubEventDto) {}
