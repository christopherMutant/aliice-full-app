import { Test, TestingModule } from '@nestjs/testing';
import { MailerSMTPService } from './mailer-s-m-t-p.service';

describe('MailerService', () => {
  let service: MailerSMTPService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailerSMTPService],
    }).compile();

    service = module.get<MailerSMTPService>(MailerSMTPService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
