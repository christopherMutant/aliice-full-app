import { Test, TestingModule } from '@nestjs/testing';
import { GoogleAuthenticatorService } from './google-authenticator.service';

describe('GoogleAuthenticatorService', () => {
  let service: GoogleAuthenticatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoogleAuthenticatorService],
    }).compile();

    service = module.get<GoogleAuthenticatorService>(
      GoogleAuthenticatorService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
