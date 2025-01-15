import { Injectable } from '@nestjs/common';
import { BASIC_JWT } from '../jwt/jwt.strategy';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class BasicGuard extends AuthGuard(BASIC_JWT) {}
