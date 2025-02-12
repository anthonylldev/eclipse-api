import { Module } from '@nestjs/common';
import { SocialMediasService } from './services/social-medias.service';
import { SocialMediasController } from './controllers/social-medias.controller';
import { DatabaseModule } from '../database/database.module';
import { socialMediaProvider } from './providers/social-media.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [SocialMediasController],
  providers: [...socialMediaProvider, SocialMediasService],
})
export class SocialMediasModule {}
