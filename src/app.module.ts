import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ClubEventsModule } from './club-events/club-events.module';
import { SocialMediasModule } from './social-medias/social-medias.module';
import { DjsModule } from './djs/djs.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    AuthModule,
    ClubEventsModule,
    SocialMediasModule,
    DjsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
