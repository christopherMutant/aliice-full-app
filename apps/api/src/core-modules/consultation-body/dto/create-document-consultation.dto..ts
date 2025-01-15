import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { CreateDocumentConsultationEntriesDto } from '../../consultation-body-part-entry/dto/create-document-consultation.dto';

export class CreateDocumentConsultationDto {
  @ApiProperty({
    description: 'Consultation Title ID of the consultation document',
    example: '495e2f62-21ea-45ea-b22c-7f025da4d23f',
  })
  @IsNotEmpty()
  @IsUUID()
  title: string;

  @ApiProperty({
    description: 'Document consultation entries',
    type: [CreateDocumentConsultationEntriesDto],
  })
  @IsOptional()
  @Transform(({ value }) =>
    Array.isArray(value) ? value : Array(value),
  )
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDocumentConsultationEntriesDto)
  entries?: CreateDocumentConsultationEntriesDto[];
}
