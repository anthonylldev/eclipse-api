import { Test, TestingModule } from '@nestjs/testing';
import { ClubEventsService } from './club-events.service';

describe('ClubEventsService', () => {
  let service: ClubEventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClubEventsService],
    }).compile();

    service = module.get<ClubEventsService>(ClubEventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
