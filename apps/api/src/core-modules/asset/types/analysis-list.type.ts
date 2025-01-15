import { ApiProperty } from '@nestjs/swagger';
import { AssetResponseType } from './asset-response.type';

export class AssetListType {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'List of Assets',
    type: [AssetResponseType],
  })
  data: AssetResponseType[];
}
