import {
  ApiExtraModels,
  ApiProperty,
  getSchemaPath,
} from '@nestjs/swagger';
import { CreateAnalysisResultDto } from '../../analysis-results/dto/create-analysis-result.dto';
import { CreateDocumentConsultationEntriesDto } from './create-document-consultation.dto';
import { CreateInabilityConsultationEntryDto } from './create-inability-consultation.dto';
import {
  IsEnum,
  IsObject,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { CreateMedicineConsultationEntryDto } from './create-medicine-consultation.dto';
import { CreateServiceConsultationEntryDto } from './create-service-consultation.dto';
import { ConsultationEntryTypes } from '../../../shared/types/enums';
import { Type } from 'class-transformer';
import { NotImplementedException } from '@nestjs/common';

@ApiExtraModels(
  CreateDocumentConsultationEntriesDto,
  CreateMedicineConsultationEntryDto,
  CreateInabilityConsultationEntryDto,
  CreateServiceConsultationEntryDto,
  CreateAnalysisResultDto,
)
export class CreateConsultationBodyPartEntryDto {
  @ApiProperty({
    description: 'UUID of the consultation body part',
  })
  @IsUUID()
  consultationBodyPart: string;

  @ApiProperty({
    description: 'Consultation Type of the entry',
    example: Object.values(ConsultationEntryTypes),
  })
  @IsEnum(ConsultationEntryTypes)
  consultationEntryType: ConsultationEntryTypes;

  @ApiProperty({
    description: 'Value of the entry',
    oneOf: [
      { $ref: getSchemaPath(CreateDocumentConsultationEntriesDto) },
      { $ref: getSchemaPath(CreateMedicineConsultationEntryDto) },
      { $ref: getSchemaPath(CreateInabilityConsultationEntryDto) },
      { $ref: getSchemaPath(CreateServiceConsultationEntryDto) },
      { $ref: getSchemaPath(CreateAnalysisResultDto) },
    ],
  })
  @IsObject()
  @ValidateNested()
  @Type(typeHelpOptions => {
    const type = typeHelpOptions.object.consultationEntryType;

    switch (type) {
      case ConsultationEntryTypes.DOCUMENT:
        return CreateDocumentConsultationEntriesDto;
      case ConsultationEntryTypes.MEDICINE:
        return CreateMedicineConsultationEntryDto;
      case ConsultationEntryTypes.INABILITY:
        return CreateInabilityConsultationEntryDto;
      case ConsultationEntryTypes.SERVICE:
        return CreateServiceConsultationEntryDto;
      case ConsultationEntryTypes.ANALYSIS:
        return CreateAnalysisResultDto;
      default:
        throw new NotImplementedException(
          `No matching class found for: ${type}`,
        );
    }
  })
  value:
    | CreateDocumentConsultationEntriesDto
    | CreateMedicineConsultationEntryDto
    | CreateInabilityConsultationEntryDto
    | CreateServiceConsultationEntryDto
    | CreateAnalysisResultDto;
}
