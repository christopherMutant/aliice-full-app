import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentCategoryController } from './appointment-category.controller';
import { AppointmentCategoryService } from './appointment-category.service';

describe('AppointmentCategoryController', () => {
  let controller: AppointmentCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppointmentCategoryController],
      providers: [AppointmentCategoryService],
    }).compile();

    controller = module.get<AppointmentCategoryController>(
      AppointmentCategoryController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
