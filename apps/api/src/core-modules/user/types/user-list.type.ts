import { ApiProperty } from '@nestjs/swagger';
import { PaginationType } from '../../../shared/types/pagination-type';
import { UserProfileResponse } from './user-profile-success-response.type';

export class PaginatedUserType extends PaginationType<UserProfileResponse> {
  @ApiProperty()
  message: string;

  @ApiProperty({
    description: 'List of Users',
    type: [UserProfileResponse],
  })
  data: UserProfileResponse[];
}
