import { Test, TestingModule } from '@nestjs/testing';
import { ConsultationBodyPartEntryController } from './consultation-body-part-entry.controller';
import { ConsultationBodyPartEntryService } from './consultation-body-part-entry.service';

describe('ConsultationBodyPartEntryController', () => {
  let controller: ConsultationBodyPartEntryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConsultationBodyPartEntryController],
      providers: [ConsultationBodyPartEntryService],
    }).compile();

    controller = module.get<ConsultationBodyPartEntryController>(
      ConsultationBodyPartEntryController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
