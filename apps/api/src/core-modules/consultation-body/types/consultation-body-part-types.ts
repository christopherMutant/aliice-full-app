import {
  ApiExtraModels,
  ApiProperty,
  getSchemaPath,
} from '@nestjs/swagger';
import { ConsultationBodyTypes } from '../../../shared/types/enums';
import { AnalysisResultResponseType } from '../../analysis-results/types/analysis-result-response.type';
import {
  ConsultationDocumentEntryType,
  ConsultationInabilityEntryType,
  ConsultationMedicineEntryType,
  ConsultationServiceEntryType,
} from '../../consultation-body-part-entry/types/consultation-body-part-entry-types';

export class ConsultationUserType {
  @ApiProperty()
  id: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;
}

export class ConsultationBodyIdType {
  @ApiProperty()
  id: string;
}

export class ConsultationBodyTitleType {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  type?: {
    name: string;
  };
}

export class ConsultationTextType {
  @ApiProperty()
  id: string;

  @ApiProperty()
  text: string;

  @ApiProperty()
  title: ConsultationBodyTitleType;

  @ApiProperty()
  consultationBody?: ConsultationBodyIdType;
}

export class ConsultationwithEntriesType {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: ConsultationBodyTitleType;

  @ApiProperty()
  consultationBody?: {
    id: string;
  };
}

export class ConsultationDocumentType extends ConsultationwithEntriesType {
  @ApiProperty({ type: [ConsultationDocumentEntryType] })
  entries: ConsultationDocumentEntryType[];
}

export class ConsultationMedicineType extends ConsultationwithEntriesType {
  @ApiProperty({ type: [ConsultationMedicineEntryType] })
  entries: ConsultationMedicineEntryType[];
}

export class ConsultationInabilityType extends ConsultationwithEntriesType {
  @ApiProperty({ type: [ConsultationInabilityEntryType] })
  entries: ConsultationInabilityEntryType[];
}

export class ConsultationServiceType extends ConsultationwithEntriesType {
  @ApiProperty()
  control: boolean;

  @ApiProperty({ type: [ConsultationServiceEntryType] })
  entries: ConsultationServiceEntryType[];
}

export class ConsultationAnalysisType extends ConsultationwithEntriesType {
  @ApiProperty({ type: [AnalysisResultResponseType] })
  entries: AnalysisResultResponseType[];
}

@ApiExtraModels(
  ConsultationTextType,
  ConsultationDocumentType,
  ConsultationMedicineType,
  ConsultationInabilityType,
  ConsultationServiceType,
  ConsultationAnalysisType,
)
export class ConsultationBodyResponseType {
  @ApiProperty()
  id: string;

  @ApiProperty({
    oneOf: [
      { $ref: getSchemaPath(ConsultationTextType) },
      { $ref: getSchemaPath(ConsultationDocumentType) },
      { $ref: getSchemaPath(ConsultationMedicineType) },
      { $ref: getSchemaPath(ConsultationInabilityType) },
      { $ref: getSchemaPath(ConsultationServiceType) },
      { $ref: getSchemaPath(ConsultationAnalysisType) },
    ],
  })
  relatedObject:
    | string
    | ConsultationTextType
    | ConsultationDocumentType
    | ConsultationMedicineType
    | ConsultationInabilityType
    | ConsultationServiceType
    | ConsultationAnalysisType;

  @ApiProperty()
  relatedType: ConsultationBodyTypes;
}
