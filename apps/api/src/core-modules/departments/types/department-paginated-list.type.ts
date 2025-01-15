import { ApiProperty } from '@nestjs/swagger';
import { DepartmentResponseType } from './department-response.type';
import { PaginationType } from '../../../shared/types/pagination-type';

export class DepartmentPaginatedListType extends PaginationType<DepartmentResponseType> {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'List of departments',
    type: [DepartmentResponseType],
  })
  data: DepartmentResponseType[];
}
