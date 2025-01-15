import { ApiProperty } from '@nestjs/swagger';
import { PatientCaseResponseType } from './patient-case-response-type';
import { PatientCase } from '../entities/patient-case.entity';

export class PatientCaseType {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'Details of Patient Case',
    type: PatientCase,
  })
  data: PatientCase;
}
