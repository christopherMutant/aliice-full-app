import { ApiProperty } from '@nestjs/swagger';
import { UserProfileResponse } from '../../core-modules/user/types/user-profile-success-response.type';

export class AuthResponse {
  @ApiProperty()
  message: string;

  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;

  @ApiProperty()
  user: UserProfileResponse;
}
