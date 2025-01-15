import { Test, TestingModule } from '@nestjs/testing';
import { DiagnosticCatalogueEntryController } from './diagnostic-catalogue-entry.controller';
import { DiagnosticCatalogueEntryService } from './diagnostic-catalogue-entry.service';

describe('DiagnosticCatalogueEntryController', () => {
  let controller: DiagnosticCatalogueEntryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiagnosticCatalogueEntryController],
      providers: [DiagnosticCatalogueEntryService],
    }).compile();

    controller = module.get<DiagnosticCatalogueEntryController>(
      DiagnosticCatalogueEntryController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
