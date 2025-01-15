import { ApiProperty } from '@nestjs/swagger';
import { RefRole } from '../entities/role.entity';

export class RolesListType {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'List of Roles',
    type: [RefRole],
  })
  data: RefRole[];
}
