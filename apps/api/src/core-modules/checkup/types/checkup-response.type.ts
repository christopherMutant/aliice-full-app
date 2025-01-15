import { ApiProperty } from '@nestjs/swagger';
import {
  CheckUpTypes,
  ServiceStatus,
} from '../../../shared/types/enums';
import { UserNameResponseType } from '../../user/types/user-name-response';
import { InabilityResponseType } from '../../inability/types/inability-response.type';

export class CheckupResponseType {
  @ApiProperty()
  id: string;

  @ApiProperty({
    description: 'Checkup type',
  })
  type: CheckUpTypes;

  @ApiProperty({
    description: 'Status',
  })
  status: ServiceStatus;

  @ApiProperty({
    description: 'Date of the checkup',
    example: new Date(),
  })
  date: Date;

  @ApiProperty({
    description: 'Subject of the checkup',
    example: 'Consultation with Dr. Strange',
  })
  subject: string;

  @ApiProperty()
  patient: UserNameResponseType;

  @ApiProperty()
  doctor: UserNameResponseType;

  @ApiProperty()
  inability: InabilityResponseType;
}
