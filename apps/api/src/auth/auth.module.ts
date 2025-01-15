import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './jwt/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt/jwt.strategy';
import { ENV } from '../config/env';
import { SharedModule } from '../shared/shared.module';
import { HashService } from '../shared/hash/hash.service';
import { User } from '../core-modules/all-entities';
import { RefreshTokenStrategy } from './jwt/refresh-token.strategy';
import { UserModule } from '../core-modules/user/user.module';
import { RoleModule } from '../core-modules/role/role.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: ENV.JWT_SECRET,
      signOptions: {
        expiresIn: `${ENV.JWT_TOKEN_EXPIRATION_IN_MINUTE}m`,
      },
    }),
    SharedModule,
    UserModule,
    RoleModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    HashService,
    LocalStrategy,
    JwtStrategy,
    RefreshTokenStrategy,
  ],
})
export class AuthModule {}
