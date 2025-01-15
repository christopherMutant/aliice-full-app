import { ApiProperty } from '@nestjs/swagger';
import { ConsultationMedicineEntryType } from '../../consultation-body-part-entry/types/consultation-body-part-entry-types';

export class MedicineBlockListResponseType {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;
}

export class MedicineBlockResponseType extends MedicineBlockListResponseType {
  @ApiProperty()
  entries: ConsultationMedicineEntryType[];
}
