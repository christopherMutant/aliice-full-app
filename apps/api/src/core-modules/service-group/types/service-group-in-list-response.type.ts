import { ApiProperty } from '@nestjs/swagger';
import { ServiceCatalogue } from '../../../shared/types/enums';

export class ServiceGroupInListResponseType {
  @ApiProperty()
  id: string;

  @ApiProperty()
  code: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  info: string;

  @ApiProperty()
  catalogue: ServiceCatalogue;
}
