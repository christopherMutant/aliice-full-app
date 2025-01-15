import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCategoryOrganizationDto {
  @ApiProperty({
    description: 'Name of the organization category',
    example: 'Ass. military',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Description of the organization category',
    example: 'affiliated with the military',
  })
  @IsString()
  description: string;
}
