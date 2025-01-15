import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentCategoryService } from './appointment-category.service';

describe('AppointmentCategoryService', () => {
  let service: AppointmentCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppointmentCategoryService],
    }).compile();

    service = module.get<AppointmentCategoryService>(
      AppointmentCategoryService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
