import { Module } from '@nestjs/common';
import { DiagnosticService } from './diagnostic.service';
import { DiagnosticController } from './diagnostic.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Diagnostic } from './entities/diagnostic.entity';
import { PatientCasesModule } from '../patient-cases/patient-cases.module';
import { DiagnosticCatalogueEntryModule } from '../diagnostic-catalogue-entry/diagnostic-catalogue-entry.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Diagnostic]),
    PatientCasesModule,
    DiagnosticCatalogueEntryModule,
  ],
  controllers: [DiagnosticController],
  providers: [DiagnosticService],
  exports: [DiagnosticService],
})
export class DiagnosticModule {}
