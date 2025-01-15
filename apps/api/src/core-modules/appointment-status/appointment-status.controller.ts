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
import { AppointmentStatusService } from './appointment-status.service';
import { CreateAppointmentStatusDto } from './dto/create-appointment-status.dto';
import { UpdateAppointmentStatusDto } from './dto/update-appointment-status.dto';
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
import { AppointmentStatusQueryListingDto } from './dto/appointment-status-list.dto';
import { GenericParamID } from '../../shared/dtos/generic-params-id.dto';
import { SuccessMessageResponse } from '../../shared/types/success-message.type';
import { AppointmentStatusType } from './types/single-appointment-status.type';
import { PaginatedAppointmentStatusType } from './types/appointment-status-paginated.type';
import { AppointmentStatusListType } from './types/appointment-status-list.type copy';

@ApiTags('Appointment Status')
@Controller('appointment-status')
export class AppointmentStatusController {
  constructor(
    private readonly appointmentStatusService: AppointmentStatusService,
  ) {}

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This Api creates a new appointment status',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: ConstantMessage.APPOINTMENT_STATUS_CREATED,
    type: AppointmentStatusType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
  @Permissions('appointment_status_create')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Post()
  async create(
    @Body() createAppointmentStatusDto: CreateAppointmentStatusDto,
  ): Promise<AppointmentStatusType> {
    return {
      message: ConstantMessage.APPOINTMENT_STATUS_CREATED,
      data: await this.appointmentStatusService.create(
        createAppointmentStatusDto,
      ),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api finds the list of the appointment status based on the query provided, returns all if no query exists',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.SUCCESS,
    type: PaginatedAppointmentStatusType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
  @Permissions('appointment_status_get')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get()
  async findAll(
    @Query()
    appointmentStatusQueryListingDto: AppointmentStatusQueryListingDto,
  ): Promise<PaginatedAppointmentStatusType> {
    return await this.appointmentStatusService.findAll(
      appointmentStatusQueryListingDto,
    );
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This Api finds the list of all appointment status',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.SUCCESS,
    type: AppointmentStatusListType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
  @Permissions('appointment_status_get_list')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get('list')
  async findAllList(): Promise<AppointmentStatusListType> {
    return {
      message: ConstantMessage.APPOINTMENT_STATUS_FETCHED,
      data: await this.appointmentStatusService.findAllList(),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api finds one appointment status based on the ID provided',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.SUCCESS,
    type: AppointmentStatusType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN)
  @Permissions('appointment_status_view')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get(':id')
  async findOne(
    @Param() genericParamsId: GenericParamID,
  ): Promise<AppointmentStatusType> {
    return {
      message: ConstantMessage.APPOINTMENT_STATUS_FETCHED,
      data: await this.appointmentStatusService.findOne(
        genericParamsId.id,
      ),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api updates the appointment based on the ID provided',
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
  @Permissions('appointment_status_update')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Patch(':id')
  async update(
    @Param() genericParamsId: GenericParamID,
    @Body() updateAppointmentStatusDto: UpdateAppointmentStatusDto,
  ): Promise<SuccessMessageResponse> {
    await this.appointmentStatusService.update(
      genericParamsId.id,
      updateAppointmentStatusDto,
    );
    return { message: ConstantMessage.APPOINTMENT_STATUS_UPDATED };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api deletes the appointment status based on the ID provided',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.APPOINTMENT_STATUS_DELETE,
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
    await this.appointmentStatusService.remove(genericParamsId.id);
    return { message: ConstantMessage.APPOINTMENT_STATUS_DELETE };
  }
}
