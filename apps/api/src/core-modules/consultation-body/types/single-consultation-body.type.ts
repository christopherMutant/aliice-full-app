import {
  ApiExtraModels,
  ApiProperty,
  getSchemaPath,
} from '@nestjs/swagger';
import {
  ConsultationAnalysisType,
  ConsultationDocumentType,
  ConsultationInabilityType,
  ConsultationMedicineType,
  ConsultationServiceType,
  ConsultationTextType,
} from './consultation-body-part-types';

@ApiExtraModels(
  ConsultationTextType,
  ConsultationDocumentType,
  ConsultationMedicineType,
  ConsultationInabilityType,
  ConsultationServiceType,
  ConsultationAnalysisType,
)
export class ConsultationBodyPartResponseType {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'Details of a Consultation Body',
    oneOf: [
      { $ref: getSchemaPath(ConsultationTextType) },
      { $ref: getSchemaPath(ConsultationDocumentType) },
      { $ref: getSchemaPath(ConsultationMedicineType) },
      { $ref: getSchemaPath(ConsultationInabilityType) },
      { $ref: getSchemaPath(ConsultationServiceType) },
      { $ref: getSchemaPath(ConsultationAnalysisType) },
    ],
  })
  data:
    | ConsultationTextType
    | ConsultationDocumentType
    | ConsultationMedicineType
    | ConsultationInabilityType
    | ConsultationServiceType
    | ConsultationAnalysisType;
}
