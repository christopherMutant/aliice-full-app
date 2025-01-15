import { Test, TestingModule } from '@nestjs/testing';
import { CategoryReferenceController } from './category_reference.controller';
import { CategoryReferenceService } from './category_reference.service';

describe('CategoryReferenceController', () => {
  let controller: CategoryReferenceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryReferenceController],
      providers: [CategoryReferenceService],
    }).compile();

    controller = module.get<CategoryReferenceController>(
      CategoryReferenceController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
