import { Test, TestingModule } from '@nestjs/testing';
import { ConsultationTitleService } from './consultation-title.service';

describe('ConsultationTitleService', () => {
  let service: ConsultationTitleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConsultationTitleService],
    }).compile();

    service = module.get<ConsultationTitleService>(
      ConsultationTitleService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
