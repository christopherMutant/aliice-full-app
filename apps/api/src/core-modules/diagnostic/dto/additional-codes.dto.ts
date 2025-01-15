import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class AdditionalCodesDto {
  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  right: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  left: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  acute: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  chronic: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  infectious: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  functional: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  neoplasia: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  professionalReasons: boolean;
}
