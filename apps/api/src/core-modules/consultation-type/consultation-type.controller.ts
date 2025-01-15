import {
  Controller,
  Get,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ConsultationTypeService } from './consultation-type.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ConstantMessage } from '../../constants/constant-messages';
import { GenericErrorResponse } from '../../shared/types/generic-error.type';
import { Roles } from '../../auth/decorator/roles.decorator';
import { RefRoleKeys } from '../../shared/types/enums';
import { Permissions } from '../../auth/decorator/permission.decorator';
import { BasicGuard } from '../../auth/guards/basic.guard';
import { RolesAndPermissionsGuard } from '../../auth/guards/roles-and-permissions-guard.service';
import { GenericParamID } from '../../shared/dtos/generic-params-id.dto';
import { ConsultationTypeType } from './types/single-consultation-type-type';
import { ConsultationTypeListType } from './types/consultation-type-list-type';

@ApiTags('Consultation Types')
@Controller('consultation-type')
export class ConsultationTypeController {
  constructor(
    private readonly consultationTypeService: ConsultationTypeService,
  ) {}

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This Api find all consultation types',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.CONSULTATION_TYPE_FETCHED,
    type: ConsultationTypeListType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
  @Permissions('consultation_type_get')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get()
  async findAll(): Promise<ConsultationTypeListType> {
    return {
      message: ConstantMessage.CONSULTATION_TYPE_FETCHED,
      data: await this.consultationTypeService.findAll(),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api finds one consultation type based on the provided consultation type ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.CONSULTATION_TYPE_FETCHED,
    type: ConsultationTypeType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
  @Permissions('consultation_type_view')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get(':id')
  async findOne(
    @Param() genericParamsId: GenericParamID,
  ): Promise<ConsultationTypeType> {
    return {
      message: ConstantMessage.CONSULTATION_TYPE_FETCHED,
      data: await this.consultationTypeService.findOne(
        genericParamsId.id,
      ),
    };
  }
}
