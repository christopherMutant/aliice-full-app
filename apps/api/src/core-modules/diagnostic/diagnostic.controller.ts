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
import { DiagnosticService } from './diagnostic.service';
import { CreateDiagnosticDto } from './dto/create-diagnostic.dto';
import { UpdateDiagnosticDto } from './dto/update-diagnostic.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ConstantMessage } from '../../constants/constant-messages';
import { GenericErrorResponse } from '../../shared/types/generic-error.type';
import { RefRoleKeys } from '../../shared/types/enums';
import { Roles } from '../../auth/decorator/roles.decorator';
import { Permissions } from '../../auth/decorator/permission.decorator';
import { BasicGuard } from '../../auth/guards/basic.guard';
import { RolesAndPermissionsGuard } from '../../auth/guards/roles-and-permissions-guard.service';
import { DiagnosticListDto } from './dto/diagnostic-list.dto';
import { GenericParamID } from '../../shared/dtos/generic-params-id.dto';
import { SuccessMessageResponse } from '../../shared/types/success-message.type';
import { DiagnosticType } from './types/single-diagnostic-type';
import { DiagnosticListType } from './types/diagnostic-list-type';

@ApiTags('Diagnostics')
@Controller('diagnostic')
export class DiagnosticController {
  constructor(
    private readonly diagnosticService: DiagnosticService,
  ) {}

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This Api creates a diagnostic',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.DIAGNOSTIC_CREATED,
    type: DiagnosticType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
  @Permissions('diagnostic_create')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Post()
  async create(
    @Body() createDiagnosticDto: CreateDiagnosticDto,
  ): Promise<DiagnosticType> {
    return {
      message: ConstantMessage.DIAGNOSTIC_CREATED,
      data: await this.diagnosticService.create(createDiagnosticDto),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api fetches a list of diagnostics based on the provided patient case ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.SUCCESS,
    type: DiagnosticListType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
  @Permissions('diagnostic_get')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get()
  async findAll(
    @Query() diagnosticListDto: DiagnosticListDto,
  ): Promise<DiagnosticListType> {
    return {
      message: ConstantMessage.SUCCESS,
      data: await this.diagnosticService.findAll(diagnosticListDto),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api finds one diagnostic based on the provided diagnostic ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.DIAGNOSTIC_FETCHED,
    type: DiagnosticType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
  @Permissions('diagnostic_view')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get(':id')
  async findOne(
    @Param() genericParamId: GenericParamID,
  ): Promise<DiagnosticType> {
    return {
      message: ConstantMessage.DIAGNOSTIC_FETCHED,
      data: await this.diagnosticService.findOne(genericParamId.id),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api updates one diagnostic based on the provided diagnostic ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.CONSULTATION_UPDATED,
    type: SuccessMessageResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
  @Permissions('diagnostic_update')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Patch(':id')
  async update(
    @Param() genericParamId: GenericParamID,
    @Body() updateDiagnosticDto: UpdateDiagnosticDto,
  ): Promise<SuccessMessageResponse> {
    await this.diagnosticService.update(
      genericParamId.id,
      updateDiagnosticDto,
    );
    return { message: ConstantMessage.DIAGNOSTIC_UPDATED };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api deletes one diagnostic based on the provided diagnostic ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.DIAGNOSTIC_DELETED,
    type: SuccessMessageResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN)
  @Permissions('diagnostic_delete')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Delete(':id')
  async remove(
    @Param() genericParamId: GenericParamID,
  ): Promise<SuccessMessageResponse> {
    await this.diagnosticService.remove(genericParamId.id);
    return { message: ConstantMessage.DIAGNOSTIC_DELETED };
  }
}
