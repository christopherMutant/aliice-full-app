import { PartialType } from '@nestjs/swagger';
import { CreateConsultationDocumentFormatDto } from './create-consultation-document-format.dto';

export class UpdateConsultationDocumentFormatDto extends PartialType(
  CreateConsultationDocumentFormatDto,
) {}
