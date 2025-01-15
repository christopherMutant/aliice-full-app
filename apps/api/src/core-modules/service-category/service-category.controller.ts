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
import { ServiceCategoryService } from './service-category.service';
import { CreateServiceCategoryDto } from './dto/create-service-category.dto';
import { UpdateServiceCategoryDto } from './dto/update-service-category.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ConstantMessage } from '../../constants/constant-messages';
import { ServiceCategoryType } from './types/single-service-category.type';
import { GenericErrorResponse } from '../../shared/types/generic-error.type';
import { Roles } from '../../auth/decorator/roles.decorator';
import { RefRoleKeys } from '../../shared/types/enums';
import { Permissions } from '../../auth/decorator/permission.decorator';
import { BasicGuard } from '../../auth/guards/basic.guard';
import { RolesAndPermissionsGuard } from '../../auth/guards/roles-and-permissions-guard.service';
import { ServiceCategoryListType } from './types/service-category-list.type';
import { GenericParamID } from '../../shared/dtos/generic-params-id.dto';
import { SuccessMessageResponse } from '../../shared/types/success-message.type';
import { ServiceCategoryQueryListingDto } from './dto/service-category-query.dto';
import { ServiceCategoryWithPaginatedChildrenType } from './types/single-service-category-paginated-children.type';

@ApiTags('Service Categories')
@Controller('service-category')
export class ServiceCategoryController {
  constructor(
    private readonly serviceCategoryService: ServiceCategoryService,
  ) {}

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This Api creates a service category',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.SERVICE_CATEGORY_CREATED,
    type: ServiceCategoryType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN)
  @Permissions('service_category_create')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Post()
  async create(
    @Body() createServiceCategoryDto: CreateServiceCategoryDto,
  ): Promise<ServiceCategoryType> {
    return {
      message: ConstantMessage.SERVICE_CATEGORY_CREATED,
      data: await this.serviceCategoryService.create(
        createServiceCategoryDto,
      ),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This Api fetches a list service categories',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.SUCCESS,
    type: ServiceCategoryListType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN)
  @Permissions('service_category_get')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get()
  async findAll(): Promise<ServiceCategoryListType> {
    return {
      message: ConstantMessage.SUCCESS,
      data: await this.serviceCategoryService.findAll(),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api fetches a list of service, service block and service group based on the given service category ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.SERVICE_CATEGORY_FETCHED,
    type: ServiceCategoryWithPaginatedChildrenType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN)
  @Permissions('service_category_view')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get('members/:id')
  async findOne(
    @Param() genericParamId: GenericParamID,
    @Query()
    serviceCategoryQueryListingDto: ServiceCategoryQueryListingDto,
  ): Promise<ServiceCategoryWithPaginatedChildrenType> {
    return await this.serviceCategoryService.findOneWithMembers(
      genericParamId.id,
      serviceCategoryQueryListingDto,
    );
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api updates a service category based on the given service category ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.SERVICE_CATEGORY_UPDATED,
    type: SuccessMessageResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN)
  @Permissions('service_category_update')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Patch(':id')
  async update(
    @Param() genericParamId: GenericParamID,
    @Body() updateServiceCategoryDto: UpdateServiceCategoryDto,
  ): Promise<SuccessMessageResponse> {
    await this.serviceCategoryService.update(
      genericParamId.id,
      updateServiceCategoryDto,
    );
    return { message: ConstantMessage.SERVICE_CATEGORY_UPDATED };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api deletes a service category based on the given service category ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.SERVICE_CATEGORY_DELETED,
    type: SuccessMessageResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN)
  @Permissions('service_category_delete')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Delete(':id')
  async remove(
    @Param() genericParamId: GenericParamID,
  ): Promise<SuccessMessageResponse> {
    await this.serviceCategoryService.remove(genericParamId.id);
    return { message: ConstantMessage.SERVICE_CATEGORY_DELETED };
  }
}
