import { ApiProperty } from '@nestjs/swagger';
import { ServiceCatalogue } from '../../../shared/types/enums';

export class ServiceBlockInListResponseType {
  @ApiProperty()
  id: string;

  @ApiProperty({
    description: 'Code of the service block',
  })
  code: string;

  @ApiProperty({
    description: 'Description of the service block',
  })
  description: string;

  @ApiProperty({
    description: 'Information of the service block',
  })
  info: string;

  @ApiProperty({
    description: 'Service catalogue of the service block',
  })
  catalogue: ServiceCatalogue;

  @ApiProperty({
    description: 'pce of the servic block',
  })
  pce: string;
}
