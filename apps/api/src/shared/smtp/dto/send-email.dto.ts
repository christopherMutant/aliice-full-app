import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateEmailDto {
  @ApiProperty()
  @IsString()
  to: string;

  @ApiProperty()
  @IsString()
  subject: string;

  @ApiProperty()
  @IsString()
  text: string;

  @ApiProperty()
  @IsString()
  html: string;
}
