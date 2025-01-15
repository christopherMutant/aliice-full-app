import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { InsuranceService } from './insurance.service';
import { CreateInsuranceDto } from './dto/create-insurance.dto';
import { UpdateInsuranceDto } from './dto/update-insurance.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ConstantMessage } from '../../constants/constant-messages';
import { InsuranceType } from './types/insurance.type';
import { GenericErrorResponse } from '../../shared/types/generic-error.type';
import { Roles } from '../../auth/decorator/roles.decorator';
import { RefRoleKeys } from '../../shared/types/enums';
import { BasicGuard } from '../../auth/guards/basic.guard';
import { Permissions } from '../../auth/decorator/permission.decorator';
import { RolesAndPermissionsGuard } from '../../auth/guards/roles-and-permissions-guard.service';
import { GenericParamID } from '../../shared/dtos/generic-params-id.dto';
import { SuccessMessageResponse } from '../../shared/types/success-message.type';

@ApiTags('Insurance')
@Controller('insurance')
export class InsuranceController {
  constructor(private readonly insuranceService: InsuranceService) {}

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This API creates a new insurance',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: ConstantMessage.INSURANCE_CREATED,
    type: InsuranceType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unknown Exception',
    type: GenericErrorResponse,
  })
  @Roles(
    RefRoleKeys.SUPER_ADMIN,
    RefRoleKeys.DOCTOR,
    RefRoleKeys.RECEPTIONIST,
    RefRoleKeys.FRONT_DESK,
  )
  @Permissions('insurance_create')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Post()
  async create(
    @Body() createInsuranceDto: CreateInsuranceDto,
  ): Promise<InsuranceType> {
    return {
      message: ConstantMessage.INSURANCE_CREATED,
      data: await this.insuranceService.create(createInsuranceDto),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api udaptes the insurace base on the id provided',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.INSURANCE_UPDATED,
    type: SuccessMessageResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Enrtity',
    type: GenericErrorResponse,
  })
  @Roles(
    RefRoleKeys.SUPER_ADMIN,
    RefRoleKeys.DOCTOR,
    RefRoleKeys.RECEPTIONIST,
    RefRoleKeys.FRONT_DESK,
  )
  @Permissions('insurance_update')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Patch(':id')
  async update(
    @Param() genericParamId: GenericParamID,
    @Body() updateInsuranceDto: UpdateInsuranceDto,
  ): Promise<SuccessMessageResponse> {
    await this.insuranceService.update(
      genericParamId.id,
      updateInsuranceDto,
    );
    return {
      message: ConstantMessage.INSURANCE_UPDATED,
    };
  }
}
