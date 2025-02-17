import { Module } from '@nestjs/common';
import { SocialMediasService } from './services/social-medias.service';
import { SocialMediasController } from './controllers/social-medias.controller';
import { DatabaseModule } from '../common/database/database.module';
import { socialMediaProvider } from './providers/social-media.provider';
import { djProvider } from '../djs/providers/dj.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [SocialMediasController],
  providers: [...socialMediaProvider, ...djProvider, SocialMediasService],
})
export class SocialMediasModule {}
