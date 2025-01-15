import { ApiProperty } from '@nestjs/swagger';
import { AnalysisResponseType } from '../../analysis/types/analysis-response-type';
import { UserNameResponseType } from '../../user/types/user-name-response';

export class LaboratoryRequestResponseType {
  @ApiProperty()
  id: string;

  @ApiProperty({ type: [AnalysisResponseType] })
  analyses: AnalysisResponseType[];

  @ApiProperty()
  patient: UserNameResponseType;

  @ApiProperty()
  dueDate: Date;

  @ApiProperty()
  dateRequired: boolean;

  @ApiProperty()
  noticed: string;
}
