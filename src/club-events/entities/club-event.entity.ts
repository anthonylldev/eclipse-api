import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Dj } from '../../djs/entities/dj.entity';

@Entity()
export class ClubEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 500, nullable: true })
  description: string;

  @Column()
  date: Date;

  @Column({ length: 2048, nullable: true })
  ticketsUrl: string;

  @Column({ length: 2048, nullable: true })
  imageUrl: string;

  @ManyToMany(() => Dj, (dj) => dj.clubEvents)
  @JoinTable()
  djs: Dj[];
}
