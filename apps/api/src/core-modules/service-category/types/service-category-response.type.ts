import { ApiProperty } from '@nestjs/swagger';
import {
  ServiceCategoryRelationTypes,
  ServiceCatalogue,
} from '../../../shared/types/enums';

export class ServiceCategoryMemberResponseType {
  @ApiProperty()
  id: string;

  @ApiProperty()
  code: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  catalogue: ServiceCatalogue;

  @ApiProperty()
  info: string;

  @ApiProperty()
  relatedType: ServiceCategoryRelationTypes;
}

export class ServiceCategoryResponseType {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ type: [ServiceCategoryMemberResponseType] })
  members: ServiceCategoryMemberResponseType[];
}
