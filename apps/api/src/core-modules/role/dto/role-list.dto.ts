import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { PaginationDto } from '../../../shared/dtos/pagination.dto';
import { IsOptional, IsString } from 'class-validator';
import { OrderSort } from '../../../shared/types/enums';

export enum OrderBy {
  NAME = 'name',
  CREATED_AT = 'createdAt',
}

export class RefRoleQueryListingDto extends IntersectionType(
  PaginationDto,
) {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  search: string;

  @ApiProperty({
    required: false,
    enum: OrderSort,
    default: OrderSort.DESC,
  })
  @IsOptional()
  sort: OrderSort = OrderSort.DESC;

  @ApiProperty({
    required: false,
    enum: OrderBy,
    default: OrderBy.CREATED_AT,
  })
  @IsOptional()
  orderBy: OrderBy = OrderBy.CREATED_AT;
}
