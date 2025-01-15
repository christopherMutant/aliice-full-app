import { ApiProperty } from '@nestjs/swagger';

export class DepartmentResponseType {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  createdAt: Date;
}
