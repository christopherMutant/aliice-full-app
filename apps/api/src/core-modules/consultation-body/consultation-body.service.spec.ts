import { Test, TestingModule } from '@nestjs/testing';
import { ConsultationBodyService } from './consultation-body.service';

describe('ConsultationBodyService', () => {
  let service: ConsultationBodyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConsultationBodyService],
    }).compile();

    service = module.get<ConsultationBodyService>(
      ConsultationBodyService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
