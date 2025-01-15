import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AnalysisResultsService } from './analysis-results.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from '../../auth/decorator/roles.decorator';
import { RefRoleKeys } from '../../shared/types/enums';
import { Permissions } from '../../auth/decorator/permission.decorator';
import { BasicGuard } from '../../auth/guards/basic.guard';
import { RolesAndPermissionsGuard } from '../../auth/guards/roles-and-permissions-guard.service';
import { CreateAnalysisResultDto } from './dto/create-analysis-result.dto';
import { UpdateAnalysisResultDto } from './dto/update-analysis-result.dto';
import { ConstantMessage } from '../../constants/constant-messages';
import { GenericErrorResponse } from '../../shared/types/generic-error.type';
import { AnalysisResultType } from './types/single-analysis-result-type';
import { GenericParamID } from '../../shared/dtos/generic-params-id.dto';
import { SuccessMessageResponse } from '../../shared/types/success-message.type';
import { AnalysisResultQueryDto } from './dto/analysis-result-list.dto';
import { AnalysisResultListType } from './types/analysis-result-list-type';

@ApiTags('Analysis Results')
@Controller('analysis-results')
export class AnalysisResultsController {
  constructor(
    private readonly analysisResultsService: AnalysisResultsService,
  ) {}

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This Api creates an analysis result',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.ANALYSIS_RESULT_CREATED,
    type: AnalysisResultType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
  @Permissions('analysis_result_create')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Post()
  async create(
    @Body() createAnalysisResultDto: CreateAnalysisResultDto,
  ): Promise<AnalysisResultType> {
    return {
      message: ConstantMessage.ANALYSIS_RESULT_CREATED,
      data: await this.analysisResultsService.create(
        createAnalysisResultDto,
      ),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api fetches a list of analysis results based on the given patient ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.SUCCESS,
    type: AnalysisResultListType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
  @Permissions('analysis_result_get')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get()
  async findAll(
    @Query() analysisResultQueryDto: AnalysisResultQueryDto,
  ): Promise<AnalysisResultListType> {
    return {
      message: ConstantMessage.SUCCESS,
      data: await this.analysisResultsService.findAll(
        analysisResultQueryDto,
      ),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api finds one analysis result based on the provided analysis result ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.ANALYSIS_RESULT_FETCHED,
    type: AnalysisResultType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
  @Permissions('analysis_result_view')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get(':id')
  async findOne(
    @Param() genericParamID: GenericParamID,
  ): Promise<AnalysisResultType> {
    return {
      message: ConstantMessage.ANALYSIS_RESULT_FETCHED,
      data: await this.analysisResultsService.findOne(
        genericParamID.id,
      ),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api updates the analysis result based on the provided analysis resultID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.ANALYSIS_RESULT_UPDATED,
    type: SuccessMessageResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
  @Permissions('analysis_result_update')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Patch(':id')
  async update(
    @Param() genericParamID: GenericParamID,
    @Body() updateAnalysisResultDto: UpdateAnalysisResultDto,
  ): Promise<SuccessMessageResponse> {
    await this.analysisResultsService.update(
      genericParamID.id,
      updateAnalysisResultDto,
    );

    return { message: ConstantMessage.ANALYSIS_RESULT_UPDATED };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api deletes one analysis result based on the provided analysis result ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.ANALYSIS_RESULT_DELETED,
    type: SuccessMessageResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
  @Permissions('analysis_result_delete')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Delete(':id')
  async remove(
    @Param() genericParamID: GenericParamID,
  ): Promise<SuccessMessageResponse> {
    await this.analysisResultsService.remove(genericParamID.id);
    return { message: ConstantMessage.ANALYSIS_RESULT_DELETED };
  }
}
