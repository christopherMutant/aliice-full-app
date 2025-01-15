import { Test, TestingModule } from '@nestjs/testing';
import { CantonService } from './canton.service';

describe('CantonService', () => {
  let service: CantonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CantonService],
    }).compile();

    service = module.get<CantonService>(CantonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
