import { ApiProperty } from '@nestjs/swagger';
import { MedicalNoteHistoryResponseType } from './medical-note-history-response.type';

export class MedicalNoteHistoryListType {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'List of a Medical Note History',
    type: [MedicalNoteHistoryResponseType],
  })
  data: MedicalNoteHistoryResponseType[];
}
