import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ServiceCatalogue } from '../../../shared/types/enums';
import { Transform } from 'class-transformer';

export class CreateServiceGroupDto {
  @ApiProperty({
    description: 'Code of the service group',
  })
  @IsString()
  code: string;

  @ApiProperty({
    description: 'Description of the service group',
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({
    description: 'Information of the service',
  })
  @IsOptional()
  @IsString()
  info: string;

  @ApiProperty({
    description: 'Catalogue of the service group',
    enum: ServiceCatalogue,
    example: Object.values(ServiceCatalogue),
  })
  @IsOptional()
  @IsEnum(ServiceCatalogue)
  catalogue: ServiceCatalogue;

  @ApiProperty({
    description: 'Array of service or service block IDs',
  })
  @Transform(({ value }) =>
    Array.isArray(value) ? value : Array(value),
  )
  @IsArray()
  @IsUUID('all', { each: true })
  @IsOptional()
  members: string[];
}
