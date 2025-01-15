import {
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { CreateDiagnosticCatalogueEntryDto } from './dto/create-diagnostic-catalogue-entry.dto';
import { UpdateDiagnosticCatalogueEntryDto } from './dto/update-diagnostic-catalogue-entry.dto';
import {} from '../diagnostic/types/diagnostic-response-type';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DiagnosticCatalogue,
  DiagnosticCatalogueEntry,
} from '../all-entities';
import { IsNull, Repository } from 'typeorm';
import { ConstantMessage } from '../../constants/constant-messages';
import { AppErrorMessages } from '../../constants/app-error-messages';
import { DefaultDiagnosticCatalogues } from '../../shared/types/enums';
import { DiagnosticCatalogueResponseType } from './types/diagnostic-catalogue-response.type';
import { DiagnosticCatalogueEntryResponseType } from './types/diagnostic-catalogue-entry-response.type';
import { DiagnosticCatalogueEntrySubEntryResponseType } from './types/diagnostic-catalogue-entry-subentry-response.type';

@Injectable()
export class DiagnosticCatalogueEntryService {
  constructor(
    @InjectRepository(DiagnosticCatalogueEntry)
    private readonly diagnosticCatalogueEntryRepository: Repository<DiagnosticCatalogueEntry>,
    @InjectRepository(DiagnosticCatalogue)
    private readonly diagnosticCatalogueRepository: Repository<DiagnosticCatalogue>,
  ) {}

  async create(
    createDiagnosticCatalogueEntryDto: CreateDiagnosticCatalogueEntryDto,
  ): Promise<DiagnosticCatalogueEntrySubEntryResponseType> {
    const diagnosticCatalogue = await this.findOneCatalogue(
      createDiagnosticCatalogueEntryDto.catalogue,
    );

    const mainDiagnosticCatalogueEntry = await this.findOne(
      createDiagnosticCatalogueEntryDto.mainDiagnosticCatalogueEntry,
    );

    try {
      const diagnosticCatalogueEntry =
        await this.diagnosticCatalogueEntryRepository.save({
          ...createDiagnosticCatalogueEntryDto,
          catalogue: diagnosticCatalogue,
          mainDiagnosticCatalogueEntry,
        });

      return await this.findOne(diagnosticCatalogueEntry.id);
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }

  async findAll(
    id?: string,
  ): Promise<DiagnosticCatalogueEntryResponseType[]> {
    if (!id) {
      const catalogueEntries =
        await this.diagnosticCatalogueEntryRepository.find({
          relations: {
            subEntries: true,
          },
          select: {
            id: true,
            description: true,
            code: true,
            info: true,
            subEntries: {
              id: true,
              description: true,
              code: true,
              info: true,
            },
          },
          where: { mainDiagnosticCatalogueEntry: IsNull() },
          order: {
            code: 'ASC',
            mainDiagnosticCatalogueEntry: { code: 'ASC' },
          },
        });

      return catalogueEntries;
    }

    const catalogueEntries =
      await this.diagnosticCatalogueEntryRepository.find({
        relations: {
          subEntries: true,
        },
        where: {
          catalogue: { id },
          mainDiagnosticCatalogueEntry: IsNull(),
        },
        select: {
          id: true,
          description: true,
          code: true,
          info: true,
          subEntries: {
            id: true,
            description: true,
            code: true,
            info: true,
          },
        },
        order: {
          code: 'ASC',
          mainDiagnosticCatalogueEntry: { code: 'ASC' },
        },
      });

    return catalogueEntries;
  }

  async findOne(
    id: string,
  ): Promise<DiagnosticCatalogueEntrySubEntryResponseType> {
    const catalogueEntry =
      await this.diagnosticCatalogueEntryRepository.findOne({
        where: { id },
        relations: {
          catalogue: true,
          mainDiagnosticCatalogueEntry: true,
        },
        select: {
          id: true,
          code: true,
          description: true,
          info: true,
          catalogue: {
            id: true,
            name: true,
          },
          mainDiagnosticCatalogueEntry: {
            id: true,
            code: true,
            description: true,
          },
        },
      });

    if (!catalogueEntry) {
      throw new NotFoundException(
        ConstantMessage.DIAGNOSTIC_CATALOGUE_ENTRY_NOT_FOUND,
      );
    }

    return catalogueEntry;
  }

  async update(
    id: string,
    updateDiagnosticCatalogueEntryDto: UpdateDiagnosticCatalogueEntryDto,
  ): Promise<void> {
    const diagnosticCatalogueEntry = await this.findOne(id);

    const diagnosticCatalogue = await this.findOneCatalogue(
      updateDiagnosticCatalogueEntryDto.catalogue,
    );

    const mainDiagnosticCatalogueEntry = await this.findOne(
      updateDiagnosticCatalogueEntryDto.mainDiagnosticCatalogueEntry,
    );

    try {
      await this.diagnosticCatalogueEntryRepository.save({
        ...diagnosticCatalogueEntry,
        ...updateDiagnosticCatalogueEntryDto,
        catalogue: diagnosticCatalogue,
        mainDiagnosticCatalogueEntry,
      });
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }

  async remove(id: string): Promise<void> {
    const diagnosticCatalogueEntry = await this.findOne(id);

    try {
      await this.diagnosticCatalogueEntryRepository.softRemove(
        diagnosticCatalogueEntry,
      );
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }

  async findAllCatalogues(): Promise<
    DiagnosticCatalogueResponseType[]
  > {
    const catalogues = await this.diagnosticCatalogueRepository.find({
      select: {
        id: true,
        name: true,
      },
    });

    return catalogues;
  }

  async findOneCatalogue(id: string): Promise<DiagnosticCatalogue> {
    const diagnosticCatalogue =
      await this.diagnosticCatalogueRepository.findOne({
        where: { id },
      });

    if (!diagnosticCatalogue) {
      throw new NotFoundException(
        ConstantMessage.DIAGNOSTIC_CATALOGUE_NOT_FOUND,
      );
    }

    return diagnosticCatalogue;
  }

  async updateDiagnosticCatalogueRelations(): Promise<void> {
    const tarmedCatalogue =
      await this.diagnosticCatalogueRepository.findOne({
        where: { name: DefaultDiagnosticCatalogues.TARMED },
      });

    const catalogueEntries = await this.findAll();

    try {
      for (const entry of catalogueEntries) {
        await this.diagnosticCatalogueEntryRepository.save({
          ...entry,
          catalogue: tarmedCatalogue,
        });
      }
    } catch (error) {
      throw new NotImplementedException(
        AppErrorMessages.database_error,
      );
    }
  }
}
