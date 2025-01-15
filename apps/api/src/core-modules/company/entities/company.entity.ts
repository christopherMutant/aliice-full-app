import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { EntityNames } from '../../../config/entity-names';
import { AuditLogsHook } from '../../../audit-logs/audit-logs.hook';
import { ApiProperty } from '@nestjs/swagger';
import {
  Communication,
  CompanyType,
  ContactCategories,
  ContanctCategoriesCompany,
  CorrespondenceLanguage,
} from '../../../shared/types/enums';
import { Insurance, UserAddress } from '../../all-entities';

@Entity({ name: EntityNames.COMPANY })
export class Company extends AuditLogsHook {
  //Organization Information Section
  @ApiProperty()
  @Column({ nullable: true })
  companyName: string;

  @ApiProperty()
  @Column({ nullable: true })
  supplementForTheCompany: string;

  @ApiProperty()
  @Column({ type: 'enum', enum: CompanyType, nullable: true })
  companyType: CompanyType;

  @ApiProperty()
  @Column({ nullable: true })
  department: string;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: ContanctCategoriesCompany,
    nullable: true,
  })
  contactCategories: ContanctCategoriesCompany;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: CorrespondenceLanguage,
    nullable: true,
  })
  correspondenceLanguage: CorrespondenceLanguage;

  @ApiProperty()
  @Column({ nullable: true })
  favorite: boolean;

  @ApiProperty()
  @Column({ nullable: true })
  comment: string;

  //Address Section
  @OneToOne(() => UserAddress, userAddress => userAddress.company, {
    cascade: true,
  })
  @JoinColumn()
  address: UserAddress;

  @ApiProperty({
    example: [
      { type: 'phone', category: 'private', value: '092312' },
      {
        type: 'email',
        category: 'general',
        value: 'user@example.com',
      },
    ],
    description: 'Array of contact information in JSON format',
  })
  @Column({ type: 'jsonb', nullable: true })
  contactDetails: {
    type: string;
    category: ContactCategories;
    value: string;
  }[];

  //Communication Section
  @ApiProperty()
  @Column({ type: 'enum', enum: Communication, nullable: true })
  communicationPath: Communication;

  //Individual Information Mdeical Center Section
  @ApiProperty()
  @Column({ nullable: true })
  globalLocationNumber: string;

  @ApiProperty()
  @Column({ nullable: true })
  rcc: string;

  //Insurance Information Section
  @ApiProperty()
  @Column({ nullable: true })
  law: string;

  @ApiProperty()
  @Column({ nullable: true })
  recipientGlobalLocationNumber: string;

  @ApiProperty()
  @Column({ nullable: true })
  tpAuthorize: boolean;

  //relations
  @OneToMany(() => Insurance, insurance => insurance.company)
  insurances: Insurance[];
}
