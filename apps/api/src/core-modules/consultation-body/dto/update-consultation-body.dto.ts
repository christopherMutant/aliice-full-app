import { PartialType } from '@nestjs/swagger';
import { CreateTextConsultationDto } from './create-text-consultation.dto';

export class UpdateConsultationBodyDto extends PartialType(
  CreateTextConsultationDto,
) {}
