import { ApiProperty } from '@nestjs/swagger';
import { MedicineBlockResponseType } from './medicine-block-response.type';

export class MedicineBlockType {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'Details of a Medicine Block',
  })
  data: MedicineBlockResponseType;
}
