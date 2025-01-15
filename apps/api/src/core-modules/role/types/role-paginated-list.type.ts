import { ApiProperty } from '@nestjs/swagger';
import { PaginationType } from '../../../shared/types/pagination-type';
import { RefRoleResponseType } from './role-response.type';

export class RefRolePaginatedListType extends PaginationType<RefRoleResponseType> {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'List of roles',
    type: [RefRoleResponseType],
  })
  data: RefRoleResponseType[];
}
