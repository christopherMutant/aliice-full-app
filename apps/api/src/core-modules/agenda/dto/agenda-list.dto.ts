import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class AgendaQueryListingDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  search: string;
}
