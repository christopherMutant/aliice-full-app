import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GoogleTokenVerifyDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  secret: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  token: string;
}
