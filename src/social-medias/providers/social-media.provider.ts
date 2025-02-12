import { DataSource } from 'typeorm';
import { SOCIAL_MEDIA_REPOSITORY } from '../../config/constants/repositories.constant';
import { SocialMedia } from '../entities/social-media.entity';

export const socialMediaProvider = [
  {
    provide: SOCIAL_MEDIA_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(SocialMedia),
    inject: ['DATA_SOURCE'],
  },
];
