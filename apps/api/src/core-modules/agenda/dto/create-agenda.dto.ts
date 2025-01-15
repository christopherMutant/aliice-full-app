import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { AgendaTypes } from '../../../shared/types/enums';

export class CreateAgendaDto {
  @ApiProperty({
    description: "Owner's User ID",
    example: '39386107-f89d-4659-8c02-83ac4922d431',
  })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  owner: string;

  @ApiProperty({
    description: "Client's User ID",
    example: '39386107-f89d-4659-8c02-83ac4922d431',
  })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  client: string;

  @ApiProperty({
    required: true,
    type: String,
    description: 'Name of the agenda',
    example: 'Dr. Strange',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    required: true,
    type: String,
    description: 'Initials of the agenda',
    example: 'SS',
  })
  @IsOptional()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Type of the agenda',
    example: Object.values(AgendaTypes),
  })
  @IsEnum(AgendaTypes)
  status: AgendaTypes;

  @ApiProperty({
    required: true,
    type: String,
    description: 'Color of the agenda',
    example: '#32a852',
  })
  @IsNotEmpty()
  @IsString()
  color: string;

  @ApiProperty({
    required: true,
    type: Boolean,
    description: 'Is disabled',
    example: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  disabled: boolean;

  @ApiProperty({
    required: true,
    type: String,
    description: 'Remarks of the agenda',
    example: "Dr. Strange's agenda",
  })
  @IsOptional()
  @IsString()
  remark: string;
}
