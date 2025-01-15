import { ApiProperty } from '@nestjs/swagger';
import { BankDetails } from '../entities/bank-detail.entity';

export class BankdetailsType {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'Bank Details',
    type: BankDetails,
  })
  data: BankDetails;
}
