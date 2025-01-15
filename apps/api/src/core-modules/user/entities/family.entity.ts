import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AuditLogsHook } from '../../../audit-logs/audit-logs.hook';
import { User } from '../../all-entities';
import { EntityNames } from '../../../config/entity-names';
import { ApiProperty } from '@nestjs/swagger';
import {
  FamilialRelationship,
  FamilyCategory,
} from '../../../shared/types/enums';

@Entity({ name: EntityNames.FAMILY })
export class Family extends AuditLogsHook {
  @ApiProperty({
    type: Boolean,
    description:
      'Marks if the individual is designated as the legal representative',
  })
  @Column({ nullable: true })
  legalRepresentative: boolean;

  @ApiProperty({
    description: 'Category of the family member',
    example: Object.values(FamilyCategory),
  })
  @Column({ type: 'enum', enum: FamilyCategory, nullable: true })
  category: FamilyCategory;

  @ApiProperty({
    description: 'Degree of relationship with the family member',
    example: FamilialRelationship.BIOLOGICAL,
  })
  @Column({
    type: 'enum',
    enum: FamilialRelationship,
    nullable: true,
  })
  complement: FamilialRelationship;

  @ApiProperty()
  @Column({ nullable: true })
  noticed: string;

  @ApiProperty({
    type: Boolean,
    description: 'Checks if a copy will be sent to reference',
  })
  @Column({ nullable: true })
  alwaysSendCopy: boolean;

  @JoinColumn()
  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  familyMember: User;

  @JoinColumn()
  @ManyToOne(() => User, user => user.family, { onDelete: 'CASCADE' })
  patient: User;
}
