import { Test, TestingModule } from '@nestjs/testing';
import { CategoryOrganizationController } from './category-organization.controller';
import { CategoryOrganizationService } from './category-organization.service';

describe('CategoryOrganizationController', () => {
  let controller: CategoryOrganizationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryOrganizationController],
      providers: [CategoryOrganizationService],
    }).compile();

    controller = module.get<CategoryOrganizationController>(
      CategoryOrganizationController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
