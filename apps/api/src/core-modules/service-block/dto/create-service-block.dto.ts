import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateServiceBlockDto {
  @ApiProperty({
    description: 'Code of the service block',
  })
  @IsString()
  code: string;

  @ApiProperty({
    description: 'Description of the service block',
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ description: 'Array of service IDs' })
  @Transform(({ value }) =>
    Array.isArray(value) ? value : Array(value),
  )
  @IsArray()
  @IsUUID('all', { each: true })
  @IsOptional()
  services: string[];

  @ApiProperty({
    description: 'pce of the service block',
  })
  @IsString()
  @IsOptional()
  pce: string;

  @ApiProperty({
    description: 'Information of the service block',
  })
  @IsOptional()
  @IsString()
  info: string;
}
