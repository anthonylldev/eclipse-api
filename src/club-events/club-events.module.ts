import { Module } from '@nestjs/common';
import { ClubEventsService } from './services/club-events.service';
import { ClubEventsController } from './controllers/club-events.controller';
import { DatabaseModule } from '../database/database.module';
import { clubEventProvider } from './providers/club-event.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [ClubEventsController],
  providers: [...clubEventProvider, ClubEventsService],
})
export class ClubEventsModule {}
