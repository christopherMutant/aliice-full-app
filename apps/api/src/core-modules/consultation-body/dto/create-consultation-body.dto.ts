import {
  ApiExtraModels,
  ApiProperty,
  getSchemaPath,
} from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
import { CreateTextConsultationDto } from './create-text-consultation.dto';
import { CreateDocumentConsultationDto } from './create-document-consultation.dto.';
import { CreateMedicineConsultationDto } from './create-medicine-consultation.dto';
import { CreateInabilityConsultationDto } from './create-inability-consultation.dto';
import { CreateServiceConsultationDto } from './create-service-consultation.dto';
import { CreateAnalysisConsultationDto } from './create-analysis-consultation.dto';
import { ConsultationBodyTypes } from '../../../shared/types/enums';
import { Type } from 'class-transformer';
import { NotImplementedException } from '@nestjs/common';

@ApiExtraModels(
  CreateTextConsultationDto,
  CreateDocumentConsultationDto,
  CreateMedicineConsultationDto,
  CreateInabilityConsultationDto,
  CreateServiceConsultationDto,
  CreateAnalysisConsultationDto,
)
export class CreateConsultationBodyDto {
  @ApiProperty({
    description: 'Consultation ID',
    example: '25135517-65e8-4742-ae12-72761b77655c',
  })
  @IsNotEmpty()
  @IsUUID()
  consultation: string;

  @ApiProperty({
    description: 'Consultation Type of the body',
    enum: Object.values(ConsultationBodyTypes),
    example: Object.values(ConsultationBodyTypes),
  })
  @IsEnum(ConsultationBodyTypes)
  consultationBodyType: ConsultationBodyTypes;

  @ApiProperty({
    description: 'Value of the consultation body',
    oneOf: [
      { $ref: getSchemaPath(CreateTextConsultationDto) },
      { $ref: getSchemaPath(CreateDocumentConsultationDto) },
      { $ref: getSchemaPath(CreateMedicineConsultationDto) },
      { $ref: getSchemaPath(CreateInabilityConsultationDto) },
      { $ref: getSchemaPath(CreateDocumentConsultationDto) },
      { $ref: getSchemaPath(CreateServiceConsultationDto) },
      { $ref: getSchemaPath(CreateAnalysisConsultationDto) },
    ],
  })
  @Type(typeHelpOptions => {
    const type = typeHelpOptions.object.consultationBodyType;

    switch (type) {
      case ConsultationBodyTypes.TEXT:
        return CreateTextConsultationDto;
      case ConsultationBodyTypes.DOCUMENT:
        return CreateDocumentConsultationDto;
      case ConsultationBodyTypes.MEDICINE:
        return CreateMedicineConsultationDto;
      case ConsultationBodyTypes.INABILITY:
        return CreateInabilityConsultationDto;
      case ConsultationBodyTypes.SERVICE:
        return CreateServiceConsultationDto;
      case ConsultationBodyTypes.ANALYSIS:
        return CreateAnalysisConsultationDto;
      default:
        throw new NotImplementedException(
          `No matching class found for: ${type}`,
        );
    }
  })
  body?:
    | CreateTextConsultationDto
    | CreateDocumentConsultationDto
    | CreateMedicineConsultationDto
    | CreateInabilityConsultationDto
    | CreateServiceConsultationDto
    | CreateAnalysisConsultationDto;
}
