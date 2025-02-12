import { Test, TestingModule } from '@nestjs/testing';
import { SocialMediasController } from './social-medias.controller';
import { SocialMediasService } from '../services/social-medias.service';

describe('SocialMediasController', () => {
  let controller: SocialMediasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SocialMediasController],
      providers: [SocialMediasService],
    }).compile();

    controller = module.get<SocialMediasController>(SocialMediasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
