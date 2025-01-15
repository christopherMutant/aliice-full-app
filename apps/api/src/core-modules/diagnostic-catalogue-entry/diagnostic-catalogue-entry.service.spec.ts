import { Test, TestingModule } from '@nestjs/testing';
import { DiagnosticCatalogueEntryService } from './diagnostic-catalogue-entry.service';

describe('DiagnosticCatalogueEntryService', () => {
  let service: DiagnosticCatalogueEntryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiagnosticCatalogueEntryService],
    }).compile();

    service = module.get<DiagnosticCatalogueEntryService>(
      DiagnosticCatalogueEntryService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
