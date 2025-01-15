import { PartialType } from '@nestjs/swagger';
import { CreateConsultationTitleDto } from './create-consultation_title.dto';

export class UpdateConsultationTitleDto extends PartialType(
  CreateConsultationTitleDto,
) {}
