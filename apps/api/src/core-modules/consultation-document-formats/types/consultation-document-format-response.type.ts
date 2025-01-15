import { ApiProperty } from '@nestjs/swagger';
import {
  DataSensitivityTypes,
  DocumentCategories,
} from '../../../shared/types/enums';

export class ConsultationDocumentFormatResponseType {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  url: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  category: DocumentCategories;

  @ApiProperty()
  address: string;

  @ApiProperty()
  dataSensitivity: DataSensitivityTypes;

  @ApiProperty()
  description: string;

  @ApiProperty()
  createdAt: Date;
}
