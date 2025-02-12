import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSocialMediaDto } from '../dto/create-social-media.dto';
import { UpdateSocialMediaDto } from '../dto/update-social-media.dto';
import { SocialMedia } from '../entities/social-media.entity';
import { SocialMediaDto } from '../dto/social-media.dto';
import { plainToInstance } from 'class-transformer';
import { SOCIAL_MEDIA_REPOSITORY } from '../../config/constants/repositories.constant';
import { Repository } from 'typeorm';

@Injectable()
export class SocialMediasService {
  constructor(
    @Inject(SOCIAL_MEDIA_REPOSITORY)
    private socialMediaRepository: Repository<SocialMedia>,
  ) {}

  async create(
    createSocialMediaDto: CreateSocialMediaDto,
  ): Promise<SocialMediaDto> {
    const newSocialMedia = plainToInstance(SocialMedia, createSocialMediaDto);
    const savedSocialMedia =
      await this.socialMediaRepository.save(newSocialMedia);

    return plainToInstance(SocialMediaDto, savedSocialMedia, {
      excludeExtraneousValues: true,
    });
  }

  async findAll(): Promise<SocialMediaDto[]> {
    const socialMedias = await this.socialMediaRepository.find();

    return socialMedias.map((socialMedia) =>
      plainToInstance(SocialMediaDto, socialMedia, {
        excludeExtraneousValues: true,
      }),
    );
  }

  async findOne(id: number): Promise<SocialMediaDto> {
    const socialMedia = await this.socialMediaRepository.findOneBy({ id });

    if (!socialMedia) {
      throw new NotFoundException(`Social media with ID ${id} not found`);
    }

    return plainToInstance(SocialMediaDto, socialMedia, {
      excludeExtraneousValues: true,
    });
  }

  async update(
    id: number,
    updateSocialMediaDto: UpdateSocialMediaDto,
  ): Promise<SocialMediaDto> {
    const socialMedia = await this.socialMediaRepository.findOneBy({ id });

    if (!socialMedia) {
      throw new NotFoundException(`Social media with ID ${id} not found`);
    }

    const updatedSocialMedia = this.socialMediaRepository.merge(
      socialMedia,
      updateSocialMediaDto,
    );

    const savedSocialMedia =
      await this.socialMediaRepository.save(updatedSocialMedia);

    return plainToInstance(SocialMediaDto, savedSocialMedia, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: number): Promise<void> {
    const deletedSocialMedia = await this.socialMediaRepository.delete(id);

    if (deletedSocialMedia.affected === 0) {
      throw new NotFoundException(`Social media with ID ${id} not found`);
    }
  }
}
