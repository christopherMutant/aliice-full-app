import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ENV } from '../../config/env';
import { ITokensPayload } from '../interfaces/auth.interface';
import { AppErrorMessages } from '../../constants/app-error-messages';
import { UserService } from '../../core-modules/user/user.service';
import { HashService } from '../../shared/hash/hash.service';
import { UserTransformer } from '../../core-modules/user/transformers/user.transformer';
import { User } from '../../core-modules/all-entities';
import { Request } from 'express';

export const BASIC_REFRESH_JWT = 'basic-refresh-jwt';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  BASIC_REFRESH_JWT,
) {
  constructor(
    private readonly userService: UserService,
    private readonly hashService: HashService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: ENV.JWT_REFRESH_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(
    request: Request,
    payload: ITokensPayload,
  ): Promise<User> {
    if (!payload.purpose || payload.purpose !== BASIC_REFRESH_JWT) {
      throw new UnauthorizedException(
        AppErrorMessages.invalid_credentials_em,
      );
    }

    const fullUser = await this.userService.getUserForStrategy(
      payload.sub,
    );

    if (!fullUser) {
      throw new UnauthorizedException(
        AppErrorMessages.invalid_credentials_em,
      );
    }

    const refreshToken = await this.hashService.check(
      payload.tokenId,
      fullUser.refreshTokenHash,
    );

    if (!refreshToken) {
      throw new UnauthorizedException(
        AppErrorMessages.invalid_credentials_em,
      );
    }

    return new UserTransformer(fullUser);
  }
}
