import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { PaginationDto } from '../../../shared/dtos/pagination.dto';
import { IsOptional, IsString } from 'class-validator';

export class CategoryReferenceQueryListingDto extends IntersectionType(
  PaginationDto,
) {
  @ApiProperty({
    description: 'Search the name of the category',
    required: false,
  })
  @IsOptional()
  @IsString()
  search: string;
}
