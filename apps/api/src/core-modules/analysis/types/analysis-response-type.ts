import { ApiProperty } from '@nestjs/swagger';
import { AnalysisCategories } from '../../../shared/types/enums';

export class AnalysisResponseType {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  shortName: string;

  @ApiProperty()
  unit: string;

  @ApiProperty()
  reference: string;

  @ApiProperty()
  category: AnalysisCategories;
}
