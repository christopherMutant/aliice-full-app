import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCategoryPersonDto {
  @ApiProperty({
    description: 'The name of the category',
    example: 'Supplier',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'details about the category',
    example: 'handle supplies',
  })
  @IsString()
  description: string;
}
