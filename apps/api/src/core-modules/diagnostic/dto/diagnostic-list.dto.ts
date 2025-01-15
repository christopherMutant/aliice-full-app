import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class DiagnosticListDto {
  @ApiProperty({
    description: 'Patient Case ID',
  })
  @IsString()
  @IsUUID()
  @IsOptional()
  patientCase: string;
}
