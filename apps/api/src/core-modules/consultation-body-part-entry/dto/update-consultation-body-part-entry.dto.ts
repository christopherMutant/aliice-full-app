import { PartialType } from '@nestjs/swagger';
import { CreateConsultationBodyPartEntryDto } from './create-consultation-body-part-entry.dto';

export class UpdateConsultationBodyPartEntryDto extends PartialType(
  CreateConsultationBodyPartEntryDto,
) {}
