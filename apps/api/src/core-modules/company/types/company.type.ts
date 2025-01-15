import { ApiProperty } from '@nestjs/swagger';
import { Company } from '../entities/company.entity';

export class CompanyType {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'Company Details',
    type: Company,
  })
  data: Company;
}
