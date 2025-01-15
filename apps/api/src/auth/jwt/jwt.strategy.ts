import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../core-modules/user/user.service';
import { ENV } from '../../config/env';
import { AppErrorMessages } from '../../constants/app-error-messages';
import { ITokensPayload } from '../interfaces/auth.interface';
import { HashService } from '../../shared/hash/hash.service';
import { User } from '../../core-modules/user/entities/user.entity';
import { UserTransformer } from '../../core-modules/user/transformers/user.transformer';

export const BASIC_JWT = 'basic-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
  BASIC_JWT,
) {
  constructor(
    private readonly userService: UserService,
    private readonly hashService: HashService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: ENV.JWT_SECRET,
    });
  }

  async validate(payload: ITokensPayload): Promise<User> {
    if (!payload.purpose || payload.purpose !== BASIC_JWT) {
      throw new UnauthorizedException(
        AppErrorMessages.invalid_credentials_em,
      );
    }

    const fullUser = await this.userService.getUserForStrategy(
      payload.sub,
    );

    if (!fullUser || !fullUser?.accessTokenHash) {
      throw new UnauthorizedException(
        AppErrorMessages.invalid_credentials_em,
      );
    }

    const accessToken = await this.hashService.check(
      payload.tokenId,
      fullUser.accessTokenHash,
    );

    if (!accessToken) {
      throw new UnauthorizedException(
        AppErrorMessages.invalid_credentials_em,
      );
    }

    return new UserTransformer(fullUser);
  }
}
