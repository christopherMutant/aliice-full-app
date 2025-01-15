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
  ParseUUIDPipe,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ConstantMessage } from '../../constants/constant-messages';
import { GenericErrorResponse } from '../../shared/types/generic-error.type';
import { BasicGuard } from '../../auth/guards/basic.guard';
import { RolesListType } from './types/roles-list.types';
import { SuccessMessageResponse } from '../../shared/types/success-message.type';
import { RefRole } from '../all-entities';
import { RefRoleQueryListingDto } from './dto/role-list.dto';
import { RefRolePaginatedListType } from './types/role-paginated-list.type';
import { Permissions } from '../../auth/decorator/permission.decorator';
import { Roles } from '../../auth/decorator/roles.decorator';
import { RefRoleKeys } from '../../shared/types/enums';
import { RolesAndPermissionsGuard } from '../../auth/guards/roles-and-permissions-guard.service';
import { GenericParamID } from '../../shared/dtos/generic-params-id.dto';

@ApiTags('Roles')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This Api will returns the all roles list.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.SUCCESS,
    type: RolesListType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @UseGuards(BasicGuard)
  @Get('list')
  async rolesList(): Promise<RolesListType> {
    return {
      message: ConstantMessage.SUCCESS,
      data: await this.roleService.rolesList(),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This Api creates a new role',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: ConstantMessage.ROLE_CREATED,
    type: CreateRoleDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN)
  @Permissions('role_create')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Post()
  create(
    @Body() createRoleDto: CreateRoleDto,
  ): Promise<CreateRoleDto> {
    return this.roleService.create(createRoleDto);
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This Api finds all the roles',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.SUCCESS,
    type: RefRolePaginatedListType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN)
  @Permissions('role_get')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get()
  findAll(
    @Query() refRoleQueryListingDto: RefRoleQueryListingDto,
  ): Promise<RefRolePaginatedListType> {
    return this.roleService.findAll(refRoleQueryListingDto);
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api finds one the role base on the Id provided',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.SUCCESS,
    type: RefRole,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN)
  @Permissions('role_view')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get(':id')
  findOne(
    @Param() genericParamsId: GenericParamID,
  ): Promise<RefRole> {
    return this.roleService.findOne(genericParamsId.id);
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This Api updates the role base on the id provided',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: ConstantMessage.ROLE_UPDATED,
    type: CreateRoleDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN)
  @Permissions('role_update')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Patch(':id')
  update(
    @Param() genericParamsId: GenericParamID,
    @Body() updateRoleDto: UpdateRoleDto,
  ): Promise<UpdateRoleDto> {
    return this.roleService.update(genericParamsId.id, updateRoleDto);
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This Api delete the role base on the ID provided',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.ROLE_DELETE,
    type: SuccessMessageResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN)
  @Permissions('role_delete')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Delete(':id')
  async remove(
    @Param(new ParseUUIDPipe()) generiParamsId: GenericParamID,
  ): Promise<SuccessMessageResponse> {
    await this.roleService.remove(generiParamsId.id);
    return {
      message: ConstantMessage.ROLE_DELETE,
    };
  }
}
