import { ApiProperty } from '@nestjs/swagger';
import { Medicine } from '../entities/medicine.entity';

export class MedicineType {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'Medicine Details',
    type: Medicine,
  })
  data: Medicine;
}
