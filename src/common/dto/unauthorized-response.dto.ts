import { ApiProperty } from '@nestjs/swagger';
import { INVALID_CREDENTIALS_MESSAGE } from '../../config/constants/messages.const';

export class UnauthorizedResponseDto {
  @ApiProperty({
    description:
      'The status code of the response, specifying that the request was unauthorized (HTTP 401).',
    example: 401,
  })
  statusCode: number;

  @ApiProperty({
    description: 'The message of the response.',
    example: INVALID_CREDENTIALS_MESSAGE,
  })
  message: string;
}
