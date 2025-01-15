import { ApiProperty } from '@nestjs/swagger';
import { VatTypes } from '../../../shared/types/enums';
import { ServiceInListResponseType } from './service-in-list-response.type';

export class ServiceResponseType extends ServiceInListResponseType {
  @ApiProperty({
    description: 'Reference service',
  })
  referenceService: boolean;

  @ApiProperty({
    description: 'Side of the service',
  })
  side: string;

  @ApiProperty({
    description: 'Point value of the service',
  })
  pointValue: number;

  @ApiProperty({
    description: 'Vat type of the service',
  })
  vat: VatTypes;

  @ApiProperty({
    description: 'pce of the service',
  })
  pce: string;

  @ApiProperty({
    description: 'Information of the service',
  })
  info: string;
}
