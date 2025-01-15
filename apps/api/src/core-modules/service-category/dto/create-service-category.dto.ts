import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateServiceCategoryDto {
  @ApiProperty({
    description: 'Name of the service category',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description:
      'Array of service, service block, and service group IDs',
  })
  @Transform(({ value }) =>
    Array.isArray(value) ? value : Array(value),
  )
  @IsArray()
  @IsUUID('all', { each: true })
  @IsOptional()
  members: string[];
}
