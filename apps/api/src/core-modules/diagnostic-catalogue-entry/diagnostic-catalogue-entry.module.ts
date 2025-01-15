import { Module } from '@nestjs/common';
import { DiagnosticCatalogueEntryService } from './diagnostic-catalogue-entry.service';
import { DiagnosticCatalogueEntryController } from './diagnostic-catalogue-entry.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  DiagnosticCatalogue,
  DiagnosticCatalogueEntry,
} from '../all-entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DiagnosticCatalogueEntry,
      DiagnosticCatalogue,
    ]),
  ],
  controllers: [DiagnosticCatalogueEntryController],
  providers: [DiagnosticCatalogueEntryService],
  exports: [DiagnosticCatalogueEntryService],
})
export class DiagnosticCatalogueEntryModule {}
