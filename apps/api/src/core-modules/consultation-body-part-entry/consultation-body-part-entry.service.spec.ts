import { Test, TestingModule } from '@nestjs/testing';
import { ConsultationBodyPartEntryService } from './consultation-body-part-entry.service';

describe('ConsultationBodyPartEntryService', () => {
  let service: ConsultationBodyPartEntryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConsultationBodyPartEntryService],
    }).compile();

    service = module.get<ConsultationBodyPartEntryService>(
      ConsultationBodyPartEntryService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
