import { Test, TestingModule } from '@nestjs/testing';
import { MedicalNoteService } from './medical-note.service';

describe('MedicalNoteService', () => {
  let service: MedicalNoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedicalNoteService],
    }).compile();

    service = module.get<MedicalNoteService>(MedicalNoteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
