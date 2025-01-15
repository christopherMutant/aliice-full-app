import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import {
  Communication,
  CompanyType,
  ContanctCategoriesCompany,
  CorrespondenceLanguage,
} from '../../../shared/types/enums';
import { CreateUserAddressDto } from '../../user-address/dto/create-user-address.dto';
import { Type } from 'class-transformer';
import { ContactDetailDto } from '../../../shared/dtos/contact-details.dto';

class OrganizationInformation {
  //Organization Informaction Section
  @ApiProperty({
    description: 'Name of the company',
    required: true,
  })
  @IsString()
  companyName: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  supplementForTheCompany: string;

  @ApiProperty({
    description: 'Type of Company',
    example: Object.values(CompanyType),
  })
  @IsOptional()
  @IsEnum(CompanyType, {
    message: 'Invalid Company Type',
  })
  companyType: CompanyType;

  @ApiProperty({
    description: 'Department of the compnay',
  })
  @IsOptional()
  @IsString()
  department: string;

  @ApiProperty({
    description: 'Conctact Category of the company',
    example: Object.values(ContanctCategoriesCompany),
  })
  @IsOptional()
  @IsEnum(ContanctCategoriesCompany, {
    message: 'Invalid Contact Category',
  })
  contactCategories: ContanctCategoriesCompany;

  @ApiProperty({
    description: 'Language for the compnay',
    example: Object.values(CorrespondenceLanguage),
  })
  @IsOptional()
  @IsEnum(CorrespondenceLanguage, {
    message: 'Invalid Correspondence Language',
  })
  correspondenceLanguage: CorrespondenceLanguage;

  @ApiProperty({
    description: 'Toggles if this marked as favorite',
  })
  @IsOptional()
  @IsBoolean()
  favorite: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  comment: string;
}

class CompanyIndividualInformation {
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

class InsuranceInformation {
  //Insurance information section
  @ApiProperty()
  @IsOptional()
  @IsString()
  law: string;

  @ApiProperty({
    description: 'Global location number of the insurance company',
    example: '1234567890123',
  })
  @IsOptional()
  @IsString()
  globalLocationNumber: string;

  @ApiProperty({
    description: 'Global location number of the receipient',
    example: '321317890123',
  })
  @IsOptional()
  recipientGlobalLocationNumber: string;

  @ApiProperty({
    description: 'Third party authorization',
    example: false,
  })
  @IsOptional()
  tpAuthorize: boolean;
}

export class CreateCompanyDto {
  //Organization Information Section
  @ApiProperty({
    description: 'Organization Information Object',
    required: true,
  })
  @Type(() => OrganizationInformation)
  @ValidateNested()
  organizationInformation: OrganizationInformation;

  //Address Section
  @ApiProperty({
    description: 'Address of the company',
    required: true,
  })
  @Type(() => CreateCompanyDto)
  @ValidateNested()
  address: CreateUserAddressDto;

  /** */

  @ApiProperty({
    type: [ContactDetailDto],
    description: 'Array of contact information in JSON format',
  })
  contactDetails: ContactDetailDto[];

  //Communication Section
  @ApiProperty({
    description: 'Communication path of the company',
    example: Object.values(Communication),
  })
  @IsOptional()
  @IsEnum(Communication, {
    message: 'Invalid Communication',
  })
  communicationPath: Communication;

  //Indivual Information - Create new Medical Center Screen
  @ApiProperty({
    description: 'Individual Information Object',
    required: false,
  })
  @IsOptional()
  @Type(() => CompanyIndividualInformation)
  @ValidateNested()
  individualInformation: CompanyIndividualInformation;

  //Insurance Information - Create new Insurance Screen
  @ApiProperty({
    description: 'Insurance Information Object',
    required: false,
  })
  @IsOptional()
  @Type(() => InsuranceInformation)
  @ValidateNested()
  insuranceInformation: InsuranceInformation;
}
