import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDepartmentDto {
  @ApiProperty({
    description: 'Name of the Department',
    example: 'Surgery',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Description of the Department',
    example:
      'Surgical unit or facility is a place where surgeries are performed. It may also be a place where patients are cared for and treated before or after the surgery.',
  })
  @IsString()
  description: string;
}
