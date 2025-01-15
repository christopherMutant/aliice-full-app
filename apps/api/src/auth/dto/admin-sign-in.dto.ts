import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class AdminSignInDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase().trim())
  email: string;

  @ApiProperty({ required: true })
  @IsString()
  password: string;
}
