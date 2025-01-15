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
import { LaboratoryRequestService } from './laboratory-request.service';
import { CreateLaboratoryRequestDto } from './dto/create-laboratory-request.dto';
import { UpdateLaboratoryRequestDto } from './dto/update-laboratory-request.dto';
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
import { SuccessMessageResponse } from '../../shared/types/success-message.type';
import { LaboratoryRequestQueryDto } from './dto/laboratory-request-list.dto';
import { LaboratoryRequestType } from './types/single-laboratory-request-type';
import { LaboratoryRequestListType } from './types/laboratory-request-list-type';

@ApiTags('Laboratory Requests')
@Controller('laboratory-request')
export class LaboratoryRequestController {
  constructor(
    private readonly laboratoryRequestService: LaboratoryRequestService,
  ) {}

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This Api creates a laboratory request',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.LABORATORY_REQUEST_CREATED,
    type: LaboratoryRequestType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
  @Permissions('laboratory_request_create')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Post()
  async create(
    @Body() createLaboratoryRequestDto: CreateLaboratoryRequestDto,
  ): Promise<LaboratoryRequestType> {
    return {
      message: ConstantMessage.LABORATORY_REQUEST_CREATED,
      data: await this.laboratoryRequestService.create(
        createLaboratoryRequestDto,
      ),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api fetches a list of laboratory requests based on the given patient ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.SUCCESS,
    type: LaboratoryRequestListType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
  @Permissions('laboratory_request_get')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get()
  async findAll(
    @Query() laboratoryRequestQueryDto: LaboratoryRequestQueryDto,
  ): Promise<LaboratoryRequestListType> {
    return {
      message: ConstantMessage.SUCCESS,
      data: await this.laboratoryRequestService.findAll(
        laboratoryRequestQueryDto,
      ),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api fetches a laboratory request based on the given laboratory request ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.LABORATORY_REQUEST_FETCHED,
    type: LaboratoryRequestType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
  @Permissions('laboratory_request_view')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get(':id')
  async findOne(
    @Param() genericParamId: GenericParamID,
  ): Promise<LaboratoryRequestType> {
    return {
      message: ConstantMessage.LABORATORY_REQUEST_FETCHED,
      data: await this.laboratoryRequestService.findOne(
        genericParamId.id,
      ),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api updates a laboratory request based on the given laboratory request ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.LABORATORY_REQUEST_UPDATED,
    type: SuccessMessageResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
  @Permissions('laboratory_request_update')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Patch(':id')
  async update(
    @Param() genericParamId: GenericParamID,
    @Body() updateLaboratoryRequestDto: UpdateLaboratoryRequestDto,
  ): Promise<SuccessMessageResponse> {
    await this.laboratoryRequestService.update(
      genericParamId.id,
      updateLaboratoryRequestDto,
    );
    return { message: ConstantMessage.LABORATORY_REQUEST_UPDATED };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api deletes a laboratory request based on the given laboratory request ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.LABORATORY_REQUEST_DELETED,
    type: SuccessMessageResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN)
  @Permissions('laboratory_request_delete')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Delete(':id')
  async remove(
    @Param() genericParamId: GenericParamID,
  ): Promise<SuccessMessageResponse> {
    await this.laboratoryRequestService.remove(genericParamId.id);
    return { message: ConstantMessage.LABORATORY_REQUEST_DELETED };
  }
}
