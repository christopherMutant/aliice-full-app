import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BASIC_REFRESH_JWT } from '../jwt/refresh-token.strategy';

@Injectable()
export class RefreshTokenGuard extends AuthGuard(BASIC_REFRESH_JWT) {}
