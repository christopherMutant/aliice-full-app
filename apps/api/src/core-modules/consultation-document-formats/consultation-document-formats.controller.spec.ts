import { Test, TestingModule } from '@nestjs/testing';
import { ConsultationDocumentFormatsController } from './consultation-document-formats.controller';
import { ConsultationDocumentFormatsService } from './consultation-document-formats.service';

describe('ConsultationDocumentsController', () => {
  let controller: ConsultationDocumentFormatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConsultationDocumentFormatsController],
      providers: [ConsultationDocumentFormatsService],
    }).compile();

    controller = module.get<ConsultationDocumentFormatsController>(
      ConsultationDocumentFormatsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
