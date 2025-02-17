import { Test, TestingModule } from '@nestjs/testing';
import { DjsController } from './djs.controller';
import { DjsService } from '../services/djs.service';

describe('DjsController', () => {
  let controller: DjsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DjsController],
      providers: [DjsService],
    }).compile();

    controller = module.get<DjsController>(DjsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
