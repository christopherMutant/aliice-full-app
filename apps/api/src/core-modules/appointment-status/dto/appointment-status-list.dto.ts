import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../../shared/dtos/pagination.dto';

export class AppointmentStatusQueryListingDto extends IntersectionType(
  PaginationDto,
) {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  search: string;
}
