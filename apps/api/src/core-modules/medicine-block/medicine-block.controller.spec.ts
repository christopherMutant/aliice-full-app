import { Test, TestingModule } from '@nestjs/testing';
import { MedicineBlockController } from './medicine-block.controller';
import { MedicineBlockService } from './medicine-block.service';

describe('MedicineBlockController', () => {
  let controller: MedicineBlockController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicineBlockController],
      providers: [MedicineBlockService],
    }).compile();

    controller = module.get<MedicineBlockController>(
      MedicineBlockController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
