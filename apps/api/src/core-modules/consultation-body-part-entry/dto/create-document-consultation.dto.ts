import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import {
  DataSensitivityTypes,
  DocumentCategories,
  OpenClosedStatus,
} from '../../../shared/types/enums';
import { Transform } from 'class-transformer';

export class CreateDocumentConsultationEntriesDto {
  @ApiProperty({
    description: 'Consultation Document Format ID',
  })
  @IsUUID()
  @IsNotEmpty()
  consultationDocumentFormat: string;

  @ApiProperty({
    description: 'Status of the document',
    enum: Object.values(OpenClosedStatus),
    example: Object.values(OpenClosedStatus),
  })
  @IsEnum(OpenClosedStatus)
  @IsOptional()
  status: OpenClosedStatus;

  @ApiProperty({
    description: 'Type of the document',
  })
  @IsString()
  @IsOptional()
  type: string;

  @ApiProperty({
    description:
      'Creation date of the original consultation document',
  })
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  date: Date;

  @ApiProperty({
    description: 'Name of the document',
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    description: 'Category of the document',
    enum: DocumentCategories,
  })
  @IsOptional()
  @IsEnum(DocumentCategories)
  category: DocumentCategories;

  @ApiProperty({
    description: 'Address of the document',
  })
  @IsString()
  @IsOptional()
  address: string;

  @ApiProperty({
    description: 'Data sensitivity of the document',
    enum: Object.values(DataSensitivityTypes),
    example: Object.values(DataSensitivityTypes),
  })
  @IsOptional()
  @IsEnum(DataSensitivityTypes)
  dataSensitivity: DataSensitivityTypes;

  @ApiProperty({
    description: 'Description of the document',
  })
  @IsString()
  @IsOptional()
  description: string;
}
