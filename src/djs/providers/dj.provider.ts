import { DataSource } from 'typeorm';
import { Dj } from '../entities/dj.entity';
import { DJ_REPOSITORY } from '../../config/constants/repositories.constant';

export const djProvider = [
  {
    provide: DJ_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Dj),
    inject: ['DATA_SOURCE'],
  },
];
