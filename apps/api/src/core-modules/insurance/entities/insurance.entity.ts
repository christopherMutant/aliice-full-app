import { Column, Entity, ManyToOne } from 'typeorm';
import { AuditLogsHook } from '../../../audit-logs/audit-logs.hook';
import { Company, User } from '../../all-entities';
import { EntityNames } from '../../../config/entity-names';
import { ApiProperty } from '@nestjs/swagger';
import {
  AssuranceType,
  HealthInsuranceModel,
} from '../../../shared/types/enums';

@Entity({ name: EntityNames.INSURANCE })
export class Insurance extends AuditLogsHook {
  @ApiProperty({
    description: 'Type of Insurnace',
    enum: AssuranceType,
    example: AssuranceType.ASSURANCE_LAA,
  })
  @Column({ type: 'enum', enum: AssuranceType, nullable: true })
  assuranceType: AssuranceType;

  @ManyToOne(() => Company, company => company.insurances)
  company: Company;

  @ApiProperty({
    description: 'Health Insurance Model Drop down',
    enum: HealthInsuranceModel,
  })
  @Column({
    type: 'enum',
    enum: HealthInsuranceModel,
    nullable: true,
  })
  healthInsuranceModel: HealthInsuranceModel;

  @ApiProperty()
  @Column({ nullable: true })
  cardNumber: string;

  @ApiProperty({
    type: Date,
    description: 'Start date of the insurance ',
    required: true,
  })
  @Column({ type: 'timestamptz', nullable: false })
  validFrom: Date;

  @ApiProperty({
    required: true,
    type: Date,
    description: 'End date of the insurance ',
  })
  @Column({ type: 'timestamptz', nullable: false })
  validTo: Date;

  @ApiProperty({
    description: 'Insurance number of the user',
  })
  @Column({ nullable: false })
  insuranceNumber: string;

  @ApiProperty()
  @Column({ nullable: true })
  sendCopyToRefence: boolean;

  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  noticed: string;

  @ManyToOne(() => User, user => user.insurances)
  user: User;
}
