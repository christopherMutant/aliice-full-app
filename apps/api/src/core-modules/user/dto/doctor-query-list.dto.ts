import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { PaginationDto } from '../../../shared/dtos/pagination.dto';
import { IsOptional, IsString } from 'class-validator';

export class DoctorQueryListingDto extends IntersectionType(
  PaginationDto,
) {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  search: string;
}
