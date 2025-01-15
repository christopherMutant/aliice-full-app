import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CountryQueryDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  search: string;
}
