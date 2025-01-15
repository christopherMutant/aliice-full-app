import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import {
  DataSensitivityTypes,
  DocumentCategories,
} from '../../../shared/types/enums';

export class CreateConsultationDocumentFormatDto {
  @ApiProperty({
    description:
      'Creation date of the original consultation document',
  })
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

  @ApiProperty({
    description: 'Document',
    type: 'file',
    items: {
      type: 'string',
      format: 'binary',
    },
  })
  file: Express.Multer.File;
}
