import { ApiProperty } from '@nestjs/swagger';
import { UserProfileResponse } from './user-profile-success-response.type';

export class UserSuccessResponse {
  @ApiProperty()
  message: string;

  @ApiProperty()
  user: UserProfileResponse;
}
