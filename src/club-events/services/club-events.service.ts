import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateClubEventDto } from '../dto/create-club-event.dto';
import { ClubEvent } from '../entities/club-event.entity';
import { ClubEventDto } from '../dto/club-event.dto';
import { plainToInstance } from 'class-transformer';
import {
  CLUB_EVENT_REPOSITORY,
  DJ_REPOSITORY,
} from '../../config/constants/repositories.constant';
import { In, Repository } from 'typeorm';
import { BasicToListDto } from '../../common/dto/basic-to-list.dto';
import { UpdateClubEventDto } from '../dto/update-club-event.dto';
import { Dj } from '../../djs/entities/dj.entity';
import { DjDto } from '../../djs/dto/dj.dto';

@Injectable()
export class ClubEventsService {
  constructor(
    @Inject(CLUB_EVENT_REPOSITORY)
    private clubEventRepository: Repository<ClubEvent>,
    @Inject(DJ_REPOSITORY)
    private djRepository: Repository<Dj>,
  ) {}

  async create(createClubEventDto: CreateClubEventDto): Promise<ClubEventDto> {
    const newClubEvent = plainToInstance(ClubEvent, createClubEventDto);

    if (createClubEventDto.djs && createClubEventDto.djs.length > 0) {
      newClubEvent.djs = await this.validateAndFetchDjs(createClubEventDto.djs);
    }

    const savedClubEvent = await this.clubEventRepository.save(newClubEvent);

    return plainToInstance(ClubEventDto, savedClubEvent);
  }

  private async validateAndFetchDjs(djsDto: DjDto[]) {
    const ids = djsDto.map((dj) => dj.id);

    const djs = await this.djRepository.find({
      where: { id: In(ids) },
    });

    if (djs.length !== djsDto.length) {
      throw new NotFoundException(
        `Not all DJs with IDs [${ids.join(', ')}] were found`,
      );
    }
    return djs;
  }

  async findAll(): Promise<BasicToListDto[]> {
    const clubEvents = await this.clubEventRepository.find();

    return clubEvents.map((clubEvent) =>
      plainToInstance(BasicToListDto, clubEvent),
    );
  }

  async findOne(id: number): Promise<ClubEventDto> {
    const clubEvent = await this.clubEventRepository.findOne({
      where: { id },
      relations: ['djs'],
    });

    if (!clubEvent) {
      throw new NotFoundException(`Club event with ID ${id} not found`);
    }

    return plainToInstance(ClubEventDto, clubEvent, {
      enableImplicitConversion: true,
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

    if (updateClubEventDto.djs && updateClubEventDto.djs.length > 0) {
      updateClubEventDto.djs = await this.validateAndFetchDjs(
        updateClubEventDto.djs,
      );
    }

    const updatedClubEvent = this.clubEventRepository.merge(
      clubEvent,
      updateClubEventDto,
    );

    const savedClubEvent =
      await this.clubEventRepository.save(updatedClubEvent);

    return plainToInstance(ClubEventDto, savedClubEvent);
  }

  async remove(id: number): Promise<void> {
    const deletedClubEvent = await this.clubEventRepository.delete(id);

    if (deletedClubEvent.affected === 0) {
      throw new NotFoundException(`Club event with ID ${id} not found`);
    }
  }
}
