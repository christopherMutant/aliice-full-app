import { ApiProperty } from '@nestjs/swagger';
import { ConsultationTypeResponseType } from '../../consultation-type/types/consultation-type-response-type';

export class ConsultationTitleResponseType {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  type: ConsultationTypeResponseType;
}
