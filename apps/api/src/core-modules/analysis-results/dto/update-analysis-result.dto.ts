import { PartialType } from '@nestjs/swagger';
import { CreateAnalysisResultDto } from './create-analysis-result.dto';

export class UpdateAnalysisResultDto extends PartialType(
  CreateAnalysisResultDto,
) {}
