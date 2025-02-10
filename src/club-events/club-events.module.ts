import { Module } from '@nestjs/common';
import { ClubEventsService } from './services/club-events.service';
import { ClubEventsController } from './controllers/club-events.controller';
import { ClubEventSchema } from './entities/club-event.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'ClubEvent',
        schema: ClubEventSchema,
      },
    ]),
  ],
  controllers: [ClubEventsController],
  providers: [ClubEventsService],
})
export class ClubEventsModule {}
