import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
  ValidateNested,
} from 'class-validator';
import {
  Communication,
  CorrespondenceLanguage,
  Gender,
  MaritalStatus,
} from '../../../shared/types/enums';
import { CreateUserAddressDto } from '../../user-address/dto/create-user-address.dto';
import { CreateInsuranceDto } from '../../insurance/dto/create-insurance.dto';
import { CreateReferenceDto } from '../../reference/dto/create-reference.dto';
import { CreateBankDetailDto } from '../../bank-details/dto/create-bank-detail.dto';
import { Type } from 'class-transformer';
import { CreateFamilyDataDto } from './create-family-data.dto';
import { IsInDatabase } from '../../../shared/decorator/is-in-database.decorator';
import { Department, RefRole, User } from '../../all-entities';
import { ContactDetailDto } from '../../../shared/dtos/contact-details.dto';

export class PatientInformation {
  @ApiProperty({
    description: 'Firstname of the user',
    example: 'John ',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    description: 'Lastname of the user',
    example: 'Doe',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    description: "URL of the user's profile picture",
  })
  @IsOptional()
  @IsString()
  photo: string;

  // @ApiProperty({
  //   description: 'specifies the patient number of the user',
  // })
  // @IsOptional()
  // isManualPatientNumber: boolean;

  @ApiProperty({
    description: 'Manual input for the patient number',
  })
  @IsOptional()
  patientNumber: number;

  @ApiProperty({
    description: 'Name prefix of the user',
    example: 'Mrs',
  })
  @IsOptional()
  @IsString()
  civility: string;

  @ApiProperty({
    description:
      '13-digit identification/social insurance number that is assigned to people living or working in Switzerland',
    example: '756.1234.5678.90',
  })
  @IsOptional()
  noAVS: string;

  @ApiProperty({
    description: 'Role ID of the user',
    example: 'bd658ff2-49d1-4893-812d-d20ecfb1e813',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  @IsInDatabase(RefRole)
  roleId: string;

  @ApiProperty({
    type: Date,
    required: false,
    description: 'Birth date of the user',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  dateOfBirth: string;

  @ApiProperty({
    description: 'Gender of the user',
    enum: Gender,
    example: Object.values(Gender),
    required: true,
  })
  @IsOptional()
  @IsEnum(Gender, { message: 'Invalid Gender' })
  gender: Gender;

  @ApiProperty({
    description: 'Password of the user',
    example: 'password',
    required: true,
  })
  @IsOptional()
  @MinLength(6)
  password: string;

  @ApiProperty({
    description: 'Department of the user',
    example: '8407f56b-85f9-4221-ae72-c8de106d10ad',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  @IsInDatabase(Department)
  departmentId: string;

  @ApiProperty({
    description: 'Specialty of the user',
    example: 'operation room',
    required: false,
  })
  @IsOptional()
  @IsString()
  specialist: string;

  @ApiProperty({
    description: 'Profession of the user',
    example: 'Electrical Engineer',
  })
  @IsOptional()
  @IsString()
  profession: string;

  @ApiProperty({
    description: 'Academic title of the user',
  })
  @IsOptional()
  @IsString()
  academicTitle: string;

  @ApiProperty({
    description: 'Marital Status of the user',
    example: Object.values(MaritalStatus),
  })
  @IsOptional()
  @IsEnum(MaritalStatus, { message: 'Invalid Marital Status' })
  maritalStatus: MaritalStatus;

  @ApiProperty({
    description: 'Language of the user',
    example: Object.values(CorrespondenceLanguage),
  })
  @IsOptional()
  @IsEnum(CorrespondenceLanguage, {
    message: 'Invalid Corresspondence language',
  })
  correspondenceLanguage: CorrespondenceLanguage;

  @ApiProperty({
    description: 'Contact Category of the user',
  })
  @IsOptional()
  @IsString()
  contactCategory: string;

  @ApiProperty({
    description: 'Marks if the user is part of the favorite section',
  })
  @IsOptional()
  @IsBoolean()
  favorite: boolean;

  @ApiProperty({
    description: 'Comments for the user',
  })
  @IsOptional()
  @IsString()
  comment: string;
}

export class IndividualInformation {
  @ApiProperty({
    description: 'Email address of the user',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description:
      'The assigned doctor or healthcare provider for the user',
    example: 'Dr. Jane Smith',
  })
  @IsOptional()
  @IsString()
  doctor: string;

  @ApiProperty({
    description:
      'VIP Chirurgical services or privileges the user is eligible for',
    example: 'VIP Chirurgical Consultation',
  })
  @IsOptional()
  @IsString()
  vipSurgery: string;

  @ApiProperty({
    description:
      'VIP Aesthetic services or privileges the user is eligible for.',
    example: 'VIP Aesthetic Skin Care',
  })
  @IsOptional()
  @IsString()
  vipAethetic: string;
}

export class AdministrativeMessage {
  @ApiProperty({
    description: 'Admistrative message for the user',
    required: false,
  })
  @IsOptional()
  @IsString()
  administrativeMessage: string;

  @ApiProperty({
    description:
      'Controls if the administrative message autimatically opens',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  openAdministrativeMessage: boolean;
}

export class InformationAboutMedicalCenter {
  @ApiProperty({
    description:
      'Global Location Number (GLN) used to uniquely identify healthcare locations such as hospitals, clinics, or departments.',
    example: '7641234567890',
  })
  @IsOptional()
  @IsString()
  globalLocationNumber: string;

  @ApiProperty({
    description: `RCC(Cantonal Register of Taxpayers) number used for identifying a person's civil status or social insurance in the healthcare system, particularly in Switzerland.`,
    example: '7561234567890',
  })
  @IsOptional()
  @IsString()
  rcc: string;
}

export class CreateUserDto {
  @ApiProperty({
    description: 'Patient Information Object',
    required: true,
  })
  @Type(() => PatientInformation)
  @ValidateNested()
  @IsOptional()
  patientInformation: PatientInformation;

  @ApiProperty({
    description: 'Address of the user',
  })
  @Type(() => CreateUserAddressDto)
  @IsOptional()
  @ValidateNested()
  address: CreateUserAddressDto;

  @ApiProperty({
    type: [ContactDetailDto],
    description: 'Array of contact information in JSON format',
  })
  @IsOptional()
  @IsArray()
  @Type(() => ContactDetailDto)
  @ValidateNested({ each: true })
  contactDetails: ContactDetailDto[];

  //AdministrativeMessage Section
  @ApiProperty({
    description: 'Administrative Message Object',
  })
  @Type(() => AdministrativeMessage)
  @ValidateNested()
  @IsOptional()
  administrativeMessage: AdministrativeMessage;

  // @ApiProperty({
  //   description: 'Family data of the user',
  //   type: [CreateFamilyDataDto],
  // })
  // @IsOptional()
  // @IsArray()
  // @Type(() => CreateFamilyDataDto)
  // @ValidateNested({ each: true })
  // familyData: CreateFamilyDataDto[];

  // @ApiProperty({
  //   description: 'Insurance data of the user',
  //   type: [CreateInsuranceDto],
  // })
  // @IsOptional()
  // @IsArray()
  // @Type(() => CreateInsuranceDto)
  // @ValidateNested({ each: true })
  // insuranceData: CreateInsuranceDto[];

  // @ApiProperty({
  //   description: 'Reference Form Data',
  //   example: [
  //     {
  //       referencesId: 'fc3d3b7b-b239-4f9b-b7b5-d76450656f5d',
  //       categoryId: '2e1c7fe4-4abe-43cd-8a16-9534cfb397af',
  //       noticed: 'string',
  //       sendCopyToReference: false,
  //     },
  //   ],
  // })
  // @IsOptional()
  // @IsArray()
  // @Type(() => CreateReferenceDto)
  // @ValidateNested({ each: true })
  // freeReferenceData: CreateReferenceDto[];

  // Individual Information Section
  @ApiProperty({
    description: 'Individual Information Object',
  })
  @Type(() => IndividualInformation)
  @ValidateNested()
  @IsOptional()
  individualInformation: IndividualInformation;

  //Information of the medical center
  @ApiProperty({
    description: 'Information About Medical Center Object',
  })
  @Type(() => InformationAboutMedicalCenter)
  @ValidateNested()
  @IsOptional()
  informationAboutMedicalCenter: InformationAboutMedicalCenter;

  //Bank Details Section
  @ApiProperty({
    description: 'Bank Details Information Object',
  })
  @Type(() => CreateBankDetailDto)
  @ValidateNested()
  @IsOptional()
  bankDetails: CreateBankDetailDto;

  //Communication Section
  @ApiProperty({
    description: 'Mode of communiction for the user',
    example: Object.values(Communication),
    required: true,
  })
  @IsOptional()
  @IsEnum(Communication, { message: 'Invalid Communication' })
  communication: Communication;

  @ApiProperty({
    description: 'User ID of the contact owner of the patient',
    example: '2e1c7fe4-4abe-43cd-8a16-9534cfb397af',
  })
  @IsUUID()
  @IsOptional()
  @IsInDatabase(User)
  contactOwner: string;
}
