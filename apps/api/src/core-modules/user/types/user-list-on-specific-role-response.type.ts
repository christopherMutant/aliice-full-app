import { ApiProperty } from '@nestjs/swagger';
import { UserProfileResponse } from './user-profile-success-response.type';

export class UserListOnSpecificRole {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'List of Users Specific to a Role',
    type: [UserProfileResponse],
  })
  data: UserProfileResponse[];
}
