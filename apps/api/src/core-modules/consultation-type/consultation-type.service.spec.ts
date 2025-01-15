import { Test, TestingModule } from '@nestjs/testing';
import { ConsultationTypeService } from './consultation-type.service';

describe('ConsultationTypeService', () => {
  let service: ConsultationTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConsultationTypeService],
    }).compile();

    service = module.get<ConsultationTypeService>(
      ConsultationTypeService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
