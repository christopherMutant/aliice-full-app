import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCategoryReferenceDto {
  @ApiProperty({
    description: 'Name for the category reference',
    example: 'Supplementary insurance',
  })
  @IsString()
  name: string;
}
