import { IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @ApiProperty({
    required: false,
    description: 'Minimum 1 and Maximum 100 will be accepted',
  })
  @IsOptional()
  @Max(100)
  @Min(1)
  @Type(() => Number)
  limit: number;

  @ApiProperty({
    required: false,
    description: 'Minimum 0 will be accepted',
  })
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  offset: number;
}
