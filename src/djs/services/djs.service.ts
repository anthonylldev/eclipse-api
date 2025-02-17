import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDjDto } from '../dto/create-dj.dto';
import { UpdateDjDto } from '../dto/update-dj.dto';
import { Dj } from '../entities/dj.entity';
import { DjDto } from '../dto/dj.dto';
import { plainToInstance } from 'class-transformer';
import { DJ_REPOSITORY } from '../../config/constants/repositories.constant';
import { Repository } from 'typeorm';
import { EntityListDto } from '../../common/dto/entity-list.dto';

@Injectable()
export class DjsService {
  constructor(@Inject(DJ_REPOSITORY) private djRepository: Repository<Dj>) {}

  async create(createDjDto: CreateDjDto): Promise<DjDto> {
    const newDj = plainToInstance(Dj, createDjDto);
    const savedDj = await this.djRepository.save(newDj);

    return plainToInstance(DjDto, savedDj, {
      excludeExtraneousValues: true,
    });
  }

  async findAll(): Promise<EntityListDto[]> {
    const djs = await this.djRepository.find();

    return djs.map((dj) =>
      plainToInstance(EntityListDto, dj, {
        excludeExtraneousValues: true,
      }),
    );
  }

  async findOne(id: number): Promise<DjDto> {
    const dj = await this.djRepository.findOne({
      where: { id },
      relations: ['socialMedias'],
    });

    if (!dj) {
      throw new NotFoundException(`Dj with ID "${id}" not found`);
    }

    return plainToInstance(DjDto, dj, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    });
  }

  async update(id: number, updateDjDto: UpdateDjDto): Promise<DjDto> {
    const dj = await this.djRepository.findOneBy({ id });

    if (!dj) {
      throw new NotFoundException(`Club event with ID ${id} not found`);
    }

    const updatedDj = this.djRepository.merge(dj, updateDjDto);

    const savedDj = await this.djRepository.save(updatedDj);

    return plainToInstance(DjDto, savedDj, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: number): Promise<void> {
    const deletedDj = await this.djRepository.delete(id);

    if (deletedDj.affected === 0) {
      throw new NotFoundException(`Dj with ID "${id}" not found`);
    }
  }
}
