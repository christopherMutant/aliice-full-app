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
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
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
import { ServiceListQueryListingDto } from './dto/service-list.dto';
import { ServicePaginatedListType } from './types/service-list.type';
import { ServiceType } from './types/single-service.type';

@ApiTags('Services')
@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This Api creates a service',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.SERVICE_CREATED,
    type: ServiceType,
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
  @Permissions('service_create')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Post()
  async create(
    @Body() createServiceDto: CreateServiceDto,
  ): Promise<ServiceType> {
    return {
      message: ConstantMessage.SERVICE_CREATED,
      data: await this.serviceService.create(createServiceDto),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This Api fetches a list of services',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.SUCCESS,
    type: ServicePaginatedListType,
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
  @Permissions('service_get')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get()
  async findAll(
    @Query() serviceListQueryListingDto: ServiceListQueryListingDto,
  ): Promise<ServicePaginatedListType> {
    return await this.serviceService.findAll(
      serviceListQueryListingDto,
    );
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api fetches a service based on the given service ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.SERVICE_FETCHED,
    type: ServiceType,
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
  @Permissions('service_view')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get(':id')
  async findOne(
    @Param() genericParamId: GenericParamID,
  ): Promise<ServiceType> {
    return {
      message: ConstantMessage.SERVICE_FETCHED,
      data: await this.serviceService.findOne(genericParamId.id),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api updates a service based on the given service ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.SERVICE_UPDATED,
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
  @Permissions('service_update')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Patch(':id')
  async update(
    @Param() genericParamId: GenericParamID,
    @Body() updateServiceDto: UpdateServiceDto,
  ): Promise<SuccessMessageResponse> {
    await this.serviceService.update(
      genericParamId.id,
      updateServiceDto,
    );

    return { message: ConstantMessage.SERVICE_UPDATED };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api deletes a service based on the given service ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.SERVICE_DELETED,
    type: SuccessMessageResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN)
  @Permissions('service_delete')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Delete(':id')
  async remove(
    @Param() genericParamId: GenericParamID,
  ): Promise<SuccessMessageResponse> {
    await this.serviceService.remove(genericParamId.id);
    return { message: ConstantMessage.SERVICE_DELETED };
  }
}
