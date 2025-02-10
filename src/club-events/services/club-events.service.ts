import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClubEventDto } from '../dto/create-club-event.dto';
import { UpdateClubEventDto } from '../dto/update-club-event.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ClubEvent } from '../entities/club-event.entity';
import { Model } from 'mongoose';
import { ClubEventDto } from '../dto/club-event.dto';

@Injectable()
export class ClubEventsService {
  constructor(
    @InjectModel('ClubEvent')
    private readonly clubEventModel: Model<ClubEvent>,
  ) {}

  create(createClubEventDto: CreateClubEventDto): Promise<ClubEventDto> {
    const newClubEvent = new this.clubEventModel(createClubEventDto);
    return newClubEvent.save();
  }

  findAll(): Promise<ClubEventDto[]> {
    return this.clubEventModel.find().exec();
  }

  async findOne(id: string): Promise<ClubEventDto> {
    const clubEvent = await this.clubEventModel.findOne({ _id: id }).exec();

    if (!clubEvent) {
      throw new NotFoundException(`Club event with ID ${id} not found`);
    }

    return clubEvent;
  }

  async update(
    id: string,
    updateClubEventDto: UpdateClubEventDto,
  ): Promise<ClubEventDto> {
    const updatedClubEvent = await this.clubEventModel
      .findByIdAndUpdate(id, updateClubEventDto, { new: true })
      .exec();

    if (!updatedClubEvent) {
      throw new NotFoundException(`Club event with ID ${id} not found`);
    }

    return updatedClubEvent;
  }

  async remove(id: string): Promise<void> {
    const deletedClubEvent = await this.clubEventModel
      .findByIdAndDelete(id)
      .exec();

    if (!deletedClubEvent) {
      throw new NotFoundException(`Club event with ID ${id} not found`);
    }
  }
}
