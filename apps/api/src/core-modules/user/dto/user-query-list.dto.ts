import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { PaginationDto } from '../../../shared/dtos/pagination.dto';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import { Transform } from 'class-transformer';
import { OrderSort } from '../../../shared/types/enums';

export enum OrderBy {
  CREATED_AT = 'createdAt',
  LAST_LOGIN = 'lastLoginTime',
}

export class UserQueryListingDto extends IntersectionType(
  PaginationDto,
) {
  @ApiProperty({ required: false })
  @IsOptional()
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsUUID()
  roleId: string;

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
