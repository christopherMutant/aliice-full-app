import { Test, TestingModule } from '@nestjs/testing';
import { PatientCasesService } from './patient-cases.service';

describe('PatientCaseService', () => {
  let service: PatientCasesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatientCasesService],
    }).compile();

    service = module.get<PatientCasesService>(PatientCasesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
