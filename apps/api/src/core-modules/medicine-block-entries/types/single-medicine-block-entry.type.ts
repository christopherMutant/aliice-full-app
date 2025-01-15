import { ApiProperty } from '@nestjs/swagger';
import { MedicineBlockEntryResponseType } from './medicine-block-entry-response.type';

export class MedicineBlockEntryType {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'Details of a Medicine Block Entry',
  })
  data: MedicineBlockEntryResponseType;
}
