import { SocialMediaType } from '../enums/social-media-type.enum';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Dj } from '../../djs/entities/dj.entity';

@Entity()
export class SocialMedia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ enum: SocialMediaType })
  type: SocialMediaType;

  @Column({ length: 2048 })
  url: string;

  @ManyToOne(() => Dj, (dj) => dj.socialMedias, { onDelete: 'CASCADE' })
  @JoinColumn()
  dj: Dj;
}
