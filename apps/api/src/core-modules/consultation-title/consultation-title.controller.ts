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
} from '@nestjs/common';
import { ConsultationTitleService } from './consultation-title.service';
import { CreateConsultationTitleDto } from './dto/create-consultation_title.dto';
import { UpdateConsultationTitleDto } from './dto/update-consultation_title.dto';
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
import { GenericParamID } from '../../shared/dtos/generic-params-id.dto';
import { SuccessMessageResponse } from '../../shared/types/success-message.type';
import { ConsultationTitleType } from './types/single-consultation-title-type';
import { ConsultationTitleListType } from './types/consultation-title-list-type';

@ApiTags('Consultation Titles')
@Controller('consultation-title')
export class ConsultationTitleController {
  constructor(
    private readonly consultationTitleService: ConsultationTitleService,
  ) {}

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This Api creates a consultation title',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.CONSULTATION_TITLE_CREATED,
    type: ConsultationTitleType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
  @Permissions('consultation_title_create')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Post()
  async create(
    @Body() createConsultationTitleDto: CreateConsultationTitleDto,
  ): Promise<ConsultationTitleType> {
    return {
      message: ConstantMessage.CONSULTATION_TITLE_CREATED,
      data: await this.consultationTitleService.create(
        createConsultationTitleDto,
      ),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api finds one consultation title based on the provided consultation title ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.CONSULTATION_TITLE_FETCHED,
    type: ConsultationTitleListType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
  @Permissions('consultation_title_get')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get()
  async findAll(): Promise<ConsultationTitleListType> {
    return {
      message: ConstantMessage.CONSULTATION_TITLE_FETCHED,
      data: await this.consultationTitleService.findAll(),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api finds one consultation title based on the provided consultation title ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.CONSULTATION_TYPE_FETCHED,
    type: ConsultationTitleType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
  @Permissions('consultation_title_view')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get(':id')
  async findOne(
    @Param() genericParamsId: GenericParamID,
  ): Promise<ConsultationTitleType> {
    return {
      message: ConstantMessage.CONSULTATION_TITLE_FETCHED,
      data: await this.consultationTitleService.findOne(
        genericParamsId.id,
      ),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api updates the consultation title based on the provided consultation title ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.CONSULTATION_TITLE_UPDATED,
    type: SuccessMessageResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
  @Permissions('consultation_title_update')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Patch(':id')
  async update(
    @Param() genericParamsId: GenericParamID,
    @Body() updateConsultationTitleDto: UpdateConsultationTitleDto,
  ): Promise<SuccessMessageResponse> {
    await this.consultationTitleService.update(
      genericParamsId.id,
      updateConsultationTitleDto,
    );
    return { message: ConstantMessage.CONSULTATION_TITLE_UPDATED };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api deletes one consultation title based on the provided consultation title ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.CONSULTATION_TITLE_DELETED,
    type: SuccessMessageResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN)
  @Permissions('consultation_title_delete')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Delete(':id')
  async remove(
    @Param() genericParamsId: GenericParamID,
  ): Promise<SuccessMessageResponse> {
    await this.consultationTitleService.remove(genericParamsId.id);
    return { message: ConstantMessage.CONSULTATION_TITLE_DELETED };
  }
}
