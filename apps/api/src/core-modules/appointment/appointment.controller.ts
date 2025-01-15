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
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ConstantMessage } from '../../constants/constant-messages';
import { GenericErrorResponse } from '../../shared/types/generic-error.type';
import { AppointmentType } from './types/single-appointment.type';
import { PaginatedAppointmentType } from './types/appointment-list.type';
import { AppointmentQueryListingDto } from './dto/appointment-list.dto';
import { GenericParamID } from '../../shared/dtos/generic-params-id.dto';
import { SuccessMessageResponse } from '../../shared/types/success-message.type';
import { AuthenticatedUser } from '../../auth/decorator/authenticated-user.decorator';
import { User } from '../all-entities';
import { RefRoleKeys } from '../../shared/types/enums';
import { Roles } from '../../auth/decorator/roles.decorator';
import { RolesAndPermissionsGuard } from '../../auth/guards/roles-and-permissions-guard.service';
import { BasicGuard } from '../../auth/guards/basic.guard';
import { Permissions } from '../../auth/decorator/permission.decorator';
import { PaginatedUserType } from '../user/types/user-list.type';
import { PaginationDto } from '../../shared/dtos/pagination.dto';
import { CalendarType } from './types/calendar.type';
import { AboutAppointmentListType } from './types/about-appointment-list.type';
import { AboutAppointmentTitleListType } from './types/about-appointment-title-list.type';
import { CreateAboutAppointmentDto } from './dto/create-about-appointment.dto';
import { AboutAppointmentSuccessResponseType } from './types/about-appointment-response.type';

@ApiTags('Appointments')
@Controller('appointment')
export class AppointmentController {
  constructor(
    private readonly appointmentService: AppointmentService,
  ) {}

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This Api creates a new appointment',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: ConstantMessage.APPOINTMENT_CREATED,
    type: AppointmentType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(
    RefRoleKeys.SUPER_ADMIN,
    RefRoleKeys.DOCTOR,
    RefRoleKeys.PATIENT,
    RefRoleKeys.FRONT_DESK,
  )
  @Permissions('appointment_book')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Post()
  async create(
    @Body() createAppointmentDto: CreateAppointmentDto,
  ): Promise<AppointmentType> {
    return {
      message: ConstantMessage.APPOINTMENT_CREATED,
      data: await this.appointmentService.create(
        createAppointmentDto,
      ),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This Api creates a new about appointment',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: ConstantMessage.APPOINTMENT_CREATED,
    type: AppointmentType,
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
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Permissions('about_appointment_create')
  @Post('about-appointment')
  async createAbout(
    @Body() createAboutAppointmentDto: CreateAboutAppointmentDto,
  ): Promise<AboutAppointmentSuccessResponseType> {
    return {
      message: ConstantMessage.APPOINTMENT_CREATED,
      data: await this.appointmentService.createAboutAppointment(
        createAboutAppointmentDto,
      ),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api finds list of all the appointments if user is admin. If not, returns all appointments related to the user logged in',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.SUCCESS,
    type: PaginatedAppointmentType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(
    RefRoleKeys.SUPER_ADMIN,
    RefRoleKeys.DOCTOR,
    RefRoleKeys.PATIENT,
    RefRoleKeys.FRONT_DESK,
  )
  @Permissions('appointment_get_list')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get('list')
  async findAllList(
    @AuthenticatedUser() user: User,
    @Query() appointmentQueryListingDto: AppointmentQueryListingDto,
  ): Promise<PaginatedAppointmentType> {
    return await this.appointmentService.findAllList(
      appointmentQueryListingDto,
      user,
    );
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api finds calendar of all the appointments if user is admin. If not, returns all appointments related to the user logged in',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.SUCCESS,
    type: CalendarType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(
    RefRoleKeys.SUPER_ADMIN,
    RefRoleKeys.DOCTOR,
    RefRoleKeys.PATIENT,
    RefRoleKeys.FRONT_DESK,
  )
  @Permissions('appointment_get_calendar')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get('calendar')
  async findAllCalendar(): // @AuthenticatedUser() user: User,
  // @Query() appointmentQueryCalendarDto: AppointmentQueryCalendarDto,
  Promise<CalendarType> {
    return {
      message: ConstantMessage.SUCCESS,
      data: await this.appointmentService
        .findAllCalendar
        // appointmentQueryCalendarDto,
        // user,
        (),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api finds list of all about appointment titles',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.SUCCESS,
    type: AboutAppointmentTitleListType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(
    RefRoleKeys.SUPER_ADMIN,
    RefRoleKeys.DOCTOR,
    RefRoleKeys.PATIENT,
    RefRoleKeys.FRONT_DESK,
  )
  @Permissions('about_appointment_get_title')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get('about_appointment_titles')
  async findAllAboutAppointmentTitle(): Promise<AboutAppointmentTitleListType> {
    return {
      message: ConstantMessage.SUCCESS,
      data: await this.appointmentService.findAllAboutAppointmentTitle(),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This Api finds list of all about appointments',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.SUCCESS,
    type: AboutAppointmentListType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(
    RefRoleKeys.SUPER_ADMIN,
    RefRoleKeys.DOCTOR,
    RefRoleKeys.PATIENT,
    RefRoleKeys.FRONT_DESK,
  )
  @Permissions('about_appointment_get')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get('about_appointments')
  async findAllAboutAppointment(): Promise<AboutAppointmentListType> {
    return {
      message: ConstantMessage.SUCCESS,
      data: await this.appointmentService.findAllAboutAppointment(),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api finds all the patients of the doctor logged in based on the appointments',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.SUCCESS,
    type: PaginatedUserType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.DOCTOR)
  @Permissions('appointment_get_patients')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get('patients')
  async findAllPatients(
    @AuthenticatedUser() user: User,
    @Query() paginationdto: PaginationDto,
  ): Promise<PaginatedUserType> {
    return await this.appointmentService.findAllPatients(
      paginationdto,
      user,
    );
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api finds one appointment based on the appointmentID or appointment occurenceID provided',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.SUCCESS,
    type: AppointmentType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(
    RefRoleKeys.SUPER_ADMIN,
    RefRoleKeys.DOCTOR,
    RefRoleKeys.PATIENT,
    RefRoleKeys.FRONT_DESK,
  )
  @Permissions('appointment_view')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get(':id')
  async findOne(
    @Param() genericParamsId: GenericParamID,
  ): Promise<AppointmentType> {
    return {
      message: ConstantMessage.SUCCESS,
      data: await this.appointmentService.findOne(genericParamsId.id),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api updates the appointment or the appointment occurence based on the ID provided',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.APPOINTMENT_UPDATED,
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
  @Permissions('appointment_update')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Patch(':id')
  async update(
    @Param() genericParamsId: GenericParamID,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ): Promise<SuccessMessageResponse> {
    await this.appointmentService.update(
      genericParamsId.id,
      updateAppointmentDto,
    );
    return {
      message: ConstantMessage.APPOINTMENT_UPDATED,
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api cancels the appointment or the appointment occurence based on the ID provided',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.APPOINTMENT_UPDATED,
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
    RefRoleKeys.PATIENT,
    RefRoleKeys.FRONT_DESK,
  )
  @Permissions('appointment_cancel')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Patch(':id/cancel')
  async cancel(
    @Param() genericParamsId: GenericParamID,
  ): Promise<SuccessMessageResponse> {
    await this.appointmentService.cancel(genericParamsId.id);
    return {
      message: ConstantMessage.APPOINTMENT_UPDATED,
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api deletes the appointment or the appointment occurence based on the ID provided',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.APPOINTMENT_DELETE,
    type: SuccessMessageResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN)
  @Permissions('appointment_delete')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Delete(':id')
  async remove(
    @Param() genericParamsId: GenericParamID,
  ): Promise<SuccessMessageResponse> {
    await this.appointmentService.remove(genericParamsId.id);
    return {
      message: ConstantMessage.APPOINTMENT_DELETE,
    };
  }
}
