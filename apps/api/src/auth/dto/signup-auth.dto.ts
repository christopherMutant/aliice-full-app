import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class SignupAuthDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  firstName: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  lastName: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsEmail()
  @IsOptional()
  @Transform(({ value }) => value.toLowerCase().trim())
  email: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  password: string;
}
