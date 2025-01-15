import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { AuditLogsHook } from '../../../audit-logs/audit-logs.hook';
import {
  DataSensitivityTypes,
  DocumentCategories,
} from '../../../shared/types/enums';

@Entity()
export abstract class AbstractConsultationDocumentEntity extends AuditLogsHook {
  @ApiProperty({
    description: 'Type of the document',
  })
  @Column({ nullable: true })
  type: string;

  @ApiProperty({
    description: 'Name of the document',
  })
  @Column({ nullable: true })
  name: string;

  @ApiProperty({
    description: 'Category of the document',
  })
  @Column({ nullable: true, enum: DocumentCategories })
  category: DocumentCategories;

  @ApiProperty({
    description: 'Address of the document',
  })
  @Column({ nullable: true })
  address: string;

  @ApiProperty({
    description: 'Data sensitivity of the document',
    enum: Object.values(DataSensitivityTypes),
  })
  @Column({ nullable: true, enum: DataSensitivityTypes })
  dataSensitivity: DataSensitivityTypes;

  @ApiProperty({
    description: 'Description of the document',
  })
  @Column({ nullable: true })
  description: string;

  @ApiProperty({
    description: 'Url of the document',
  })
  @Column({ nullable: true })
  url: string;
}
