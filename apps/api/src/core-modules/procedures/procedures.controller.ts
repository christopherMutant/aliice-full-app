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
import { ProceduresService } from './procedures.service';
import { CreateProcedureDto } from './dto/create-procedure.dto';
import { UpdateProcedureDto } from './dto/update-procedure.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ConstantMessage } from '../../constants/constant-messages';
import { ProceduresType } from './types/single-procedures.type';
import { GenericErrorResponse } from '../../shared/types/generic-error.type';
import { Roles } from '../../auth/decorator/roles.decorator';
import { RefRoleKeys } from '../../shared/types/enums';
import { Permissions } from '../../auth/decorator/permission.decorator';
import { BasicGuard } from '../../auth/guards/basic.guard';
import { RolesAndPermissionsGuard } from '../../auth/guards/roles-and-permissions-guard.service';
import { GenericParamID } from '../../shared/dtos/generic-params-id.dto';
import { SuccessMessageResponse } from '../../shared/types/success-message.type';

@ApiTags('Procedures')
@Controller('procedures')
export class ProceduresController {
  constructor(
    private readonly proceduresService: ProceduresService,
  ) {}

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api creates a procedures object for the patient case',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.PROCEDURES_CREATED,
    type: ProceduresType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(
    RefRoleKeys.SUPER_ADMIN,
    RefRoleKeys.DOCTOR,
    RefRoleKeys.FRONT_DESK,
  )
  @Permissions('procedures_create')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Post()
  async create(
    @Body() createProcedureDto: CreateProcedureDto,
  ): Promise<ProceduresType> {
    return {
      message: ConstantMessage.PROCEDURES_CREATED,
      data: await this.proceduresService.create(createProcedureDto),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This Api fetches a procedures object',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.PROCEDURES_FETCHED,
    type: ProceduresType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(
    RefRoleKeys.SUPER_ADMIN,
    RefRoleKeys.DOCTOR,
    RefRoleKeys.FRONT_DESK,
  )
  @Permissions('procedures_view')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get(':id')
  async findOne(
    @Param() genericParamId: GenericParamID,
  ): Promise<ProceduresType> {
    return {
      message: ConstantMessage.PROCEDURES_FETCHED,
      data: await this.proceduresService.findOne(genericParamId.id),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This Api updates a procedures object',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.PROCEDURES_UPDATED,
    type: SuccessMessageResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(
    RefRoleKeys.SUPER_ADMIN,
    RefRoleKeys.DOCTOR,
    RefRoleKeys.FRONT_DESK,
  )
  @Permissions('procedures_update')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Patch(':id')
  async update(
    @Param() genericParamId: GenericParamID,
    @Body() updateProcedureDto: UpdateProcedureDto,
  ): Promise<SuccessMessageResponse> {
    await this.proceduresService.update(
      genericParamId.id,
      updateProcedureDto,
    );

    return {
      message: ConstantMessage.PROCEDURES_UPDATED,
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This Api deletes a procedures object',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.PROCEDURES_DELETED,
    type: SuccessMessageResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(
    RefRoleKeys.SUPER_ADMIN,
    RefRoleKeys.DOCTOR,
    RefRoleKeys.FRONT_DESK,
  )
  @Permissions('procedures_delete')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Delete(':id')
  async remove(
    @Param() genericParamId: GenericParamID,
  ): Promise<SuccessMessageResponse> {
    await this.proceduresService.remove(genericParamId.id);

    return {
      message: ConstantMessage.PROCEDURES_DELETED,
    };
  }
}
