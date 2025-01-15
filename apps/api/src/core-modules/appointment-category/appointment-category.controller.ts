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
import { AppointmentCategoryService } from './appointment-category.service';
import { CreateAppointmentCategoryDto } from './dto/create-appointment_category.dto';
import { UpdateAppointmentCategoryDto } from './dto/update-appointment_category.dto';
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
import { AppointmentCategoryQueryListingDto } from './dto/appointment-category-list.dto';
import { PaginatedAppointmentCategoryType } from './types/appointment-category-paginated.type';
import { AppointmentCategoryType } from './types/single-appointment-category.type';
import { SuccessMessageResponse } from '../../shared/types/success-message.type';
import { GenericParamID } from '../../shared/dtos/generic-params-id.dto';
import { AppointmentCategoryListType } from './types/appointment-category-list.type';

@ApiTags('Appointment Category')
@Controller('appointment-category')
export class AppointmentCategoryController {
  constructor(
    private readonly appointmentCategoryService: AppointmentCategoryService,
  ) {}

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This Api creates a new appointment category',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: ConstantMessage.APPOINTMENT_CATEGORY_CREATED,
    type: AppointmentCategoryType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
  @Permissions('appointment_category_create')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Post()
  async create(
    @Body()
    createAppointmentCategoryDto: CreateAppointmentCategoryDto,
  ): Promise<AppointmentCategoryType> {
    return {
      message: ConstantMessage.APPOINTMENT_CATEGORY_CREATED,
      data: await this.appointmentCategoryService.create(
        createAppointmentCategoryDto,
      ),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api finds the list of the appointment categories based on the query provided, returns all if no query exists',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.SUCCESS,
    type: PaginatedAppointmentCategoryType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
  @Permissions('appointment_category_get')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get()
  async findAll(
    @Query()
    appointmentCategoryQueryListingDto: AppointmentCategoryQueryListingDto,
  ): Promise<PaginatedAppointmentCategoryType> {
    return await this.appointmentCategoryService.findAll(
      appointmentCategoryQueryListingDto,
    );
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api finds the list of the appointment categories based on the query provided, returns all if no query exists',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.SUCCESS,
    type: AppointmentCategoryListType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
  @Permissions('appointment_category_get_list')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get('list')
  async findAllList(): Promise<AppointmentCategoryListType> {
    return {
      message: ConstantMessage.APPOINTMENT_STATUS_FETCHED,
      data: await this.appointmentCategoryService.findAllList(),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api finds one appointment category based on the ID provided',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.SUCCESS,
    type: AppointmentCategoryType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
  @Permissions('appointment_category_view')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get(':id')
  async findOne(
    @Param() genericParamsId: GenericParamID,
  ): Promise<AppointmentCategoryType> {
    return {
      message: ConstantMessage.APPOINTMENT_CATEGORY_FETCHED,
      data: await this.appointmentCategoryService.findOne(
        genericParamsId.id,
      ),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api updates the appointment category based on the ID provided',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.APPOINTMENT_CATEGORY_UPDATED,
    type: SuccessMessageResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
  @Permissions('appointment_category_update')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Patch(':id')
  async update(
    @Param() genericParamsId: GenericParamID,
    @Body()
    updateAppointmentCategoryDto: UpdateAppointmentCategoryDto,
  ): Promise<SuccessMessageResponse> {
    await this.appointmentCategoryService.update(
      genericParamsId.id,
      updateAppointmentCategoryDto,
    );
    return { message: ConstantMessage.APPOINTMENT_CATEGORY_UPDATED };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api deletes the appointment category based on the ID provided',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.APPOINTMENT_CATEGORY_DELETE,
    type: SuccessMessageResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN)
  @Permissions('appointment_category_delete')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Delete(':id')
  async remove(
    @Param() genericParamsId: GenericParamID,
  ): Promise<SuccessMessageResponse> {
    await this.appointmentCategoryService.remove(genericParamsId.id);
    return { message: ConstantMessage.APPOINTMENT_CATEGORY_DELETE };
  }
}
