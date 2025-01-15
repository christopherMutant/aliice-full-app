import { ApiProperty } from '@nestjs/swagger';
import { MedicineTypes } from '../../../shared/types/enums';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateMedicineBlockEntryDto {
  @ApiProperty({
    description: 'Medicine Block ID',
    example: '495e2f62-21ea-45ea-b22c-7f025da4d23f',
  })
  @IsOptional()
  @IsUUID()
  medicineBlock: string;

  @ApiProperty({
    description: 'Type of the product or medicine',
    enum: Object.values(MedicineTypes),
    example: Object.values(MedicineTypes),
  })
  @IsOptional()
  @IsEnum(MedicineTypes)
  type: MedicineTypes;

  @ApiProperty({
    description: 'Medicine ID',
    example: '495e2f62-21ea-45ea-b22c-7f025da4d23f',
  })
  @IsOptional()
  @IsUUID()
  product: string;

  @ApiProperty({
    description: 'Pack size of the product or medicine',
  })
  @IsOptional()
  @IsString()
  packSize: string;

  @ApiProperty({
    description: 'Dosage of the product or medicine',
  })
  @IsOptional()
  @IsString()
  dosage: string;

  @ApiProperty({
    description: 'Note for dosage of the product or medicine',
  })
  @IsOptional()
  @IsString()
  noteForDosage: string;

  @ApiProperty({
    description: 'Duration of use of the product or medicine',
  })
  @IsOptional()
  @IsString()
  duration: string;

  @ApiProperty({
    description: 'Quantity of the product or medicine',
  })
  @IsOptional()
  @Transform(({ value }) => +value)
  @IsNumber()
  quantity: number;

  @ApiProperty({
    description: 'Indications of the product or medicine',
  })
  @IsOptional()
  @IsString()
  indications: string;

  @ApiProperty({
    description:
      'If a medication plan is created for the product or medicine',
  })
  @IsOptional()
  @IsBoolean()
  medicationPlan: boolean;

  @ApiProperty({
    description: 'Drivers of the product or medicine',
  })
  @IsOptional()
  @IsString()
  drivers: string;

  @ApiProperty({
    description:
      'Validity of this consultation/prescription in months',
  })
  @IsOptional()
  @Transform(({ value }) => +value)
  @IsNumber()
  validFor: number;
}
