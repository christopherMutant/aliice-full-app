import { Column, Entity } from 'typeorm';
import { AuditLogsHook } from '../../../audit-logs/audit-logs.hook';
import { EntityNames } from '../../../config/entity-names';
import { ApiProperty } from '@nestjs/swagger';
import { AnalysisCategories } from '../../../shared/types/enums';

@Entity({ name: EntityNames.ANALYSIS })
export class Analysis extends AuditLogsHook {
  @ApiProperty({
    description: 'Name of the analysis',
    example: 'Glycosylated Hemoglobin IFFCC (HbA1c)',
  })
  @Column({ nullable: true })
  name: string;

  @ApiProperty({
    description: 'Short name or acronym of the analysis',
    example: 'HBA1C',
  })
  @Column({ nullable: true })
  shortName: string;

  @ApiProperty({
    description: 'Unit of measure of the analysis',
    example: 'mmol/mol',
  })
  @Column({ nullable: true })
  unit: string;

  @ApiProperty({
    description: 'Reference value for normal results',
    example: '> 21',
  })
  @Column({ nullable: true })
  reference: string;

  @ApiProperty({
    description: 'Category of the analysis',
    example: AnalysisCategories.LABORATORY,
  })
  @Column({ nullable: true })
  category: AnalysisCategories;
}
