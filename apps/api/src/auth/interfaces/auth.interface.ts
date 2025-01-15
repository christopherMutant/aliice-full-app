export interface ITokensPayload {
  email: string;
  sub: string;
  purpose: string;
  tokenId: string;
}

export interface IVerificationCodeAndExpireTime {
  code: number;
  codeExpireTime: Date;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}
