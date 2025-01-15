import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { PatientCasesService } from './patient-cases.service';
import { CreatePatientCaseDto } from './dto/create-patient-case.dto';
import { UpdatePatientCaseDto } from './dto/update-patient-case.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PatientCaseListQueryListingDto } from './dto/patient-case-list.dto';
import { ConstantMessage } from '../../constants/constant-messages';
import { PatientCaseType } from './types/single-patient-case-type';
import { PatientCaseListType } from './types/patient-case-list-type';
import { SuccessMessageResponse } from '../../shared/types/success-message.type';
import { GenericErrorResponse } from '../../shared/types/generic-error.type';
import { Roles } from '../../auth/decorator/roles.decorator';
import { RefRoleKeys } from '../../shared/types/enums';
import { Permissions } from '../../auth/decorator/permission.decorator';
import { BasicGuard } from '../../auth/guards/basic.guard';
import { RolesAndPermissionsGuard } from '../../auth/guards/roles-and-permissions-guard.service';
import { GenericParamID } from '../../shared/dtos/generic-params-id.dto';

@ApiTags('Patient Cases')
@Controller('patient-cases')
export class PatientCasesController {
  constructor(
    private readonly patientCasesService: PatientCasesService,
  ) {}

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This Api creates a patient case',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.PATIENT_CASE_CREATED,
    type: PatientCaseType,
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
  @Permissions('patient_case_create')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Post()
  async create(
    @Body() createPatientCaseDto: CreatePatientCaseDto,
  ): Promise<PatientCaseType> {
    return {
      message: ConstantMessage.PATIENT_CASE_CREATED,
      data: await this.patientCasesService.create(
        createPatientCaseDto,
      ),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api fetches a list of patient cases based on the given patient ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.PATIENT_CASE_FETCHED,
    type: PatientCaseListType,
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
  @Permissions('patient_case_get')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get()
  async findAll(
    @Query()
    patientCaseListQueryListingDto: PatientCaseListQueryListingDto,
  ): Promise<PatientCaseListType> {
    return await this.patientCasesService.findAll(
      patientCaseListQueryListingDto,
    );
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api fetches a patient case based on the given patient case ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.PATIENT_CASE_FETCHED,
    type: PatientCaseType,
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
  @Permissions('patient_case_view')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get(':id')
  async findOne(
    @Param() genericParamId: GenericParamID,
  ): Promise<PatientCaseType> {
    return {
      message: ConstantMessage.PATIENT_CASE_FETCHED,
      data: await this.patientCasesService.findOne(genericParamId.id),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api updates a patient case based on the given patient case ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.PATIENT_CASE_UPDATED,
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
  @Permissions('patient_case_update')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Patch(':id')
  async update(
    @Param() genericParamId: GenericParamID,
    @Body() updatePatientCaseDto: UpdatePatientCaseDto,
  ): Promise<SuccessMessageResponse> {
    await this.patientCasesService.update(
      genericParamId.id,
      updatePatientCaseDto,
    );
    return {
      message: ConstantMessage.PATIENT_CASE_UPDATED,
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api deletes a patient case based on the given patient case ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.PATIENT_CASE_DELETED,
    type: SuccessMessageResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN)
  @Permissions('patient_case_delete')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Delete(':id')
  async remove(
    @Param() genericParamId: GenericParamID,
  ): Promise<SuccessMessageResponse> {
    await this.patientCasesService.remove(genericParamId.id);
    return {
      message: ConstantMessage.PATIENT_CASE_DELETED,
    };
  }
}
