import { Test, TestingModule } from '@nestjs/testing';
import { MedicineBlockService } from './medicine-block.service';

describe('MedicineBlockService', () => {
  let service: MedicineBlockService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedicineBlockService],
    }).compile();

    service = module.get<MedicineBlockService>(MedicineBlockService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
