import { PartialType } from '@nestjs/swagger';
import { CreatePatientCaseDto } from './create-patient-case.dto';

export class UpdatePatientCaseDto extends PartialType(
  CreatePatientCaseDto,
) {}
