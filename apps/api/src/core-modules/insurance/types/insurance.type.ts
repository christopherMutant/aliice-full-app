import { ApiProperty } from '@nestjs/swagger';
import { Insurance } from '../entities/insurance.entity';

export class InsuranceType {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'Insurance Details',
    type: Insurance,
  })
  data: Insurance;
}
