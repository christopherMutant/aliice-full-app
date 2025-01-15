import { ApiProperty } from '@nestjs/swagger';
import { UserAddress } from '../entities/user-address.entity';

export class UserAddressResponseType {
  @ApiProperty()
  message: string;

  @ApiProperty({
    type: UserAddress,
    description: 'User Address Details',
  })
  data: UserAddress;
}
