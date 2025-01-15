import { ApiProperty } from '@nestjs/swagger';
import { MedicalNoteResponseType } from './medical-note-response.type';

export class MedicalNoteType {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'Details of a Medical Note',
    type: MedicalNoteResponseType,
  })
  data: MedicalNoteResponseType;
}
