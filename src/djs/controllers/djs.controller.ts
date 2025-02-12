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
import { DjsService } from '../services/djs.service';
import { CreateDjDto } from '../dto/create-dj.dto';
import { UpdateDjDto } from '../dto/update-dj.dto';
import { DjDto } from '../dto/dj.dto';
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

@Controller('djs')
@ApiTags('Djs')
export class DjsController {
  constructor(private readonly djsService: DjsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(PassportJwtGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create a new dj',
    description: 'This endpoint allows a user to create a new dj.',
  })
  @ApiBody({
    required: true,
    description: 'Dj details.',
    type: CreateDjDto,
  })
  @ApiCreatedResponse({
    description: 'Dj created successfully.',
    type: DjDto,
  })
  create(@Body() createDjDto: CreateDjDto): Promise<DjDto> {
    return this.djsService.create(createDjDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Retrieve all djs',
    description: 'This endpoint retrieves a list of all djs.',
  })
  @ApiOkResponse({
    description: 'List of all djs retrieved successfully.',
    type: DjDto,
  })
  findAll(): Promise<DjDto[]> {
    return this.djsService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    description: 'Retrieve a dj',
    summary: 'Retrieve a dj',
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the dj to find.',
    required: true,
    type: Number,
  })
  @ApiOkResponse({
    description: 'Dj found successfully.',
    type: DjDto,
  })
  @ApiNotFoundResponse({
    description: 'Dj not found.',
    type: ExceptionResponseDto,
    example: {
      statusCode: HttpStatus.NOT_FOUND,
      message: 'Dj not found',
    },
  })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<DjDto> {
    return this.djsService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(PassportJwtGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update a dj',
    description: 'This endpoint allows a user to update an existing dj.',
  })
  @ApiBody({
    required: true,
    description: 'Dj details.',
    type: UpdateDjDto,
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the dj to update.',
    required: true,
    type: Number,
  })
  @ApiOkResponse({
    description: 'Dj updated successfully.',
    type: DjDto,
  })
  @ApiNotFoundResponse({
    description: 'Dj not found.',
    type: ExceptionResponseDto,
    example: {
      statusCode: HttpStatus.NOT_FOUND,
      message: 'Dj not found',
    },
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDjDto: UpdateDjDto,
  ): Promise<DjDto> {
    return this.djsService.update(id, updateDjDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(PassportJwtGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete a dj',
    description: 'This endpoint allows a user to delete an existing dj.',
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the dj to update.',
    required: true,
    type: Number,
  })
  @ApiNoContentResponse({
    description: 'Dj deleted successfully.',
  })
  @ApiNotFoundResponse({
    description: 'Dj not found.',
    type: ExceptionResponseDto,
    example: {
      statusCode: HttpStatus.NOT_FOUND,
      message: 'Dj not found',
    },
  })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.djsService.remove(id);
  }
}
