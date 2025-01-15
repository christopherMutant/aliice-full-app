import { ApiProperty } from '@nestjs/swagger';
import { Medicine } from '../entities/medicine.entity';

export class MedicinesListType {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'List of Medicines',
    type: [Medicine],
  })
  data: Medicine[];
}
