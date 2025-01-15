import { ApiProperty } from '@nestjs/swagger';
import { UserNameResponseType } from '../../user/types/user-name-response';

export class MedicalNoteHistoryResponseType {
  @ApiProperty()
  id: string;

  @ApiProperty()
  modifiedBy: Date;

  @ApiProperty()
  modifiedFrom: UserNameResponseType;

  @ApiProperty()
  value: string;
}
