import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { User } from '../../core-modules/all-entities';

export const LOCAL_STRATEGY_NAME = 'local';

@Injectable()
export class LocalStrategy extends PassportStrategy(
  Strategy,
  LOCAL_STRATEGY_NAME,
) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<User> {
    return await this.authService.validateUser(email, password);
  }
}
