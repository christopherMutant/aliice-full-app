import { ApiProperty } from '@nestjs/swagger';

export class PermissionResponseType {
  @ApiProperty({
    description: 'Key Identifier of permission',
    example: 'string',
  })
  key: string;

  @ApiProperty({
    description: 'Permission name',
    example: 'string',
  })
  name: string;
}
