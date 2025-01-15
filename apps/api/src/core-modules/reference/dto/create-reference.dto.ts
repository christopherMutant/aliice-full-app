import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReferenceDto {
  @IsOptional()
  @IsUUID()
  id?: string; // id for the reference entity when updating from the user module

  @ApiProperty({
    description: 'References of the user',
    example: 'fc3d3b7b-b239-4f9b-b7b5-d76450656f5d',
  })
  referencesId: string;

  @ApiProperty({
    description: 'The id of the selected category',
    example: '2e1c7fe4-4abe-43cd-8a16-9534cfb397af',
  })
  @IsNotEmpty()
  @IsUUID()
  categoryId: string;

  @ApiProperty({
    description: 'Notice info regarding the reference',
  })
  @IsString()
  @IsOptional()
  noticed: string;

  @ApiProperty({
    description: 'Toggles if to send copy to the reference',
    example: false,
  })
  @IsBoolean()
  sendCopyToReference: boolean;
}
