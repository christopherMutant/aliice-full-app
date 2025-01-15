import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { OrderSort } from '../../../shared/types/enums';
import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../../shared/dtos/pagination.dto';

export enum OrderBy {
  CODE = 'code',
}

export class ServiceGroupListQueryListingDto extends IntersectionType(
  PaginationDto,
) {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  search: string;

  @ApiProperty({
    required: false,
    enum: OrderSort,
    default: OrderSort.ASC,
  })
  @IsOptional()
  sort: OrderSort = OrderSort.ASC;

  @ApiProperty({
    required: false,
    enum: OrderBy,
    default: OrderBy.CODE,
  })
  @IsOptional()
  orderBy: OrderBy = OrderBy.CODE;
}
