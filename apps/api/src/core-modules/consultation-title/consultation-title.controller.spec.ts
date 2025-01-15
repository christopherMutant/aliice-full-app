import { Test, TestingModule } from '@nestjs/testing';
import { ConsultationTitleController } from './consultation-title.controller';
import { ConsultationTitleService } from './consultation-title.service';

describe('ConsultationTitleController', () => {
  let controller: ConsultationTitleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConsultationTitleController],
      providers: [ConsultationTitleService],
    }).compile();

    controller = module.get<ConsultationTitleController>(
      ConsultationTitleController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
