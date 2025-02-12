import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SocialMediasService } from '../services/social-medias.service';
import { CreateSocialMediaDto } from '../dto/create-social-media.dto';
import { UpdateSocialMediaDto } from '../dto/update-social-media.dto';
import { SocialMediaDto } from '../dto/social-media.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { PassportJwtGuard } from '../../auth/guards/passport-jwt/passport-jwt.guard';
import { ExceptionResponseDto } from '../../common/dto/exception-response.dto';

@Controller('social-medias')
@ApiTags('Social medias')
export class SocialMediasController {
  constructor(private readonly socialMediasService: SocialMediasService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(PassportJwtGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create a new social media',
    description: 'This endpoint allows a user to create a new social media.',
  })
  @ApiBody({
    required: true,
    description: 'Social media details.',
    type: CreateSocialMediaDto,
  })
  @ApiCreatedResponse({
    description: 'Social media created successfully.',
    type: SocialMediaDto,
  })
  create(
    @Body() createSocialMediaDto: CreateSocialMediaDto,
  ): Promise<SocialMediaDto> {
    return this.socialMediasService.create(createSocialMediaDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Retrieve all social medias',
    description:
      'This endpoint retrieves a list of all social medias in the system.',
  })
  @ApiOkResponse({
    description: 'List of all social medias retrieved successfully.',
    type: SocialMediaDto,
  })
  findAll(): Promise<SocialMediaDto[]> {
    return this.socialMediasService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    description: 'Retrieve a social media',
    summary: 'Retrieve a social media',
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the social media to find.',
    required: true,
    type: Number,
  })
  @ApiOkResponse({
    description: 'Social media found successfully.',
    type: SocialMediaDto,
  })
  @ApiNotFoundResponse({
    description: 'Social media not found.',
    type: ExceptionResponseDto,
    example: {
      statusCode: HttpStatus.NOT_FOUND,
      message: 'Social media not found',
    },
  })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<SocialMediaDto> {
    return this.socialMediasService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(PassportJwtGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update a social media',
    description:
      'This endpoint allows a user to update an existing social media.',
  })
  @ApiBody({
    required: true,
    description: 'Social media details.',
    type: UpdateSocialMediaDto,
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the social media to update.',
    required: true,
    type: Number,
  })
  @ApiOkResponse({
    description: 'Social media updated successfully.',
    type: SocialMediaDto,
  })
  @ApiNotFoundResponse({
    description: 'Social media not found.',
    type: ExceptionResponseDto,
    example: {
      statusCode: HttpStatus.NOT_FOUND,
      message: 'Social media not found',
    },
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSocialMediaDto: UpdateSocialMediaDto,
  ): Promise<SocialMediaDto> {
    return this.socialMediasService.update(id, updateSocialMediaDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(PassportJwtGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete a social media',
    description:
      'This endpoint allows a user to delete an existing social media.',
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the social media to update.',
    required: true,
    type: Number,
  })
  @ApiNoContentResponse({
    description: 'Social media deleted successfully.',
  })
  @ApiNotFoundResponse({
    description: 'Social media not found.',
    type: ExceptionResponseDto,
    example: {
      statusCode: HttpStatus.NOT_FOUND,
      message: 'Social media not found',
    },
  })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.socialMediasService.remove(id);
  }
}
