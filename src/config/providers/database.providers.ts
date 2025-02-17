import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      if (!process.env.DATABASE_URL) {
        throw new Error('DATABASE_URL is not defined');
      }

      const dataSource = new DataSource({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
