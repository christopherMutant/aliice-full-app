import { Test, TestingModule } from '@nestjs/testing';
import { MedicineBlockEntriesService } from './medicine-block-entries.service';

describe('MedicineBlockEntriesService', () => {
  let service: MedicineBlockEntriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedicineBlockEntriesService],
    }).compile();

    service = module.get<MedicineBlockEntriesService>(
      MedicineBlockEntriesService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
