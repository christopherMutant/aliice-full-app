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
import { MedicineBlockService } from './medicine-block.service';
import { CreateMedicineBlockDto } from './dto/create-medicine-block.dto';
import { UpdateMedicineBlockDto } from './dto/update-medicine-block.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GenericErrorResponse } from '../../shared/types/generic-error.type';
import { RefRoleKeys } from '../../shared/types/enums';
import { Roles } from '../../auth/decorator/roles.decorator';
import { Permissions } from '../../auth/decorator/permission.decorator';
import { BasicGuard } from '../../auth/guards/basic.guard';
import { RolesAndPermissionsGuard } from '../../auth/guards/roles-and-permissions-guard.service';
import { MedicineBlockListDto } from './dto/medicine-block-list.dto';
import { ConstantMessage } from '../../constants/constant-messages';
import { MedicineBlockType } from './types/single-medicine-block.type';
import { MedicineBlockListType } from './types/medicine-block-list.type';
import { GenericParamID } from '../../shared/dtos/generic-params-id.dto';
import { SuccessMessageResponse } from '../../shared/types/success-message.type';

@ApiTags('Medicine Blocks')
@Controller('medicine-block')
export class MedicineBlockController {
  constructor(
    private readonly medicineBlockService: MedicineBlockService,
  ) {}

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This Api creates a medicine block',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.MEDICINE_BLOCK_CREATED,
    type: MedicineBlockType,
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
  @Permissions('medicine_block_create')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Post()
  async create(
    @Body() createMedicineBlockDto: CreateMedicineBlockDto,
  ): Promise<MedicineBlockType> {
    return {
      message: ConstantMessage.MEDICINE_BLOCK_CREATED,
      data: await this.medicineBlockService.create(
        createMedicineBlockDto,
      ),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This Api fetches a list of medicine blocks',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.MEDICINE_BLOCK_FETCHED,
    type: MedicineBlockListType,
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
  @Permissions('medicine_block_get')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get()
  async findAll(
    @Query() medicineBlockListDto: MedicineBlockListDto,
  ): Promise<MedicineBlockListType> {
    return {
      message: ConstantMessage.MEDICINE_BLOCK_FETCHED,
      data: await this.medicineBlockService.findAll(
        medicineBlockListDto,
      ),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api fetches a medicine block based on the given medicine block ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.MEDICINE_BLOCK_FETCHED,
    type: MedicineBlockType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN)
  @Permissions('medicine_block_view')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get(':id')
  async findOne(
    @Param() genericParamId: GenericParamID,
  ): Promise<MedicineBlockType> {
    return {
      message: ConstantMessage.MEDICINE_BLOCK_FETCHED,
      data: await this.medicineBlockService.findOne(
        genericParamId.id,
      ),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api updates a medicine block based on the given medicine block ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.MEDICINE_BLOCK_UPDATED,
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
  @Permissions('medicine_block_update')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Patch(':id')
  async update(
    @Param() genericParamId: GenericParamID,
    @Body() updateMedicineBlockDto: UpdateMedicineBlockDto,
  ): Promise<SuccessMessageResponse> {
    await this.medicineBlockService.update(
      genericParamId.id,
      updateMedicineBlockDto,
    );

    return { message: ConstantMessage.MEDICINE_BLOCK_UPDATED };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api deletes a medicine block based on the given medicine block ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.MEDICINE_BLOCK_DELETED,
    type: SuccessMessageResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN)
  @Permissions('medicine_block_delete')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Delete(':id')
  async remove(
    @Param() genericParamId: GenericParamID,
  ): Promise<SuccessMessageResponse> {
    await this.medicineBlockService.remove(genericParamId.id);
    return { message: ConstantMessage.MEDICINE_BLOCK_DELETED };
  }
}
