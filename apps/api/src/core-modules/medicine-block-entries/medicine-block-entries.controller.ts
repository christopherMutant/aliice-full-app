import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { MedicineBlockEntriesService } from './medicine-block-entries.service';
import { CreateMedicineBlockEntryDto } from './dto/create-medicine-block-entry.dto';
import { UpdateMedicineBlockEntryDto } from './dto/update-medicine-block-entry.dto';
import { ConstantMessage } from '../../constants/constant-messages';
import { MedicineBlockEntryType } from './types/single-medicine-block-entry.type';
import { GenericParamID } from '../../shared/dtos/generic-params-id.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { GenericErrorResponse } from '../../shared/types/generic-error.type';
import { Roles } from '../../auth/decorator/roles.decorator';
import { RefRoleKeys } from '../../shared/types/enums';
import { Permissions } from '../../auth/decorator/permission.decorator';
import { BasicGuard } from '../../auth/guards/basic.guard';
import { RolesAndPermissionsGuard } from '../../auth/guards/roles-and-permissions-guard.service';
import { SuccessMessageResponse } from '../../shared/types/success-message.type';

@ApiTags('Medicine Block Entries')
@Controller('medicine-block-entries')
export class MedicineBlockEntriesController {
  constructor(
    private readonly medicineBlockEntriesService: MedicineBlockEntriesService,
  ) {}

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This Api creates a medicine block entry',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.MEDICINE_BLOCK_ENTRY_CREATED,
    type: MedicineBlockEntryType,
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
  @Permissions('medicine_block_entry_create')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Post()
  async create(
    @Body() createMedicineBlockEntryDto: CreateMedicineBlockEntryDto,
  ): Promise<MedicineBlockEntryType> {
    return {
      message: ConstantMessage.MEDICINE_BLOCK_ENTRY_CREATED,
      data: await this.medicineBlockEntriesService.create(
        createMedicineBlockEntryDto,
      ),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api fetches a medicine block entry based on the given medicine block entry ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.MEDICINE_BLOCK_ENTRY_FETCHED,
    type: MedicineBlockEntryType,
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
  @Permissions('medicine_block_entry_view')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get(':id')
  async findOne(
    @Param() genericParamId: GenericParamID,
  ): Promise<MedicineBlockEntryType> {
    return {
      message: ConstantMessage.MEDICINE_BLOCK_ENTRY_FETCHED,
      data: await this.medicineBlockEntriesService.findOne(
        genericParamId.id,
      ),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api updates a medicine block entry based on the given medicine block entry ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.MEDICINE_BLOCK_ENTRY_UPDATED,
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
  @Permissions('medicine_block_entry_update')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Patch(':id')
  async update(
    @Param() genericParamId: GenericParamID,
    @Body() updateMedicineBlockEntryDto: UpdateMedicineBlockEntryDto,
  ): Promise<SuccessMessageResponse> {
    await this.medicineBlockEntriesService.update(
      genericParamId.id,
      updateMedicineBlockEntryDto,
    );
    return {
      message: ConstantMessage.MEDICINE_BLOCK_ENTRY_UPDATED,
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api deletes a medicine block entry based on the given medicine block entry ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.MEDICINE_BLOCK_ENTRY_DELETED,
    type: SuccessMessageResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN)
  @Permissions('medicine_block_entry_delete')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Delete(':id')
  async remove(
    @Param() genericParamId: GenericParamID,
  ): Promise<SuccessMessageResponse> {
    await this.medicineBlockEntriesService.remove(genericParamId.id);
    return {
      message: ConstantMessage.MEDICINE_BLOCK_ENTRY_DELETED,
    };
  }
}
