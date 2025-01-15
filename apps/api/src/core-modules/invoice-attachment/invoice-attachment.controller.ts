import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  UseInterceptors,
  HttpCode,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { InvoiceAttachmentService } from './invoice-attachment.service';
import { CreateInvoiceAttachmentDto } from './dto/create-invoice-attachment.dto';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ConstantMessage } from '../../constants/constant-messages';
import { GenericErrorResponse } from '../../shared/types/generic-error.type';
import { RefRoleKeys } from '../../shared/types/enums';
import { Roles } from '../../auth/decorator/roles.decorator';
import { Permissions } from '../../auth/decorator/permission.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { SuccessMessageResponse } from '../../shared/types/success-message.type';
import { BasicGuard } from '../../auth/guards/basic.guard';
import { RolesAndPermissionsGuard } from '../../auth/guards/roles-and-permissions-guard.service';
import { GenericParamID } from '../../shared/dtos/generic-params-id.dto';
import { InvoiceAttachmentType } from './types/single-invoice-attachement-type';

@ApiTags('Invoice Attachments')
@Controller('invoice-attachment')
export class InvoiceAttachmentController {
  constructor(
    private readonly invoiceAttachmentService: InvoiceAttachmentService,
  ) {}
  @ApiBearerAuth()
  @ApiOperation({
    description: 'This Api uploads invoice attachments to the bucket',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.INVOICE_ATTACHMENT_UPLOADED,
    type: InvoiceAttachmentType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
  @Permissions('invoice_attachment_upload')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @Post()
  @HttpCode(HttpStatus.OK)
  async invoiceAttachmentsUpload(
    @Body() createInvoiceAttachmentDto: CreateInvoiceAttachmentDto,
    @UploadedFile()
    file: Express.Multer.File,
  ): Promise<InvoiceAttachmentType> {
    return {
      message: ConstantMessage.INVOICE_ATTACHMENT_UPLOADED,
      data: await this.invoiceAttachmentService.create(
        file,
        createInvoiceAttachmentDto,
      ),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api finds one invoice attachment based on the provided invoice attachment ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.INVOICE_ATTACHMENT_FETCHED,
    type: InvoiceAttachmentType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
  @Permissions('invoice_attachment_view')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get(':id')
  async findOne(
    @Param() genericParamId: GenericParamID,
  ): Promise<InvoiceAttachmentType> {
    return {
      message: ConstantMessage.INVOICE_ATTACHMENT_FETCHED,
      data: await this.invoiceAttachmentService.findOne(
        genericParamId.id,
      ),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api deletes one invoice attachment based on the provided invoice attachment ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.INVOICE_ATTACHMENT_DELETED,
    type: SuccessMessageResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN)
  @Permissions('invoice_attachment_delete')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Delete(':id')
  async remove(
    @Param() genericParamId: GenericParamID,
  ): Promise<SuccessMessageResponse> {
    await this.invoiceAttachmentService.remove(genericParamId.id);
    return { message: ConstantMessage.INVOICE_ATTACHMENT_DELETED };
  }
}
