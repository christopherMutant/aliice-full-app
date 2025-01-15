import { Test, TestingModule } from '@nestjs/testing';
import { ConsultationBodyController } from './consultation-body.controller';
import { ConsultationBodyService } from './consultation-body.service';

describe('ConsultationBodyController', () => {
  let controller: ConsultationBodyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConsultationBodyController],
      providers: [ConsultationBodyService],
    }).compile();

    controller = module.get<ConsultationBodyController>(
      ConsultationBodyController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
