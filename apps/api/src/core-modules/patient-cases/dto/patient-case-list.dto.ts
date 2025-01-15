import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import {
  OpenClosedStatus,
  OrderSort,
} from '../../../shared/types/enums';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { PaginationDto } from '../../../shared/dtos/pagination.dto';
import { IsInDatabase } from '../../../shared/decorator/is-in-database.decorator';
import { User } from '../../all-entities';

export enum OrderBy {
  CREATED_AT = 'createdAt',
  DATE_OF_CASE = 'dateOfCase',
}

export class PatientCaseListQueryListingDto extends IntersectionType(
  PaginationDto,
) {
  @ApiProperty({
    description: 'Patient Case status, null if all status',
    enum: OpenClosedStatus,
    required: false,
  })
  @IsOptional()
  status: OpenClosedStatus;

  @ApiProperty({
    description: "Patient's User ID",
    example: '25135517-65e8-4742-ae12-72761b77655c',
  })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  @IsInDatabase(User)
  patient: string;

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
    default: OrderBy.DATE_OF_CASE,
  })
  @IsOptional()
  orderBy: OrderBy = OrderBy.DATE_OF_CASE;
}
