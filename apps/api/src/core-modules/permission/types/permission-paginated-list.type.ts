import { ApiProperty } from '@nestjs/swagger';
import { PaginationType } from '../../../shared/types/pagination-type';
import { PermissionResponseType } from './permission-response.type';

export class PermissionPaginatedListType extends PaginationType<PermissionResponseType> {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'List of permissions',
    type: [PermissionResponseType],
  })
  data: PermissionResponseType[];
}
