import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CityQueryDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  search: string;
}
