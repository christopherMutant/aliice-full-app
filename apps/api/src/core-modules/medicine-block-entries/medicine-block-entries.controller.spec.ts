import { Test, TestingModule } from '@nestjs/testing';
import { MedicineBlockEntriesController } from './medicine-block-entries.controller';
import { MedicineBlockEntriesService } from './medicine-block-entries.service';

describe('MedicineBlockEntriesController', () => {
  let controller: MedicineBlockEntriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicineBlockEntriesController],
      providers: [MedicineBlockEntriesService],
    }).compile();

    controller = module.get<MedicineBlockEntriesController>(
      MedicineBlockEntriesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
