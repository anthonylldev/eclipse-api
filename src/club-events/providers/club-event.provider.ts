import { DataSource } from 'typeorm';
import { CLUB_EVENT_REPOSITORY } from '../../config/constants/repositories.constant';
import { ClubEvent } from '../entities/club-event.entity';

export const clubEventProvider = [
  {
    provide: CLUB_EVENT_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(ClubEvent),
    inject: ['DATA_SOURCE'],
  },
];
