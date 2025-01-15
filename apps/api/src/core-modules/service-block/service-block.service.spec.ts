import { Test, TestingModule } from '@nestjs/testing';
import { ServiceBlockService } from './service-block.service';

describe('ServiceBlockService', () => {
  let service: ServiceBlockService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceBlockService],
    }).compile();

    service = module.get<ServiceBlockService>(ServiceBlockService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
