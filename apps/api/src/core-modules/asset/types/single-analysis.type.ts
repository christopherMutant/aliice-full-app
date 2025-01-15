import { ApiProperty } from '@nestjs/swagger';
import { AssetResponseType } from './asset-response.type';

export class AssetType {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'Details of Asset',
    type: AssetResponseType,
  })
  data: AssetResponseType;
}
