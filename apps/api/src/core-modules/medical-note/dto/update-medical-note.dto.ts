import { PartialType } from '@nestjs/swagger';
import { CreateMedicalNoteDto } from './create-medical-note.dto';

export class UpdateMedicalNoteDto extends PartialType(
  CreateMedicalNoteDto,
) {}
