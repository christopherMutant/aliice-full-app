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
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ConstantMessage } from '../../constants/constant-messages';
import { GenericErrorResponse } from '../../shared/types/generic-error.type';
import { BasicGuard } from '../../auth/guards/basic.guard';
import { DepartmentListType } from './types/department-list.type';
import { DepartmentType } from './types/single-department.type';
import { GenericParamID } from '../../shared/dtos/generic-params-id.dto';
import { SuccessMessageResponse } from '../../shared/types/success-message.type';
import { Roles } from '../../auth/decorator/roles.decorator';
import { RefRoleKeys } from '../../shared/types/enums';
import { Permissions } from '../../auth/decorator/permission.decorator';
import { RolesAndPermissionsGuard } from '../../auth/guards/roles-and-permissions-guard.service';
import { DepartmentQueryListingDto } from './dto/department-list.dto';
import { DepartmentPaginatedListType } from './types/department-paginated-list.type';

@ApiTags('Departments')
@Controller('departments')
export class DepartmentsController {
  constructor(
    private readonly departmentsService: DepartmentsService,
  ) {}

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This Api will returns the all departments list.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.SUCCESS,
    type: DepartmentListType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @UseGuards(BasicGuard)
  @Get('list')
  async rolesList(): Promise<DepartmentListType> {
    return {
      message: ConstantMessage.SUCCESS,
      data: await this.departmentsService.departmentsList(),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This Api creates a new department',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: ConstantMessage.RECORD_CREATED,
    type: CreateDepartmentDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
  @Permissions('department_create')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Post()
  async create(
    @Body() createDepartmentDto: CreateDepartmentDto,
  ): Promise<DepartmentType> {
    return {
      message: ConstantMessage.SUCCESS,
      data: await this.departmentsService.create(createDepartmentDto),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This Api finds all the departments',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.SUCCESS,
    type: DepartmentPaginatedListType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
  @Permissions('department_get')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get()
  findAll(
    @Query() departmentQueryListingDto: DepartmentQueryListingDto,
  ): Promise<DepartmentPaginatedListType> {
    return this.departmentsService.findAll(departmentQueryListingDto);
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api finds one the departments base on the Id provided',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.SUCCESS,
    type: DepartmentType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
  @Permissions('department_view')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get(':id')
  async findOne(
    @Param() genericParamsId: GenericParamID,
  ): Promise<DepartmentType> {
    return {
      message: ConstantMessage.SUCCESS,
      data: await this.departmentsService.findOne(genericParamsId.id),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api updates the department table base on the ID provided',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.DEPARTMENT_UPDATED,
    type: SuccessMessageResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
  @Permissions('department_update')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Patch(':id')
  async update(
    @Param() genericParamsId: GenericParamID,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ): Promise<SuccessMessageResponse> {
    await this.departmentsService.update(
      genericParamsId.id,
      updateDepartmentDto,
    );

    return {
      message: ConstantMessage.DEPARTMENT_UPDATED,
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api delete the department base on the ID provided',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.DEPARTMENT_DELETE,
    type: SuccessMessageResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN)
  @Permissions('department_delete')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Delete(':id')
  async remove(
    @Param() genericParamsId: GenericParamID,
  ): Promise<SuccessMessageResponse> {
    await this.departmentsService.remove(genericParamsId.id);
    return {
      message: ConstantMessage.DEPARTMENT_DELETE,
    };
  }
}
