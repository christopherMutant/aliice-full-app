import { ApiProperty } from '@nestjs/swagger';
import { AuditLogsHook } from '../../../audit-logs/audit-logs.hook';
import {
  Column,
  Entity,
  Generated,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Asset, PatientCase } from '../../all-entities';
import { EntityNames } from '../../../config/entity-names';
import { InvoiceStatus } from '../../../shared/types/enums';
import { ColumnNumericTransformer } from '../../../shared/transformers/column-numeric-transformer';

@Entity({ name: EntityNames.INVOICE })
export class Invoice extends AuditLogsHook {
  @ApiProperty()
  @Generated('increment')
  @Column({ nullable: true })
  @Index()
  invoiceNumber: number;

  @ApiProperty()
  @JoinColumn({ name: 'case' })
  @ManyToOne(() => PatientCase, patientCase => patientCase.invoices)
  case: PatientCase;

  @ApiProperty()
  @Column({ nullable: true })
  concerned: string;

  @ApiProperty()
  @Column({ nullable: true })
  accountingGroup: string;

  @ApiProperty()
  @Column({ nullable: true, type: 'timestamptz' })
  of: Date;

  @ApiProperty()
  @Column({ nullable: true, type: 'timestamptz' })
  to: Date;

  @ApiProperty()
  @Column({ nullable: true })
  recipient: string;

  @ApiProperty()
  @Column({ nullable: true })
  remb: string;

  @ApiProperty()
  @Column('numeric', {
    precision: 7,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  total: number;

  @ApiProperty()
  @Column('numeric', {
    precision: 7,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  paid: number;

  @ApiProperty()
  @Column('numeric', {
    precision: 7,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  open: number;

  @ApiProperty()
  @Column({ nullable: true })
  messages: string;

  @ApiProperty()
  @Column({ nullable: true })
  rf: string;

  @ApiProperty()
  @Column({ nullable: true })
  copyOfFeedback: string;

  @ApiProperty()
  @Column({ nullable: true })
  reminders: string;

  @ApiProperty()
  @Column({ nullable: true, enum: InvoiceStatus })
  status: InvoiceStatus;

  @ApiProperty()
  @Column({ nullable: true, type: 'timestamptz' })
  dateOfLastStatusChange: Date;

  @OneToMany(() => Asset, asset => asset.invoice)
  assets: Asset[];
}
