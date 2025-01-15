import { ApiProperty } from '@nestjs/swagger';
import { LaboratoryRequestResponseType } from './laboratory-request-response.type';

export class LaboratoryRequestType {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'Details of Laboratory Request',
  })
  data: LaboratoryRequestResponseType;
}
