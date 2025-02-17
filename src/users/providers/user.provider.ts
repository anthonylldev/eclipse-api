import { User } from '../entities/user.entity';
import { DataSource } from 'typeorm';
import { USER_REPOSITORY } from '../../config/constants/repositories.constant';

export const userProvider = [
  {
    provide: USER_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
];
