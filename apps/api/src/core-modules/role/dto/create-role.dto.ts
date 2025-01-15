import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({
    description: 'Role name',
    example: 'string',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'JSON object defining the permissions for the role',
    example: [],
  })
  @IsArray()
  permissions: string[];
}
