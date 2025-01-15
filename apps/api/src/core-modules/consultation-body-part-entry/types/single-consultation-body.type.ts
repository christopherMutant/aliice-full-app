import {
  ApiExtraModels,
  ApiProperty,
  getSchemaPath,
} from '@nestjs/swagger';
import {
  ConsultationDocumentEntryType,
  ConsultationInabilityEntryType,
  ConsultationMedicineEntryType,
  ConsultationServiceEntryType,
} from './consultation-body-part-entry-types';
import { AnalysisResultResponseType } from '../../analysis-results/types/analysis-result-response.type';

@ApiExtraModels(
  ConsultationDocumentEntryType,
  ConsultationMedicineEntryType,
  ConsultationInabilityEntryType,
  ConsultationServiceEntryType,
  AnalysisResultResponseType,
)
export class ConsultationBodyPartEntryResponseType {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'Details of a Consultation Body Entry',
    oneOf: [
      { $ref: getSchemaPath(ConsultationDocumentEntryType) },
      { $ref: getSchemaPath(ConsultationMedicineEntryType) },
      { $ref: getSchemaPath(ConsultationInabilityEntryType) },
      { $ref: getSchemaPath(ConsultationServiceEntryType) },
      { $ref: getSchemaPath(AnalysisResultResponseType) },
    ],
  })
  data:
    | ConsultationDocumentEntryType
    | ConsultationMedicineEntryType
    | ConsultationInabilityEntryType
    | ConsultationServiceEntryType
    | AnalysisResultResponseType;
}
