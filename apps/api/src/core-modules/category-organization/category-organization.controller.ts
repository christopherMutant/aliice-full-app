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
import { CategoryOrganizationService } from './category-organization.service';
import { CreateCategoryOrganizationDto } from './dto/create-category-organization.dto';
import { UpdateCategoryOrganizationDto } from './dto/update-category-organization.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ConstantMessage } from '../../constants/constant-messages';
import { CategoryOraganizationType } from './types/category-organization.type';
import { GenericErrorResponse } from '../../shared/types/generic-error.type';
import { Roles } from '../../auth/decorator/roles.decorator';
import { RefRoleKeys } from '../../shared/types/enums';
import { Permissions } from '../../auth/decorator/permission.decorator';
import { BasicGuard } from '../../auth/guards/basic.guard';
import { RolesAndPermissionsGuard } from '../../auth/guards/roles-and-permissions-guard.service';
import { SuccessMessageResponse } from '../../shared/types/success-message.type';
import { GenericParamID } from '../../shared/dtos/generic-params-id.dto';
import { CategoryOrganizationListType } from './types/category-organization.list.type';

@ApiTags('Category Organization')
@Controller('category-organization')
export class CategoryOrganizationController {
  constructor(
    private readonly categoryOrganizationService: CategoryOrganizationService,
  ) {}

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This api creates new category organization',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: ConstantMessage.CATEGORY_ORGANIZATION_CREATED,
    type: CategoryOraganizationType,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(
    RefRoleKeys.SUPER_ADMIN,
    RefRoleKeys.DOCTOR,
    RefRoleKeys.FRONT_DESK,
  )
  @Permissions('category_organization_create')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Post()
  async create(
    @Body()
    createCategoryOrganizationDto: CreateCategoryOrganizationDto,
  ): Promise<CategoryOraganizationType> {
    return {
      message: ConstantMessage.CATEGORY_ORGANIZATION_CREATED,
      data: await this.categoryOrganizationService.create(
        createCategoryOrganizationDto,
      ),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This api returns a list of category organization',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: ConstantMessage.CATEGORY_ORGANIZATION_CREATED,
    type: CategoryOrganizationListType,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(
    RefRoleKeys.SUPER_ADMIN,
    RefRoleKeys.DOCTOR,
    RefRoleKeys.FRONT_DESK,
  )
  @Permissions('category_organization_get')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get('list')
  async categoryOrganizationList(): Promise<CategoryOrganizationListType> {
    return {
      message: ConstantMessage.SUCCESS,
      data: await this.categoryOrganizationService.categoryOrganizationList(),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This api updates a category organization based on the id provided',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.CATEGORY_ORGANIZATION_UPDATED,
    type: SuccessMessageResponse,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(
    RefRoleKeys.SUPER_ADMIN,
    RefRoleKeys.DOCTOR,
    RefRoleKeys.FRONT_DESK,
  )
  @Permissions('category_organization_update')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Patch(':id')
  async update(
    @Param() genericParamId: GenericParamID,
    @Body()
    updateCategoryOrganizationDto: UpdateCategoryOrganizationDto,
  ): Promise<SuccessMessageResponse> {
    await this.categoryOrganizationService.update(
      genericParamId.id,
      updateCategoryOrganizationDto,
    );
    return {
      message: ConstantMessage.CATEGORY_ORGANIZATION_UPDATED,
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This api deletes a category organization based on the id provided',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.CATEGORY_ORGANIZATION_DELETE,
    type: SuccessMessageResponse,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.DOCTOR)
  @Permissions('category_organization_delete')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Delete(':id')
  async remove(
    @Param() genericParamId: GenericParamID,
  ): Promise<SuccessMessageResponse> {
    await this.categoryOrganizationService.remove(genericParamId.id);
    return {
      message: ConstantMessage.CATEGORY_ORGANIZATION_DELETE,
    };
  }
}
