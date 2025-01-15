import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { InvoiceQueryDto } from './dto/invoice-query.dto';
import { GenericParamID } from '../../shared/dtos/generic-params-id.dto';
import { ConstantMessage } from '../../constants/constant-messages';
import { InvoiceType } from './types/single-invoice.type';
import { GenericErrorResponse } from '../../shared/types/generic-error.type';
import { Roles } from '../../auth/decorator/roles.decorator';
import { RefRoleKeys } from '../../shared/types/enums';
import { Permissions } from '../../auth/decorator/permission.decorator';
import { BasicGuard } from '../../auth/guards/basic.guard';
import { RolesAndPermissionsGuard } from '../../auth/guards/roles-and-permissions-guard.service';
import { InvoiceListType } from './types/invoice-list.type';
import { SuccessMessageResponse } from '../../shared/types/success-message.type';

@ApiTags('Invoices')
@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This Api creates an invoice',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.INVOICE_CREATED,
    type: InvoiceType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
  @Permissions('invoice_create')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Post()
  async create(
    @Body() createInvoiceDto: CreateInvoiceDto,
  ): Promise<InvoiceType> {
    return {
      message: ConstantMessage.INVOICE_CREATED,
      data: await this.invoiceService.create(createInvoiceDto),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This Api fetches a list of invoices',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.SUCCESS,
    type: InvoiceListType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
  @Permissions('invoice_get')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get()
  async findAll(
    @Query() invoiceQueryDto: InvoiceQueryDto,
  ): Promise<InvoiceListType> {
    return {
      message: ConstantMessage.SUCCESS,
      data: await this.invoiceService.findAll(invoiceQueryDto),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api fetches an invoice based on the given invoice ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.INVOICE_FETCHED,
    type: InvoiceType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
  @Permissions('invoice_view')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get(':id')
  async findOne(
    @Param() genericParamId: GenericParamID,
  ): Promise<InvoiceType> {
    return {
      message: ConstantMessage.INVOICE_FETCHED,
      data: await this.invoiceService.findOne(genericParamId.id),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api updates an invoice based on the given invoice ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.INVOICE_UPDATED,
    type: SuccessMessageResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
  @Permissions('invoice_update')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Patch(':id')
  async update(
    @Param() genericParamId: GenericParamID,
    @Body() updateInvoiceDto: UpdateInvoiceDto,
  ): Promise<SuccessMessageResponse> {
    await this.invoiceService.update(
      genericParamId.id,
      updateInvoiceDto,
    );

    return { message: ConstantMessage.INVOICE_UPDATED };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api deletes an invoice based on the given invoice ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.INVOICE_DELETED,
    type: SuccessMessageResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN)
  @Permissions('invoice_delete')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Delete(':id')
  async remove(
    @Param() genericParamId: GenericParamID,
  ): Promise<SuccessMessageResponse> {
    await this.invoiceService.remove(genericParamId.id);

    return { message: ConstantMessage.INVOICE_DELETED };
  }
}
