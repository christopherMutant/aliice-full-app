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
import { CategoryReferenceService } from './category_reference.service';
import { CreateCategoryReferenceDto } from './dto/create-category_reference.dto';
import { UpdateCategoryReferenceDto } from './dto/update-category_reference.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ConstantMessage } from '../../constants/constant-messages';
import { CategoryReferenceType } from './types/category-reference.type';
import { GenericErrorResponse } from '../../shared/types/generic-error.type';
import { Roles } from '../../auth/decorator/roles.decorator';
import { RefRoleKeys } from '../../shared/types/enums';
import { Permissions } from '../../auth/decorator/permission.decorator';
import { BasicGuard } from '../../auth/guards/basic.guard';
import { RolesAndPermissionsGuard } from '../../auth/guards/roles-and-permissions-guard.service';
import { SuccessMessageResponse } from '../../shared/types/success-message.type';
import { GenericParamID } from '../../shared/dtos/generic-params-id.dto';
import { PaginatedCategoryReferenceType } from './types/category-reference-paginated-list.type';
import { CategoryReferenceQueryListingDto } from './dto/category-reference-list.dto';
import { CategoryReferenceListType } from './types/category-reference-list';

@ApiTags('Category Reference')
@Controller('category-reference')
export class CategoryReferenceController {
  constructor(
    private readonly categoryReferenceService: CategoryReferenceService,
  ) {}

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This Api creates a new reference category',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: ConstantMessage.CATEGORY_REFERENCE_CREATED,
    type: CategoryReferenceType,
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
  @Permissions('category_reference_create')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Post()
  async create(
    @Body() createCategoryReferenceDto: CreateCategoryReferenceDto,
  ): Promise<CategoryReferenceType> {
    return {
      message: ConstantMessage.CATEGORY_REFERENCE_CREATED,
      data: await this.categoryReferenceService.create(
        createCategoryReferenceDto,
      ),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api returns a list of reference category or a specific category base on the query',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.CATEGORY_REFERENCE_FETCHED,
    type: PaginatedCategoryReferenceType,
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
  @Permissions('category_reference_get')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get()
  async findAll(
    @Query()
    categoryReferenceQueryListingDto: CategoryReferenceQueryListingDto,
  ): Promise<PaginatedCategoryReferenceType> {
    return await this.categoryReferenceService.findAll(
      categoryReferenceQueryListingDto,
    );
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This Api returns a list of reference categories',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.CATEGORY_REFERENCE_FETCHED,
    type: CategoryReferenceListType,
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
  @Permissions('category_reference_get')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get('list')
  async findAllList(): Promise<CategoryReferenceListType> {
    return {
      message: ConstantMessage.CATEGORY_REFERENCE_FETCHED,
      data: await this.categoryReferenceService.freeReferenceCategoryList(),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api updates a reference category based on the id provided',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.CATEGORY_REFERENCE_UPDATED,
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
  @Permissions('category_reference_update')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Patch(':id')
  async update(
    @Param() genericParamId: GenericParamID,
    @Body() updateCategoryReferenceDto: UpdateCategoryReferenceDto,
  ): Promise<SuccessMessageResponse> {
    await this.categoryReferenceService.update(
      genericParamId.id,
      updateCategoryReferenceDto,
    );
    return {
      message: ConstantMessage.CATEGORY_REFERENCE_UPDATED,
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api deletes a reference category based on the id provided',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.CATEGORY_REFERENCE_DELETE,
    type: SuccessMessageResponse,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.DOCTOR)
  @Permissions('category_reference_delete')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Delete(':id')
  async remove(
    @Param() genericParamId: GenericParamID,
  ): Promise<SuccessMessageResponse> {
    await this.categoryReferenceService.remove(genericParamId.id);
    return {
      message: ConstantMessage.CATEGORY_REFERENCE_DELETE,
    };
  }
}
