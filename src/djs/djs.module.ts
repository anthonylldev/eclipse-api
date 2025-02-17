import { Module } from '@nestjs/common';
import { DjsService } from './services/djs.service';
import { DjsController } from './controllers/djs.controller';
import { DatabaseModule } from '../common/database/database.module';
import { djProvider } from './providers/dj.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [DjsController],
  providers: [...djProvider, DjsService],
})
export class DjsModule {}
