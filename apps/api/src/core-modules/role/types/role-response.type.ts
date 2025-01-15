import { ApiProperty } from '@nestjs/swagger';

export class RefRoleResponseType {
  @ApiProperty({
    description: 'Key Identifier of role',
    example: 'string',
  })
  key: string;

  @ApiProperty({
    description: 'Role name',
    example: 'string',
  })
  name: string;

  @ApiProperty({
    description: 'JSON object defining the permissions for the role',
    example: [],
  })
  permissions: string[];
}
