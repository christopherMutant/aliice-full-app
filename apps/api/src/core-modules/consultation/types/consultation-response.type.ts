import { ApiProperty } from '@nestjs/swagger';
import {
  ConsultationBodyResponseType,
  ConsultationUserType,
} from '../../consultation-body/types/consultation-body-part-types';

export class ConsultationResponseType {
  @ApiProperty()
  id: string;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  time: string;

  @ApiProperty()
  subject: string;

  @ApiProperty()
  patient: ConsultationUserType;

  @ApiProperty()
  doctor: ConsultationUserType;

  @ApiProperty({
    type: [ConsultationBodyResponseType],
    description: 'List of consultation bodies',
  })
  consultationBody?: ConsultationBodyResponseType[];
}
