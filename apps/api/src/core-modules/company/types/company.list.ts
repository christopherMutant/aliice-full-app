import { ApiProperty } from '@nestjs/swagger';
import { PaginationType } from '../../../shared/types/pagination-type';
import { Company } from '../entities/company.entity';

export class PaginatedCompany extends PaginationType<Company> {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'List of compnay',
    type: [Company],
  })
  data: Company[];
}
