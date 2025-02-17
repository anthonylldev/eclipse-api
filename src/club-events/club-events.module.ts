import { Module } from '@nestjs/common';
import { ClubEventsService } from './services/club-events.service';
import { ClubEventsController } from './controllers/club-events.controller';
import { DatabaseModule } from '../common/database/database.module';
import { clubEventProvider } from './providers/club-event.provider';
import { djProvider } from '../djs/providers/dj.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [ClubEventsController],
  providers: [...clubEventProvider, ...djProvider, ClubEventsService],
})
export class ClubEventsModule {}
