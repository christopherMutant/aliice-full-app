import { ApiProperty } from '@nestjs/swagger';
import { DepartmentResponseType } from './department-response.type';

export class DepartmentType {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'Details of Department',
    type: DepartmentResponseType,
  })
  data: DepartmentResponseType;
}
