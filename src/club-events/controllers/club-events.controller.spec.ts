import { Test, TestingModule } from '@nestjs/testing';
import { ClubEventsController } from './club-events.controller';
import { ClubEventsService } from '../services/club-events.service';

describe('ClubEventsController', () => {
  let controller: ClubEventsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClubEventsController],
      providers: [ClubEventsService],
    }).compile();

    controller = module.get<ClubEventsController>(ClubEventsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
