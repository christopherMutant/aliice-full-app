import { Injectable } from '@nestjs/common';
import * as speakeasy from 'speakeasy';
import { GoogleTokenVerifyDto } from '../dtos/google-auth-verify.dto';
import { GoogleAuthDto } from '../dtos/goog-auth.dto';
import { genAuthTypes } from '../types/genauth.type';

@Injectable()
export class GoogleAuthenticatorService {
  async genGoogleAuthSecrete(
    googleAuthDto: GoogleAuthDto,
  ): Promise<genAuthTypes> {
    const secret = speakeasy.generateSecret({
      name: googleAuthDto.email,
    });
    // Display this secret to the user securely
    return {
      secret: secret.base32,
    };
  }

  verifyGoogleToken(googleVerifyDto: GoogleTokenVerifyDto): boolean {
    /** Verifies if the provided token and secret are both valid */

    return speakeasy.totp.verify({
      secret: googleVerifyDto.secret,
      encoding: 'base32',
      token: googleVerifyDto.token,
    });
  }
}
