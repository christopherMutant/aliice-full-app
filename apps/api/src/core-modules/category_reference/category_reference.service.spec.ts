import { Test, TestingModule } from '@nestjs/testing';
import { CategoryReferenceService } from './category_reference.service';

describe('CategoryReferenceService', () => {
  let service: CategoryReferenceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryReferenceService],
    }).compile();

    service = module.get<CategoryReferenceService>(
      CategoryReferenceService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
