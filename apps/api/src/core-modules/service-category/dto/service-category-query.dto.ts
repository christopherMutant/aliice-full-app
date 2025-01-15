import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { PaginationDto } from '../../../shared/dtos/pagination.dto';
import { OrderSort } from '../../../shared/types/enums';
import { IsOptional, IsString } from 'class-validator';

export enum OrderBy {
  CODE = 'code',
}

export class ServiceCategoryQueryListingDto extends IntersectionType(
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
