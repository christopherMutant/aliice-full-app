import { ApiProperty } from '@nestjs/swagger';
import { BankDetails } from '../entities/bank-detail.entity';

export class BankDetailsListType {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'List of Bank details',
    type: BankDetails,
  })
  data: BankDetails[];
}
