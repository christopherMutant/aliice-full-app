import { Test, TestingModule } from '@nestjs/testing';
import { ConsultationTypeController } from './consultation-type.controller';
import { ConsultationTypeService } from './consultation-type.service';

describe('ConsultationTypeController', () => {
  let controller: ConsultationTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConsultationTypeController],
      providers: [ConsultationTypeService],
    }).compile();

    controller = module.get<ConsultationTypeController>(
      ConsultationTypeController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
