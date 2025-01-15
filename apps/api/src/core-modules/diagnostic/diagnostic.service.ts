import {
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { CreateDiagnosticDto } from './dto/create-diagnostic.dto';
import { UpdateDiagnosticDto } from './dto/update-diagnostic.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Diagnostic } from '../all-entities';
import { Repository } from 'typeorm';
import { AppErrorMessages } from '../../constants/app-error-messages';
import { DiagnosticListDto } from './dto/diagnostic-list.dto';
import { PatientCasesService } from '../patient-cases/patient-cases.service';
import { ConstantMessage } from '../../constants/constant-messages';
import { DiagnosticResponseType } from './types/diagnostic-response-type';
import { DiagnosticCatalogueEntryService } from '../diagnostic-catalogue-entry/diagnostic-catalogue-entry.service';

@Injectable()
export class DiagnosticService {
  constructor(
    @InjectRepository(Diagnostic)
    private readonly diagnosticRepository: Repository<Diagnostic>,
    private readonly patientCasesService: PatientCasesService,
    private readonly diagnosticCatalogueEntryService: DiagnosticCatalogueEntryService,
  ) {}
  async create(
    createDiagnosticDto: CreateDiagnosticDto,
  ): Promise<DiagnosticResponseType> {
    const diagnosticCatalogueEntry =
      createDiagnosticDto.catalogueEntry
        ? await this.diagnosticCatalogueEntryService.findOne(
            createDiagnosticDto.catalogueEntry,
          )
        : null;

    const diagnosticCatalogue =
      await this.diagnosticCatalogueEntryService.findOneCatalogue(
        createDiagnosticDto.catalogue,
      );

    if (
      diagnosticCatalogueEntry &&
      diagnosticCatalogueEntry.catalogue.id !== diagnosticCatalogue.id
    ) {
      throw new NotImplementedException(
        'Incompatible diagnostic catalogue and entry',
      );
    }

    const patientCase = await this.patientCasesService.findOne(
      createDiagnosticDto.patientCase,
    );

    try {
      const diagnostic = await this.diagnosticRepository.save({
        ...createDiagnosticDto,
        catalogue: diagnosticCatalogue,
        catalogueEntry: diagnosticCatalogueEntry,
        patientCase,
        additionalCodes: createDiagnosticDto.additionalCodes,
      });

      return await this.findOne(diagnostic.id);
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }

  async findAll(
    diagnosticListDto: DiagnosticListDto,
  ): Promise<DiagnosticResponseType[]> {
    const patientCase = await this.patientCasesService.findOne(
      diagnosticListDto.patientCase,
    );

    const diagnostics = await this.diagnosticRepository.find({
      relations: {
        catalogueEntry: true,
        catalogue: true,
      },
      select: {
        id: true,
        text: true,
        catalogueEntry: {
          id: true,
          code: true,
          description: true,
          info: true,
        },
        catalogue: {
          id: true,
          name: true,
        },
        additionalCodes: {
          right: true,
          left: true,
          acute: true,
          chronic: true,
          infectious: true,
          functional: true,
          neoplasia: true,
          professionalReasons: true,
        },
      },
      where: { patientCase },
    });

    return diagnostics;
  }

  async findOne(id: string): Promise<DiagnosticResponseType> {
    const diagnostic = await this.diagnosticRepository.findOne({
      where: { id },
      relations: {
        catalogueEntry: true,
        catalogue: true,
      },
      select: {
        id: true,
        text: true,
        catalogueEntry: {
          id: true,
          code: true,
          description: true,
        },
        catalogue: {
          id: true,
          name: true,
        },
        additionalCodes: {
          right: true,
          left: true,
          acute: true,
          chronic: true,
          infectious: true,
          functional: true,
          neoplasia: true,
          professionalReasons: true,
        },
      },
    });

    if (!diagnostic) {
      throw new NotFoundException(
        ConstantMessage.DIAGNOSTIC_NOT_FOUND,
      );
    }

    return diagnostic;
  }

  async update(
    id: string,
    updateDiagnosticDto: UpdateDiagnosticDto,
  ): Promise<void> {
    const diagnostic = await this.findOne(id);

    const diagnosticCatalogueEntry =
      updateDiagnosticDto.catalogueEntry
        ? await this.diagnosticCatalogueEntryService.findOne(
            updateDiagnosticDto.catalogueEntry,
          )
        : diagnostic.catalogueEntry;

    const diagnosticCatalogue = updateDiagnosticDto.catalogue
      ? await this.diagnosticCatalogueEntryService.findOneCatalogue(
          updateDiagnosticDto.catalogue,
        )
      : diagnostic.catalogue;

    if (
      diagnosticCatalogueEntry &&
      diagnosticCatalogueEntry.catalogue !== diagnosticCatalogue
    ) {
      throw new NotImplementedException(
        'Incompatible diagnostic catalogue and entry',
      );
    }

    const patientCase = await this.patientCasesService.findOne(
      updateDiagnosticDto.patientCase,
    );

    try {
      await this.diagnosticRepository.save({
        ...diagnostic,
        ...updateDiagnosticDto,
        catalogue: diagnosticCatalogue,
        catalogueEntry: diagnosticCatalogueEntry,
        patientCase,
        additionalCodes:
          updateDiagnosticDto.additionalCodes ||
          diagnostic.additionalCodes,
      });
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }

  async remove(id: string): Promise<void> {
    const diagnostic = await this.findOne(id);

    try {
      await this.diagnosticRepository.softRemove(diagnostic);
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }
}
