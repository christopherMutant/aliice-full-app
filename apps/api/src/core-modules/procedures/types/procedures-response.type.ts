import { ApiProperty } from '@nestjs/swagger';
import { ServiceStatus } from '../../../shared/types/enums';

export class ProceduresResponseType {
  @ApiProperty()
  id: string;

  @ApiProperty({
    description: 'Status',
  })
  status: ServiceStatus;

  @ApiProperty({
    description: 'Date of the procedure',
    example: new Date(),
  })
  date: Date;

  @ApiProperty({
    description: 'Subject of the checkup',
    example: 'Consultation with Dr. Strange',
  })
  subject: string;
}
