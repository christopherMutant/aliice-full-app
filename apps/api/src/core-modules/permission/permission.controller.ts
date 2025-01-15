import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ConstantMessage } from '../../constants/constant-messages';
import { GenericErrorResponse } from '../../shared/types/generic-error.type';
import { PermissionPaginatedListType } from './types/permission-paginated-list.type';
import { PermissionQueryListingDto } from './dto/permission-list.dto';
import { GenericParamID } from '../../shared/dtos/generic-params-id.dto';
import { Permission } from '../all-entities';
import { SuccessMessageResponse } from '../../shared/types/success-message.type';
import { Roles } from '../../auth/decorator/roles.decorator';
import { Permissions } from '../../auth/decorator/permission.decorator';
import { RefRoleKeys } from '../../shared/types/enums';
import { BasicGuard } from '../../auth/guards/basic.guard';
import { RolesAndPermissionsGuard } from '../../auth/guards/roles-and-permissions-guard.service';

@ApiTags('Permissions')
@Controller('permission')
export class PermissionController {
  constructor(
    private readonly permissionService: PermissionService,
  ) {}

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This Api creates a new permision',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: ConstantMessage.PERMISSION_CREATED,
    type: CreatePermissionDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN)
  @Permissions('permission_create')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Post()
  create(
    @Body() createPermissionDto: CreatePermissionDto,
  ): Promise<CreatePermissionDto> {
    return this.permissionService.create(createPermissionDto);
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This Api finds all the permissions',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.PERMISSION_FETCHED,
    type: PermissionPaginatedListType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN)
  @Permissions('permission_get')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get()
  findAll(
    @Query() permissionQueryListingDto: PermissionQueryListingDto,
  ): Promise<PermissionPaginatedListType> {
    return this.permissionService.findAll(permissionQueryListingDto);
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api finds one permission base on the Id provided',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.SUCCESS,
    type: Permission,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN)
  @Permissions('permission_view')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get(':id')
  findOne(
    @Param() genericParamId: GenericParamID,
  ): Promise<Permission> {
    return this.permissionService.findOne(genericParamId.id);
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api updates the permission base on the id provided',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: ConstantMessage.PERMISSION_UPDATED,
    type: CreatePermissionDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN)
  @Permissions('permission_update')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Patch(':id')
  update(
    @Param() genericParamsId: GenericParamID,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ): Promise<UpdatePermissionDto> {
    return this.permissionService.update(
      genericParamsId.id,
      updatePermissionDto,
    );
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api delete the permission base on the ID provided',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.PERMISSION_DELETE,
    type: SuccessMessageResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN)
  @Permissions('permission_delete')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Delete(':id')
  async remove(
    @Param() genericParamsId: GenericParamID,
  ): Promise<SuccessMessageResponse> {
    await this.permissionService.remove(genericParamsId.id);
    return {
      message: ConstantMessage.PERMISSION_DELETE,
    };
  }
}
