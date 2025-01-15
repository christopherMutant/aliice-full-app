import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ServiceGroupService } from './service-group.service';
import { CreateServiceGroupDto } from './dto/create-service-group.dto';
import { UpdateServiceGroupDto } from './dto/update-service-group.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ServiceGroupListQueryListingDto } from './dto/service-group-list.dto';
import { ConstantMessage } from '../../constants/constant-messages';
import { ServiceGroupType } from './types/single-service-group.type';
import { GenericErrorResponse } from '../../shared/types/generic-error.type';
import { Roles } from '../../auth/decorator/roles.decorator';
import { RefRoleKeys } from '../../shared/types/enums';
import { Permissions } from '../../auth/decorator/permission.decorator';
import { BasicGuard } from '../../auth/guards/basic.guard';
import { RolesAndPermissionsGuard } from '../../auth/guards/roles-and-permissions-guard.service';
import { ServiceGroupPaginatedListType } from './types/service-group-list.type';
import { GenericParamID } from '../../shared/dtos/generic-params-id.dto';
import { SuccessMessageResponse } from '../../shared/types/success-message.type';

@ApiTags('Service Groups')
@Controller('service-group')
export class ServiceGroupController {
  constructor(
    private readonly serviceGroupService: ServiceGroupService,
  ) {}

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This Api creates a service group',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.SERVICE_GROUP_CREATED,
    type: ServiceGroupType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN)
  @Permissions('service_group_create')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Post()
  async create(
    @Body() createServiceGroupDto: CreateServiceGroupDto,
  ): Promise<ServiceGroupType> {
    return {
      message: ConstantMessage.SERVICE_GROUP_CREATED,
      data: await this.serviceGroupService.create(
        createServiceGroupDto,
      ),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This Api fetches a list service groups',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.SUCCESS,
    type: ServiceGroupPaginatedListType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN)
  @Permissions('service_group_get')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get()
  async findAll(
    @Query()
    serviceGroupListQueryListingDto: ServiceGroupListQueryListingDto,
  ): Promise<ServiceGroupPaginatedListType> {
    return await this.serviceGroupService.findAll(
      serviceGroupListQueryListingDto,
    );
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api fetches a service group based on the given service group ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.SERVICE_GROUP_FETCHED,
    type: ServiceGroupType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN)
  @Permissions('service_group_view')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get(':id')
  async findOne(
    @Param() genericParamId: GenericParamID,
  ): Promise<ServiceGroupType> {
    return {
      message: ConstantMessage.SERVICE_GROUP_FETCHED,
      data: await this.serviceGroupService.findOne(genericParamId.id),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api updates a service group based on the given service group ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.SERVICE_GROUP_UPDATED,
    type: SuccessMessageResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN)
  @Permissions('service_group_update')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Patch(':id')
  async update(
    @Param() genericParamId: GenericParamID,
    @Body() updateServiceGroupDto: UpdateServiceGroupDto,
  ): Promise<SuccessMessageResponse> {
    await this.serviceGroupService.update(
      genericParamId.id,
      updateServiceGroupDto,
    );
    return { message: ConstantMessage.SERVICE_GROUP_UPDATED };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api deletes a service group based on the given service group ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.SERVICE_GROUP_DELETED,
    type: SuccessMessageResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN)
  @Permissions('service_group_delete')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Delete(':id')
  async remove(
    @Param() genericParamId: GenericParamID,
  ): Promise<SuccessMessageResponse> {
    await this.serviceGroupService.remove(genericParamId.id);
    return { message: ConstantMessage.SERVICE_GROUP_DELETED };
  }
}
