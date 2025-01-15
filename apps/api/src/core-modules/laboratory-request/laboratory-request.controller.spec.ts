import { Test, TestingModule } from '@nestjs/testing';
import { LaboratoryRequestController } from './laboratory-request.controller';
import { LaboratoryRequestService } from './laboratory-request.service';

describe('LaboratoryRequestController', () => {
  let controller: LaboratoryRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LaboratoryRequestController],
      providers: [LaboratoryRequestService],
    }).compile();

    controller = module.get<LaboratoryRequestController>(
      LaboratoryRequestController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
