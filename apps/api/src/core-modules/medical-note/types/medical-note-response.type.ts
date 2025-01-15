import { ApiProperty } from '@nestjs/swagger';
import { UserNameResponseType } from '../../user/types/user-name-response';

export class MedicalNoteChildResponseType {
  @ApiProperty()
  id: string;

  @ApiProperty()
  value: string;
}

export class MedicalNoteResponseType {
  @ApiProperty()
  id: string;

  @ApiProperty()
  automaticallyDisplayWindow: boolean;

  @ApiProperty()
  ap: MedicalNoteChildResponseType;

  @ApiProperty()
  of: MedicalNoteChildResponseType;

  @ApiProperty()
  notes: MedicalNoteChildResponseType;

  @ApiProperty()
  patient: UserNameResponseType;
}
