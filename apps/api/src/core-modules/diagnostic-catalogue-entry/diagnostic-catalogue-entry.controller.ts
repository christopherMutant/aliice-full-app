import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UseGuards,
  Query,
} from '@nestjs/common';
import { DiagnosticCatalogueEntryService } from './diagnostic-catalogue-entry.service';
import { CreateDiagnosticCatalogueEntryDto } from './dto/create-diagnostic-catalogue-entry.dto';
import { UpdateDiagnosticCatalogueEntryDto } from './dto/update-diagnostic-catalogue-entry.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ConstantMessage } from '../../constants/constant-messages';
import { DiagnosticCatalogueEntryListType } from './types/diagnostic-catalogue-entry-list-type';
import { GenericErrorResponse } from '../../shared/types/generic-error.type';
import { Roles } from '../../auth/decorator/roles.decorator';
import { RefRoleKeys } from '../../shared/types/enums';
import { Permissions } from '../../auth/decorator/permission.decorator';
import { BasicGuard } from '../../auth/guards/basic.guard';
import { RolesAndPermissionsGuard } from '../../auth/guards/roles-and-permissions-guard.service';
import { DiagnosticEntryListDto } from './dto/diagnostic-catalogue-entry-list.dto';
import { DiagnosticCatalogueListType } from './types/diagnostic-catalogue-list-type';
import { SuccessMessageResponse } from '../../shared/types/success-message.type';
import { GenericParamID } from '../../shared/dtos/generic-params-id.dto';
import { DiagnosticCatalogueEntryType } from './types/single-diagnostic-catalogue-entry-type';

@ApiTags('Diagnostic Catalogue Entries')
@Controller('diagnostic-catalogue-entry')
export class DiagnosticCatalogueEntryController {
  constructor(
    private readonly diagnosticCatalogueEntryService: DiagnosticCatalogueEntryService,
  ) {}

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api updates relations of all diagnostic catalogue entries',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.DIAGNOSTIC_CATALOGUE_ENTRY_UPDATED,
    type: SuccessMessageResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN)
  @Permissions('diagnostic_catalogue_entry_relations')
  @Post('relations')
  async updateDiagnosticCatalogueRelations(): Promise<SuccessMessageResponse> {
    await this.diagnosticCatalogueEntryService.updateDiagnosticCatalogueRelations();
    return {
      message: ConstantMessage.DIAGNOSTIC_CATALOGUE_ENTRY_UPDATED,
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This Api creates a diagnostic catalogue entry',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.DIAGNOSTIC_CATALOGUE_ENTRY_CREATED,
    type: DiagnosticCatalogueEntryType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN)
  @Permissions('diagnostic_catalogue_entry_create')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Post()
  async create(
    @Body()
    createDiagnosticCatalogueEntryDto: CreateDiagnosticCatalogueEntryDto,
  ): Promise<DiagnosticCatalogueEntryType> {
    return {
      message: ConstantMessage.DIAGNOSTIC_CATALOGUE_ENTRY_CREATED,
      data: await this.diagnosticCatalogueEntryService.create(
        createDiagnosticCatalogueEntryDto,
      ),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api fetches a list of diagnostic catalogue entries based on the given diagnostic catalogue ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.SUCCESS,
    type: DiagnosticCatalogueEntryListType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
  @Permissions('diagnostic_catalogue_entry_get')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get()
  async findAll(
    @Query() diagnosticEntryListDto: DiagnosticEntryListDto,
  ): Promise<DiagnosticCatalogueEntryListType> {
    return {
      message: ConstantMessage.SUCCESS,
      data: await this.diagnosticCatalogueEntryService.findAll(
        diagnosticEntryListDto.catalogue,
      ),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This Api fetches a list of diagnostic catalogues',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.SUCCESS,
    type: DiagnosticCatalogueListType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
  @Permissions('diagnostic_catalogue_get')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get('catalogues')
  async findAllCatalogues(): Promise<DiagnosticCatalogueListType> {
    return {
      message: ConstantMessage.SUCCESS,
      data: await this.diagnosticCatalogueEntryService.findAllCatalogues(),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This Api fetches a diagnostic catalogue entry',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.DIAGNOSTIC_CATALOGUE_ENTRY_FETCHED,
    type: DiagnosticCatalogueEntryType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
  @Permissions('diagnostic_catalogue_entry_view')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get(':id')
  async findOne(
    @Param() genericParamId: GenericParamID,
  ): Promise<DiagnosticCatalogueEntryType> {
    return {
      message: ConstantMessage.DIAGNOSTIC_CATALOGUE_ENTRY_FETCHED,
      data: await this.diagnosticCatalogueEntryService.findOne(
        genericParamId.id,
      ),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This Api updates a diagnostic catalogue entry',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.DIAGNOSTIC_CATALOGUE_ENTRY_UPDATED,
    type: SuccessMessageResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
  @Permissions('diagnostic_catalogue_entry_update')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Patch(':id')
  async update(
    @Param() genericParamId: GenericParamID,
    @Body()
    updateDiagnosticCatalogueEntryDto: UpdateDiagnosticCatalogueEntryDto,
  ): Promise<SuccessMessageResponse> {
    await this.diagnosticCatalogueEntryService.update(
      genericParamId.id,
      updateDiagnosticCatalogueEntryDto,
    );
    return {
      message: ConstantMessage.DIAGNOSTIC_CATALOGUE_ENTRY_UPDATED,
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This Api deletes a diagnostic catalogue entry',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.DIAGNOSTIC_CATALOGUE_ENTRY_DELETED,
    type: SuccessMessageResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN)
  @Permissions('diagnostic_catalogue_entry_delete')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Delete(':id')
  async remove(
    @Param() genericParamId: GenericParamID,
  ): Promise<SuccessMessageResponse> {
    await this.diagnosticCatalogueEntryService.remove(
      genericParamId.id,
    );
    return {
      message: ConstantMessage.DIAGNOSTIC_CATALOGUE_ENTRY_DELETED,
    };
  }
}
