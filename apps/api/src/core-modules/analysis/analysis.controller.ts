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
import { AnalysisService } from './analysis.service';
import { CreateAnalysisDto } from './dto/create-analysis.dto';
import { UpdateAnalysisDto } from './dto/update-analysis.dto';
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
import { SuccessMessageResponse } from '../../shared/types/success-message.type';
import { AnalysisType } from './types/single-analysis-type';
import { AnalysisListType } from './types/analysis-list-type';
import { GenericParamID } from '../../shared/dtos/generic-params-id.dto';
import { AnalysesQueryDto } from './dto/analyses-list.dto';

@ApiTags('Analyses')
@Controller('analysis')
export class AnalysisController {
  constructor(private readonly analysisService: AnalysisService) {}

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This Api creates an analysis',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.ANALYSIS_CREATED,
    type: AnalysisType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
  @Permissions('analysis_create')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Post()
  async create(
    @Body() createAnalysisDto: CreateAnalysisDto,
  ): Promise<AnalysisType> {
    return {
      message: ConstantMessage.ANALYSIS_CREATED,
      data: await this.analysisService.create(createAnalysisDto),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This Api finds a list of all analyses',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.SUCCESS,
    type: AnalysisListType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
  @Permissions('analysis_get')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get()
  async findAll(
    @Query() analysesQueryDto: AnalysesQueryDto,
  ): Promise<AnalysisListType> {
    return {
      message: ConstantMessage.SUCCESS,
      data: await this.analysisService.findAll(analysesQueryDto),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api finds one analysis based on the provided analysis ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.ANALYSIS_FETCHED,
    type: AnalysisType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
  @Permissions('analysis_view')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get(':id')
  async findOne(
    @Param() genericParamID: GenericParamID,
  ): Promise<AnalysisType> {
    return {
      message: ConstantMessage.SUCCESS,
      data: await this.analysisService.findOne(genericParamID.id),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api updates the analysis based on the provided analysis ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.ANALYSIS_UPDATED,
    type: SuccessMessageResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
  @Permissions('analysis_update')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Patch(':id')
  async update(
    @Param() genericParamID: GenericParamID,
    @Body() updateAnalysisDto: UpdateAnalysisDto,
  ): Promise<SuccessMessageResponse> {
    await this.analysisService.update(
      genericParamID.id,
      updateAnalysisDto,
    );
    return {
      message: ConstantMessage.ANALYSIS_UPDATED,
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api deletes one analysis based on the provided analysis ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.ANALYSIS_DELETED,
    type: SuccessMessageResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
  @Permissions('analysis_delete')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Delete(':id')
  async remove(
    @Param() genericParamID: GenericParamID,
  ): Promise<SuccessMessageResponse> {
    await this.analysisService.remove(genericParamID.id);
    return { message: ConstantMessage.ANALYSIS_DELETED };
  }
}
