import { ApiProperty } from '@nestjs/swagger';
import {
  ServiceCatalogue,
  ServiceGroupTypes,
} from '../../../shared/types/enums';

export class ServiceGroupRelatedObjectType {
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

export class ServiceGroupMemberType {
  @ApiProperty()
  relatedObject: ServiceGroupRelatedObjectType;

  @ApiProperty()
  relatedType: ServiceGroupTypes;
}

export class ServiceGroupResponseType extends ServiceGroupRelatedObjectType {
  @ApiProperty({ type: [ServiceGroupMemberType] })
  members: ServiceGroupMemberType[];
}
