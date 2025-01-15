import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class LoginResponseType {
  @ApiProperty()
  message: string;

  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;

  @ApiProperty()
  user: User;
}
