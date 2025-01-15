import { Test, TestingModule } from '@nestjs/testing';
import { ConsultationDocumentFormatsService } from './consultation-document-formats.service';

describe('ConsultationDocumentsService', () => {
  let service: ConsultationDocumentFormatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConsultationDocumentFormatsService],
    }).compile();

    service = module.get<ConsultationDocumentFormatsService>(
      ConsultationDocumentFormatsService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
