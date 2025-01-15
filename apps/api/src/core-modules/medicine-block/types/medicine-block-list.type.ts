import { ApiProperty } from '@nestjs/swagger';
import { MedicineBlockListResponseType } from './medicine-block-response.type';

export class MedicineBlockListType {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'List of a Medicine Blocks',
    type: [MedicineBlockListResponseType],
  })
  data: MedicineBlockListResponseType[];
}
