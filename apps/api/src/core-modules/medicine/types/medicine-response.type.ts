import { ApiProperty } from '@nestjs/swagger';

export class MedicineResponseType {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;
}
