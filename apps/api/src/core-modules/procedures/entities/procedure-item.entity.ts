import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { AuditLogsHook } from '../../../audit-logs/audit-logs.hook';
import { Procedure } from './procedure.entity';
import { ApiProperty } from '@nestjs/swagger';
import { ColumnNumericTransformer } from '../../../shared/transformers/column-numeric-transformer';
import {
  CompulsoryInsuranceTypes,
  DiscountCategories,
  ServiceCatalogue,
  VatTypes,
} from '../../../shared/types/enums';
import { EntityNames } from '../../../config/entity-names';
import { Service } from '../../all-entities';

@Entity({ name: EntityNames.PROCEDURE_ITEM })
export class ProcedureItem extends AuditLogsHook {
  @OneToMany(() => Procedure, procedure => procedure.items, {
    onDelete: 'CASCADE',
  })
  procedure: Procedure;

  @ApiProperty({
    description: 'Code of the service',
  })
  @Column({ nullable: true, unique: true })
  @Index()
  code: string;

  @ApiProperty({
    description: 'Reference service',
  })
  @Column({ default: false })
  referenceService: boolean;

  @ApiProperty({
    description: 'Description of the service',
  })
  @Column({ nullable: true })
  description: string;

  @ApiProperty({
    description: 'Side of the service',
  })
  @Column({ nullable: true })
  side: string;

  @ApiProperty({
    description: 'Is service a mandatory service',
  })
  @Column({ nullable: true })
  nonMandatoryService: boolean;

  @ApiProperty({
    description: 'Quantity of the service',
  })
  @Column({ nullable: true })
  quantity: number;

  @ApiProperty({
    description: 'Tarrif point or price of the service',
  })
  @Column('numeric', {
    precision: 7,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
    default: 0,
  })
  tarrifPoint: number;

  @ApiProperty({
    description: 'Point value of the service',
  })
  @Column('numeric', {
    precision: 5,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
    default: 1,
  })
  pointValue: number;

  @ApiProperty({
    description: 'Vat type of the service',
  })
  @Column({ nullable: true, enum: VatTypes })
  vat: VatTypes;

  @ApiProperty({
    description: 'Information of the service',
  })
  @Column({ nullable: true })
  info: string;

  @ApiProperty({
    description: 'Service catalogue of the service',
    enum: ServiceCatalogue,
  })
  @Column({ nullable: true, enum: ServiceCatalogue })
  catalogue: ServiceCatalogue;

  @ApiProperty({
    description: 'Out of business',
  })
  @Column({ nullable: true })
  outOfBusiness: string;

  @ApiProperty({
    description: 'Discount category of the service',
  })
  @Column({ nullable: true, enum: DiscountCategories })
  discountCategory: DiscountCategories;

  @ApiProperty({
    description: 'Type of compulsory insurance of the service',
  })
  @Column({ nullable: true, enum: CompulsoryInsuranceTypes })
  typeOfCompulsoryInsurance: CompulsoryInsuranceTypes;

  @ApiProperty({
    description: 'pce of the service',
  })
  @Column({ nullable: true })
  pce: string;

  @JoinColumn({ name: 'service' })
  @ManyToOne(() => Service, { onDelete: 'SET NULL' })
  service: Service;

  //apparatus or medicines used for the treatment
}
