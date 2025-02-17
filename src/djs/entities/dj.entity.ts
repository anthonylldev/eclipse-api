import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SocialMedia } from '../../social-medias/entities/social-media.entity';
import { ClubEvent } from '../../club-events/entities/club-event.entity';

@Entity()
export class Dj {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 500, nullable: true })
  description: string;

  @Column({ length: 2048, nullable: true })
  imageUrl: string;

  @OneToMany(() => SocialMedia, (socialMedia) => socialMedia.dj, {
    cascade: ['insert', 'update'],
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
  })
  socialMedias: SocialMedia[];

  @ManyToMany(() => ClubEvent, (clubEvent) => clubEvent.djs)
  clubEvents: ClubEvent[];
}
