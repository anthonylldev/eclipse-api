import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ClubEventsService } from '../services/club-events.service';
import { CreateClubEventDto } from '../dto/create-club-event.dto';
import { UpdateClubEventDto } from '../dto/update-club-event.dto';
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
import { ClubEventDto } from '../dto/club-event.dto';
import { ExceptionResponseDto } from '../../common/dto/exception-response.dto';

@Controller('club-events')
@ApiTags('Club events')
export class ClubEventsController {
  constructor(private readonly clubEventsService: ClubEventsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(PassportJwtGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create a new club event',
    description:
      'This endpoint allows a user to create a new club event. Requires JWT authentication.',
  })
  @ApiBody({
    required: true,
    description: 'Club event details.',
    type: CreateClubEventDto,
  })
  @ApiCreatedResponse({
    description: 'Club event created successfully.',
    type: ClubEventDto,
  })
  create(
    @Body() createClubEventDto: CreateClubEventDto,
  ): Promise<ClubEventDto> {
    return this.clubEventsService.create(createClubEventDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Retrieve all club events',
    description: 'This endpoint retrieves a list of all club events.',
  })
  @ApiOkResponse({
    description: 'List of all club events retrieved successfully.',
    type: ClubEventDto,
  })
  findAll(): Promise<ClubEventDto[]> {
    return this.clubEventsService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    description: 'Retrieve a club event',
    summary: 'Retrieve a club event',
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the club event to find.',
    required: true,
    type: String,
  })
  @ApiOkResponse({
    description: 'Club event found successfully.',
    type: ClubEventDto,
  })
  @ApiNotFoundResponse({
    description: 'Club event not found.',
    type: ExceptionResponseDto,
    example: {
      statusCode: HttpStatus.NOT_FOUND,
      message: 'Club event not found',
    },
  })
  findOne(@Param('id') id: string): Promise<ClubEventDto> {
    return this.clubEventsService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(PassportJwtGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update a club event',
    description:
      'This endpoint allows a user to update an existing club event. Requires JWT authentication.',
  })
  @ApiBody({
    required: true,
    description: 'Club event details.',
    type: UpdateClubEventDto,
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the club event to update.',
    required: true,
    type: String,
  })
  @ApiOkResponse({
    description: 'Club event updated successfully.',
    type: ClubEventDto,
  })
  @ApiNotFoundResponse({
    description: 'Club event not found.',
    type: ExceptionResponseDto,
    example: {
      statusCode: HttpStatus.NOT_FOUND,
      message: 'Club event not found',
    },
  })
  update(
    @Param('id') id: string,
    @Body() updateClubEventDto: UpdateClubEventDto,
  ): Promise<ClubEventDto> {
    return this.clubEventsService.update(id, updateClubEventDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(PassportJwtGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete a club event',
    description:
      'This endpoint allows a user to delete an existing club event. Requires JWT authentication.',
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the club event to update.',
    required: true,
    type: String,
  })
  @ApiNoContentResponse({
    description: 'Club event deleted successfully.',
  })
  @ApiNotFoundResponse({
    description: 'Club event not found.',
    type: ExceptionResponseDto,
    example: {
      statusCode: HttpStatus.NOT_FOUND,
      message: 'Club event not found',
    },
  })
  remove(@Param('id') id: string): Promise<void> {
    return this.clubEventsService.remove(id);
  }
}
