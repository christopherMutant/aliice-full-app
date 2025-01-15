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
} from '@nestjs/common';
import { BankDetailsService } from './bank-details.service';
import { CreateBankDetailDto } from './dto/create-bank-detail.dto';
import { UpdateBankDetailDto } from './dto/update-bank-detail.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ConstantMessage } from '../../constants/constant-messages';
import { BankdetailsType } from './types/bankdetails.type';
import { GenericErrorResponse } from '../../shared/types/generic-error.type';
import { Roles } from '../../auth/decorator/roles.decorator';
import { RefRoleKeys } from '../../shared/types/enums';
import { Permissions } from '../../auth/decorator/permission.decorator';
import { BasicGuard } from '../../auth/guards/basic.guard';
import { RolesAndPermissionsGuard } from '../../auth/guards/roles-and-permissions-guard.service';
import { BankDetailsListType } from './types/bankdetails-list.type';
import { SuccessMessageResponse } from '../../shared/types/success-message.type';
import { GenericParamID } from '../../shared/dtos/generic-params-id.dto';

@ApiTags('Bank Details')
@Controller('bank_details')
export class BankDetailsController {
  constructor(
    private readonly bankDetailsService: BankDetailsService,
  ) {}

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This Api creates a new bank detail',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: ConstantMessage.BANKDETAILS_CREATED,
    type: BankdetailsType,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Unavailabe Entity',
    type: GenericErrorResponse,
  })
  @Roles(
    RefRoleKeys.SUPER_ADMIN,
    RefRoleKeys.DOCTOR,
    RefRoleKeys.FRONT_DESK,
  )
  @Permissions('bankdetails_create')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Post()
  async create(
    @Body() createBankDetailDto: CreateBankDetailDto,
  ): Promise<BankdetailsType> {
    return {
      message: ConstantMessage.BANKDETAILS_CREATED,
      data: await this.bankDetailsService.create(createBankDetailDto),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This Api provides a list of Bankdetails',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.SUCCESS,
    type: BankDetailsListType,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(
    RefRoleKeys.SUPER_ADMIN,
    RefRoleKeys.DOCTOR,
    RefRoleKeys.FRONT_DESK,
  )
  @Permissions('bankdetails_get')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get('list')
  async bankdetailList(): Promise<BankDetailsListType> {
    return {
      message: ConstantMessage.SUCCESS,
      data: await this.bankDetailsService.findAll(),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api finds one bankdetail base on the id provided',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.BANKDETAILS_FETCHED,
    type: BankdetailsType,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(
    RefRoleKeys.SUPER_ADMIN,
    RefRoleKeys.DOCTOR,
    RefRoleKeys.FRONT_DESK,
  )
  @Permissions('bankdetails_view')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get(':id')
  async findOne(
    @Param() genericParamId: GenericParamID,
  ): Promise<BankdetailsType> {
    return {
      message: ConstantMessage.BANKDETAILS_FETCHED,
      data: await this.bankDetailsService.findOne(genericParamId.id),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api updates the bank details based on the provided user id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.SUCCESS,
    type: SuccessMessageResponse,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(
    RefRoleKeys.SUPER_ADMIN,
    RefRoleKeys.DOCTOR,
    RefRoleKeys.FRONT_DESK,
  )
  @Permissions('bankdetails_update')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Patch(':id')
  async update(
    @Param() genricParamId: GenericParamID,
    @Body() updateBankDetailDto: UpdateBankDetailDto,
  ): Promise<SuccessMessageResponse> {
    await this.bankDetailsService.update(
      genricParamId.id,
      updateBankDetailDto,
    );
    return {
      message: ConstantMessage.BANKDETAILS_UPDATED,
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api deletes the bank details base on the provided id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.BANKDETAILS_DELETE,
    type: SuccessMessageResponse,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.DOCTOR)
  @Permissions('bankdetails_delete')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Delete(':id')
  async remove(
    @Param() genericParamId: GenericParamID,
  ): Promise<SuccessMessageResponse> {
    await this.bankDetailsService.remove(genericParamId.id);
    return {
      message: ConstantMessage.BANKDETAILS_DELETE,
    };
  }
}
