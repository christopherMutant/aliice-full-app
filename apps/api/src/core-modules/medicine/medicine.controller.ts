import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { MedicineService } from './medicine.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ConstantMessage } from '../../constants/constant-messages';
import { GenericErrorResponse } from '../../shared/types/generic-error.type';
import { BasicGuard } from '../../auth/guards/basic.guard';
import { MedicinesListType } from './types/medicine-list.type';
import { MedicineType } from './types/medicine.type';
import { GenericParamID } from '../../shared/dtos/generic-params-id.dto';
import { RolesAndPermissionsGuard } from '../../auth/guards/roles-and-permissions-guard.service';
import { Roles } from '../../auth/decorator/roles.decorator';
import { RefRoleKeys } from '../../shared/types/enums';
import { Permissions } from '../../auth/decorator/permission.decorator';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { SuccessMessageResponse } from '../../shared/types/success-message.type';

@ApiTags('Medicines')
@Controller('medicine')
export class MedicineController {
  constructor(private readonly medicineService: MedicineService) {}

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This Api creates a new medicine',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: ConstantMessage.MEDICINE_CREATED,
    type: MedicineType,
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
  @Permissions('medicine_create')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Post()
  async create(
    @Body() createMedicineDto: CreateMedicineDto,
  ): Promise<MedicineType> {
    return {
      message: ConstantMessage.MEDICINE_CREATED,
      data: await this.medicineService.create(createMedicineDto),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This Api will returns the all medicine list.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.SUCCESS,
    type: MedicinesListType,
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
  @Permissions('medicine_get')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get('list')
  async rolesList(): Promise<MedicinesListType> {
    return {
      message: ConstantMessage.SUCCESS,
      data: await this.medicineService.medicinesList(),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api finds one medicine based on the ID provided.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.MEDICINE_FETCHED,
    type: MedicineType,
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
  @Permissions('medicine_view')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get(':id')
  async findOne(
    @Param() genericParamsId: GenericParamID,
  ): Promise<MedicineType> {
    return {
      message: ConstantMessage.MEDICINE_FETCHED,
      data: await this.medicineService.findOne(genericParamsId.id),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api updates the medicine based on the ID provided',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.MEDICINE_UPDATED,
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
  @Permissions('medicine_update')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Patch(':id')
  async update(
    @Param() genericParamsId: GenericParamID,
    @Body() updateMedicineDto: UpdateMedicineDto,
  ): Promise<SuccessMessageResponse> {
    await this.medicineService.update(
      genericParamsId.id,
      updateMedicineDto,
    );
    return {
      message: ConstantMessage.MEDICINE_UPDATED,
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api deletes the medicine based on the ID provided',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.MEDICINE_DELETE,
    type: SuccessMessageResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN)
  @Permissions('medicine_delete')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Delete(':id')
  async remove(
    @Param() genericParamsId: GenericParamID,
  ): Promise<SuccessMessageResponse> {
    await this.medicineService.remove(genericParamsId.id);
    return {
      message: ConstantMessage.MEDICINE_DELETE,
    };
  }
}
