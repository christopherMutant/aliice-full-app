import { ApiProperty } from '@nestjs/swagger';

export class MedicineNameType {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;
}
