import { ApiProperty } from '@nestjs/swagger';
import { LawCategories } from '../../../shared/types/enums';
import { PaginationType } from '../../../shared/types/pagination-type';

export class PatientCaseListResponseType {
  @ApiProperty()
  id: string;

  @ApiProperty()
  caseNo: string;

  @ApiProperty()
  dateOfCase: Date;

  @ApiProperty()
  concerned: string;

  @ApiProperty()
  law: LawCategories;

  @ApiProperty()
  externalCaseNumber: string;
}

export class PatientCaseListType extends PaginationType<PatientCaseListResponseType> {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'Details of Patient Case',
    type: [PatientCaseListResponseType],
  })
  data: PatientCaseListResponseType[];
}
