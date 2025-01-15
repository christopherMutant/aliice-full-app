import { Test, TestingModule } from '@nestjs/testing';
import { CategoryOrganizationService } from './category-organization.service';

describe('CategoryOrganizationService', () => {
  let service: CategoryOrganizationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryOrganizationService],
    }).compile();

    service = module.get<CategoryOrganizationService>(
      CategoryOrganizationService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
