import { ApiProperty } from '@nestjs/swagger';
import { AuditLogsHook } from '../../../audit-logs/audit-logs.hook';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { InvoiceStatus } from '../../../shared/types/enums';
import { EntityNames } from '../../../config/entity-names';
import { Invoice } from '../../all-entities';

@Entity({ name: EntityNames.ASSET })
export class Asset extends AuditLogsHook {
  @ManyToOne(() => Invoice, invoice => invoice.assets)
  @JoinColumn({ name: 'invoice' })
  invoice: Invoice;

  @ApiProperty()
  @Column({ nullable: true })
  recipient: string;

  @ApiProperty()
  @Column({ nullable: true })
  creditCardNumber: string;

  @ApiProperty()
  @Column({ nullable: true })
  total: number;

  @ApiProperty()
  @Column({ nullable: true })
  paid: number;

  @ApiProperty()
  @Column({ nullable: true })
  open: number;

  @ApiProperty()
  @Column({ nullable: true, enum: InvoiceStatus })
  status: InvoiceStatus;

  @ApiProperty()
  @Column({ nullable: true, type: 'timestamptz' })
  dateOfLastStatusChange: Date;
}
