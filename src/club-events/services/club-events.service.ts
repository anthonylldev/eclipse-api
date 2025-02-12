import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateClubEventDto } from '../dto/create-club-event.dto';
import { UpdateClubEventDto } from '../dto/update-club-event.dto';
import { ClubEvent } from '../entities/club-event.entity';
import { ClubEventDto } from '../dto/club-event.dto';
import { plainToInstance } from 'class-transformer';
import { CLUB_EVENT_REPOSITORY } from '../../config/constants/repositories.constant';
import { Repository } from 'typeorm';

@Injectable()
export class ClubEventsService {
  constructor(
    @Inject(CLUB_EVENT_REPOSITORY)
    private clubEventRepository: Repository<ClubEvent>,
  ) {}

  async create(createClubEventDto: CreateClubEventDto): Promise<ClubEventDto> {
    const newClubEvent = plainToInstance(ClubEvent, createClubEventDto);
    const savedClubEvent = await this.clubEventRepository.save(newClubEvent);

    return plainToInstance(ClubEventDto, savedClubEvent, {
      excludeExtraneousValues: true,
    });
  }

  async findAll(): Promise<ClubEventDto[]> {
    const clubEvents = await this.clubEventRepository.find();

    return clubEvents.map((clubEvent) =>
      plainToInstance(ClubEventDto, clubEvent, {
        excludeExtraneousValues: true,
      }),
    );
  }

  async findOne(id: number): Promise<ClubEventDto> {
    const clubEvent = await this.clubEventRepository.findOneBy({ id });

    if (!clubEvent) {
      throw new NotFoundException(`Club event with ID ${id} not found`);
    }

    return plainToInstance(ClubEventDto, clubEvent, {
      excludeExtraneousValues: true,
    });
  }

  async update(
    id: number,
    updateClubEventDto: UpdateClubEventDto,
  ): Promise<ClubEventDto> {
    const clubEvent = await this.clubEventRepository.findOneBy({ id });

    if (!clubEvent) {
      throw new NotFoundException(`Club event with ID ${id} not found`);
    }

    const updatedClubEvent = this.clubEventRepository.merge(
      clubEvent,
      updateClubEventDto,
    );

    const savedClubEvent =
      await this.clubEventRepository.save(updatedClubEvent);

    return plainToInstance(ClubEventDto, savedClubEvent, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: number): Promise<void> {
    const deletedClubEvent = await this.clubEventRepository.delete(id);

    if (deletedClubEvent.affected === 0) {
      throw new NotFoundException(`Club event with ID ${id} not found`);
    }
  }
}
