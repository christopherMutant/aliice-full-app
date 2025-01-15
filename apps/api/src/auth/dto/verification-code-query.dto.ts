import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { VerificationCodeTypes } from '../../shared/types/enums';

export class VerificationCodeQueryDto {
  @ApiProperty({
    description: 'email of resource',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Type(() => String)
  @Transform(({ value }) => value.toLowerCase().trim())
  email: string;

  @ApiProperty({ type: 'enum', enum: VerificationCodeTypes })
  @IsNotEmpty()
  @IsEnum(VerificationCodeTypes)
  type: VerificationCodeTypes;
}
