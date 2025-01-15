import { ApiProperty } from '@nestjs/swagger';

export class AdditionalCodesType {
  @ApiProperty()
  right?: boolean;

  @ApiProperty()
  left?: boolean;

  @ApiProperty()
  acute?: boolean;

  @ApiProperty()
  chronic?: boolean;

  @ApiProperty()
  infectious?: boolean;

  @ApiProperty()
  functional?: boolean;

  @ApiProperty()
  neoplasia?: boolean;

  @ApiProperty()
  professionalReasons?: boolean;
}
