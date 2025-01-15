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
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ConstantMessage } from '../../constants/constant-messages';
import { User } from '../all-entities';
import { GenericErrorResponse } from '../../shared/types/generic-error.type';
import { AuthValidationError } from '../../auth/types/registration-validation-error.type';
import { GenericParamID } from '../../shared/dtos/generic-params-id.dto';
import { UserSuccessResponse } from './types/user-response';
import { UserQueryListingDto } from './dto/user-query-list.dto';
import { PaginatedUserType } from './types/user-list.type';
import { Roles } from '../../auth/decorator/roles.decorator';
import { BasicGuard } from '../../auth/guards/basic.guard';
import { RolesAndPermissionsGuard } from '../../auth/guards/roles-and-permissions-guard.service';
import { RefRoleKeys } from '../../shared/types/enums';
import { Permissions } from '../../auth/decorator/permission.decorator';
import { SuccessMessageResponse } from '../../shared/types/success-message.type';
import { UserListOnSpecificRole } from './types/user-list-on-specific-role-response.type';
import { DoctorQueryListingDto } from './dto/doctor-query-list.dto';
import { AuthenticatedUser } from '../../auth/decorator/authenticated-user.decorator';
import { FamilyRelationshipType } from './types/family-relation.type';
import { FamilialRelationshipDto } from './dto/familial-relationship.dto';
import { PatientQueryListingDto } from './dto/patient-query-list.dto copy';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This Api creates a new user',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: ConstantMessage.RECORD_CREATED,
    type: UserSuccessResponse,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
    type: GenericErrorResponse,
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Unprocessable Entity',
    type: AuthValidationError,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN)
  @Permissions('user_create')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Post()
  async create(
    @AuthenticatedUser() user: User,
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserSuccessResponse> {
    return await this.userService.create(createUserDto, user);
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This Api provides an array of all users',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.SUCCESS,
    type: PaginatedUserType,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: ConstantMessage.UN_AUTH,
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
  @Permissions('user_get')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query() userQueryListingDto: UserQueryListingDto,
  ): Promise<PaginatedUserType> {
    return await this.userService.findAll(userQueryListingDto);
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This Api provides a paginated list of all doctors',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.SUCCESS,
    type: PaginatedUserType,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: ConstantMessage.UN_AUTH,
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.PATIENT, RefRoleKeys.SUPER_ADMIN)
  @Permissions('doctor_get')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get('doctors')
  @HttpCode(HttpStatus.OK)
  async findAllDoctorsForPatients(
    @Query() doctorQueryListingDto: DoctorQueryListingDto,
  ): Promise<PaginatedUserType> {
    return await this.userService.findAllDoctors(
      doctorQueryListingDto,
    );
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This Api provides a paginated list of all patients',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.SUCCESS,
    type: PaginatedUserType,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: ConstantMessage.UN_AUTH,
    type: GenericErrorResponse,
  })
  @Roles(
    RefRoleKeys.DOCTOR,
    RefRoleKeys.SUPER_ADMIN,
    RefRoleKeys.FRONT_DESK,
  )
  @Permissions('patient_get')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get('patients')
  @HttpCode(HttpStatus.OK)
  async findAllPatientsForDoctor(
    @Query() patientQueryListingDto: PatientQueryListingDto,
  ): Promise<PaginatedUserType> {
    return await this.userService.findAllPatients(
      patientQueryListingDto,
    );
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api provides an array of all users that are patients',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.SUCCESS,
    type: UserListOnSpecificRole,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: ConstantMessage.UN_AUTH,
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.DOCTOR)
  @Permissions('patient_get')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get('patients-dropdown')
  @HttpCode(HttpStatus.OK)
  async findAllPatientsDropdown(): Promise<UserListOnSpecificRole> {
    return {
      message: ConstantMessage.SUCCESS,
      data: await this.userService.findAllPatientsDropdown(),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api provides an array of all users that are doctors',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.SUCCESS,
    type: UserListOnSpecificRole,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: ConstantMessage.UN_AUTH,
    type: GenericErrorResponse,
  })
  @Roles(
    RefRoleKeys.DOCTOR,
    RefRoleKeys.SUPER_ADMIN,
    RefRoleKeys.FRONT_DESK,
  )
  @Permissions('doctor_get')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get('doctors-dropdown')
  @HttpCode(HttpStatus.OK)
  async findAllDoctorsDropdown(): Promise<UserListOnSpecificRole> {
    return {
      message: ConstantMessage.SUCCESS,
      data: await this.userService.findAllDoctorsDropdown(),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api provides an array of all users that are not admins or patients',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.SUCCESS,
    type: UserListOnSpecificRole,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: ConstantMessage.UN_AUTH,
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.PATIENT)
  @Permissions('client_get')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get('clients')
  @HttpCode(HttpStatus.OK)
  async findAllClients(): Promise<UserListOnSpecificRole> {
    return {
      message: ConstantMessage.SUCCESS,
      data: await this.userService.findAllClient(),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api finds a familial relationship based on the provided family category',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.SUCCESS,
    type: FamilyRelationshipType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.DOCTOR)
  @Permissions('family_view')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get('familial-relationship')
  getFamilialRelationship(
    @Query() familialRelationshipDto: FamilialRelationshipDto,
  ): FamilyRelationshipType {
    return {
      message: ConstantMessage.SUCCESS,
      data: this.userService.getFamilialRelationship(
        familialRelationshipDto,
      ),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This Api finds the user base on the ID provided ',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.SUCCESS,
    type: UserSuccessResponse,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: ConstantMessage.UN_AUTH,
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN)
  @Permissions('user_get')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get(':id')
  async findOne(
    @Param() genericParamsID: GenericParamID,
  ): Promise<UserSuccessResponse> {
    return {
      message: ConstantMessage.USER_FETCHED,
      user: await this.userService.findOne(genericParamsID.id),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This Api updates the user base on the id provided ',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.SUCCESS,
    type: CreateUserDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN)
  @Permissions('user_update')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Patch(':id')
  async update(
    @Param() genericParamsID: GenericParamID,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.userService.update(
      genericParamsID.id,
      updateUserDto,
    );
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This Api deletes the user base on the id provided ',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.SUCCESS,
    type: SuccessMessageResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN)
  @Permissions('user_delete')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Delete(':id')
  async deleteUser(
    @Param() genericParamsID: GenericParamID,
  ): Promise<SuccessMessageResponse> {
    await this.userService.remove(genericParamsID.id);
    return {
      message: ConstantMessage.USER_DELETE,
    };
  }
}
