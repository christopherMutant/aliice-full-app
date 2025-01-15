import { ApiProperty } from '@nestjs/swagger';
import { S3ObjectsType } from '../../bucket/bucket.service';

export class IconListType {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'List of Icons from bucket',
    type: [S3ObjectsType],
  })
  data: S3ObjectsType[];
}
