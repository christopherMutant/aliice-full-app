import { Test, TestingModule } from '@nestjs/testing';
import { LaboratoryRequestService } from './laboratory-request.service';

describe('LaboratoryRequestService', () => {
  let service: LaboratoryRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LaboratoryRequestService],
    }).compile();

    service = module.get<LaboratoryRequestService>(
      LaboratoryRequestService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
