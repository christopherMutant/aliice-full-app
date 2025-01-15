import { Test, TestingModule } from '@nestjs/testing';
import { PatientCasesController } from './patient-cases.controller';
import { PatientCasesService } from './patient-cases.service';

describe('PatientCaseController', () => {
  let controller: PatientCasesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientCasesController],
      providers: [PatientCasesService],
    }).compile();

    controller = module.get<PatientCasesController>(
      PatientCasesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
