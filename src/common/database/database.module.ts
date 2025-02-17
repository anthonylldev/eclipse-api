import { Module } from '@nestjs/common';
import { databaseProviders } from '../../config/providers/database.providers';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
