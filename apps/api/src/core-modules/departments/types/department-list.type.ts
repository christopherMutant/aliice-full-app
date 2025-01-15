import { ApiProperty } from '@nestjs/swagger';
import { DepartmentResponseType } from './department-response.type';

export class DepartmentListType {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'List of departments',
    type: [DepartmentResponseType],
  })
  data: DepartmentResponseType[];
}
