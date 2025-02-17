import { ApiProperty } from '@nestjs/swagger';

export class ExceptionResponseDto {
  @ApiProperty({
    description:
      'The status code of the response, specifying that the request was unauthorized (HTTP 401).',
  })
  statusCode: number;

  @ApiProperty({
    description: 'The message of the response.',
  })
  message: string;
}
