import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { CreateServiceConsultationEntryDto } from '../../consultation-body-part-entry/dto/create-service-consultation.dto';

export class CreateServiceConsultationDto {
  @ApiProperty({
    description: 'Consultation Title ID of the consultation text',
    example: '495e2f62-21ea-45ea-b22c-7f025da4d23f',
  })
  @IsNotEmpty()
  @IsUUID()
  title: string;

  @ApiProperty({
    description: 'Service consultation entries',
    type: [CreateServiceConsultationEntryDto],
  })
  @IsOptional()
  @Transform(({ value }) =>
    Array.isArray(value) ? value : Array(value),
  )
  @IsArray()
  @Type(() => CreateServiceConsultationEntryDto)
  @ValidateNested({ each: true })
  entries?: CreateServiceConsultationEntryDto[];

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  control: boolean;
}
