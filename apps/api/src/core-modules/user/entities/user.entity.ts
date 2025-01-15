import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  Generated,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { UserRole } from '../../role/entities/user-role.entity';
import { EntityNames } from '../../../config/entity-names';
import {
  Communication,
  ContactCategories,
  CorrespondenceLanguage,
  Gender,
  MaritalStatus,
} from '../../../shared/types/enums';
import { AuditLogsHook } from '../../../audit-logs/audit-logs.hook';
import {
  Agenda,
  Department,
  LaboratoryRequest,
  PatientCase,
  UserAddress,
} from '../../all-entities';
import { EmailLog } from '../../../database/entities/email-log.entity';
import { Appointment } from '../../appointment/entities/appointment.entity';
import { BankDetails } from '../../bank-details/entities/bank-detail.entity';
import { Family } from './family.entity';
import { Insurance } from '../../insurance/entities/insurance.entity';
import { Reference } from '../../reference/entities/reference.entity';
import { Consultation } from '../../consultation/entities/consultation.entity';
import { AnalysisResult } from '../../analysis-results/entities/analysis-result.entity';
import { MedicalNote } from '../../medical-note/entities/medical-note.entity';
import { Checkup } from '../../checkup/entities/checkup.entity';

@Entity({ name: EntityNames.USER })
export class User extends AuditLogsHook {
  @Column({ nullable: true })
  @Index('unique-user-id-idx')
  uniqueUserId: string;

  @ApiProperty()
  @Column({ nullable: true })
  passwordHash: string;

  @ApiProperty()
  @Column({ nullable: true })
  firstName: string;

  @ApiProperty()
  @Column({ nullable: true })
  lastName: string;

  // @ApiProperty({
  //   description: 'specifies the patient number of the user',
  // })
  // @Column({ nullable: true })
  // isManualPatientNumber: boolean;

  @ApiProperty({
    description: 'Patient number of the user',
  })
  @Generated('increment')
  @Column({
    nullable: true,
    unique: true,
  })
  patientNumber: number;

  @ApiProperty({ description: "URL of the user's profile picture" })
  @Column({ nullable: true })
  photo: string;

  @ApiProperty()
  @Column({ nullable: true })
  civility: string;

  @ApiProperty()
  @Column({ nullable: true })
  noAVS: string;

  @ApiProperty({ type: Date })
  @Column({ type: 'timestamptz', nullable: true })
  dateOfBirth: string;

  @ApiProperty()
  @Column({ nullable: true, type: 'timestamptz' })
  emailVerificationTokenExpiryTime: Date;

  @ApiProperty()
  @Column({ nullable: true })
  emailVerificationTokenHash: string;

  @ApiProperty()
  @Column({ nullable: false, default: false })
  @Index('is-verified-idx')
  isEmailVerified: boolean;

  @ApiProperty({
    description: 'Gender of the person',
    enum: Gender, // Specify the enum for the allowed values
    example: Gender.MALE, // Example value
  })
  @Column({ type: 'enum', enum: Gender, nullable: true })
  gender: Gender;

  @ManyToOne(() => Department, department => department.users, {
    nullable: true,
  })
  department: Department;

  @ApiProperty()
  @Column({ nullable: true })
  academicTitle: string;

  @ApiProperty()
  @Column({ nullable: true })
  specialist: string;

  @ApiProperty()
  @Column({ nullable: true })
  profession: string;

  @ApiProperty()
  @Column({ type: 'enum', enum: MaritalStatus, nullable: true })
  maritalStaus: MaritalStatus;

  @ManyToOne(() => User, { nullable: true })
  client: User;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: CorrespondenceLanguage,
    nullable: true,
  })
  correspondenceLanguage: CorrespondenceLanguage;

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

  // Individual Information Section
  @ApiProperty()
  @Index('email-idx')
  @Column({ nullable: true, unique: true })
  email: string;

  @ApiProperty()
  @Column({ nullable: true })
  doctor: string;

  @ApiProperty()
  @Column({ nullable: true })
  vipSurgery: string;

  @ApiProperty()
  @Column({ nullable: true })
  vipAesthetics: string;

  //-----------------------------//

  //Information of the medical center
  @ApiProperty()
  @Column({ nullable: true })
  globalLocationNumber: string;

  @ApiProperty()
  @Column({ nullable: true })
  rcc: string;

  //-----------------------//

  //Communication Section
  @ApiProperty()
  @Column({ type: 'enum', enum: Communication, nullable: true })
  communication: Communication;

  //---------------------//

  @OneToOne(() => UserAddress, useraddress => useraddress.user, {
    cascade: true,
  })
  @JoinColumn()
  address: UserAddress;

  @ApiProperty()
  @Column({ type: 'text', nullable: true })
  administrativeMessage: string;

  @ApiProperty({
    description:
      'Controls if the administrative message autimatically opens',
  })
  @Column({ nullable: true })
  openAdministrativeMessage: boolean;

  @ApiProperty()
  @Column({ nullable: true })
  contactCategory: string;

  @ApiProperty()
  @Column({ nullable: true })
  favorite: boolean;

  @ApiProperty()
  @Column({ nullable: true })
  comment: string;

  @ApiProperty({ type: Date })
  @Column({
    type: 'timestamptz',
    nullable: true,
  })
  @Index('last-login-idx')
  lastLoginTime: Date;

  @ApiProperty()
  @Column({ nullable: false, default: false })
  isDisabled: boolean;

  @ApiProperty({ type: Date })
  @Column({
    type: 'timestamptz',
    nullable: true,
  })
  disabledAt: Date;

  @ApiProperty()
  @Column({ type: 'uuid', nullable: true, default: null })
  disabledBy: string;

  @ApiProperty()
  @Column({ nullable: true, default: null })
  accessTokenHash: string;

  @ApiProperty()
  @Column({ nullable: true, default: null })
  refreshTokenHash: string;

  @ApiProperty()
  @OneToMany(() => UserRole, (userRole: UserRole) => userRole.user, {
    cascade: true,
  })
  userRoles: UserRole[];

  @ApiProperty()
  @OneToMany(() => EmailLog, (emailLog: EmailLog) => emailLog.user, {
    cascade: true,
  })
  emailLogs: EmailLog[];

  @ApiProperty()
  @OneToMany(
    () => Appointment,
    appointment => appointment.patient && appointment.doctor,
  )
  appointments: Appointment[];

  @ApiProperty()
  @OneToMany(() => Agenda, agenda => agenda.owner && agenda.client)
  agendas: Agenda[];

  @OneToMany(() => Family, family => family.patient, {
    cascade: true,
  })
  family: Family[];

  @OneToMany(() => Insurance, insurance => insurance.user, {
    cascade: true,
  })
  insurances: Insurance[];

  @OneToMany(() => Reference, reference => reference.users, {
    cascade: true,
  })
  reference: Reference[];

  @OneToMany(() => Reference, reference => reference.reference)
  personReferences: Reference[];

  @OneToMany(
    () => Consultation,
    consultation => consultation.doctor && consultation.patient,
  )
  consultations: Consultation[];

  @OneToMany(
    () => Checkup,
    checkUp => checkUp.doctor && checkUp.patient,
  )
  checkups: Checkup[];

  @OneToMany(
    () => AnalysisResult,
    analysisResult => analysisResult.patient,
  )
  analysisResults: AnalysisResult[];

  @OneToMany(
    () => LaboratoryRequest,
    laboratoryRequest => laboratoryRequest.patient,
  )
  laboratoryRequests: LaboratoryRequest[];

  @OneToOne(() => BankDetails, bankDetails => bankDetails.user, {
    cascade: true,
  })
  bankDetails: BankDetails;

  @OneToMany(
    () => PatientCase,
    patientCase =>
      patientCase.patient && patientCase.referringPhysician,
  )
  patientCases: PatientCase[];

  @OneToOne(() => MedicalNote, medicalNote => medicalNote.patient, {
    cascade: true,
  })
  medicalNote: MedicalNote;

  @JoinColumn({ name: 'contact_owner' })
  @ManyToOne(() => User)
  contactOwner: User;
}
