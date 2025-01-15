import { Test, TestingModule } from '@nestjs/testing';
import { MedicalNoteController } from './medical-note.controller';
import { MedicalNoteService } from './medical-note.service';

describe('MedicalNoteController', () => {
  let controller: MedicalNoteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicalNoteController],
      providers: [MedicalNoteService],
    }).compile();

    controller = module.get<MedicalNoteController>(
      MedicalNoteController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
