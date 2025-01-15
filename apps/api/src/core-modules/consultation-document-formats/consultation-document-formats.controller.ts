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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ConsultationDocumentFormatsService } from './consultation-document-formats.service';
import { CreateConsultationDocumentFormatDto } from './dto/create-consultation-document-format.dto';
import { UpdateConsultationDocumentFormatDto } from './dto/update-consultation-document-format.dto';
import {
  ApiBearerAuth,
  ApiConsumes,
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
import { FileInterceptor } from '@nestjs/platform-express';
import { ConsultationDocumentFormatType } from './types/single-consultation-document-format.type';
import { ConstantMessage } from '../../constants/constant-messages';
import { ConsultationDocumentFormatListType } from './types/consultation-document-format-list.type copy';
import { GenericParamID } from '../../shared/dtos/generic-params-id.dto';
import { SuccessMessageResponse } from '../../shared/types/success-message.type';

@ApiTags('Consultation Document Formats')
@Controller('consultation-document-formats')
export class ConsultationDocumentFormatsController {
  constructor(
    private readonly consultationDocumentFormatsService: ConsultationDocumentFormatsService,
  ) {}

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api uploads consultation document models to the bucket',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.CONSULTATION_DOCUMENT_FORMAT_CREATED,
    type: ConsultationDocumentFormatType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
  @Permissions('consultation_document_upload')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @Post()
  async create(
    @Body()
    createConsultationDocumentFormatDto: CreateConsultationDocumentFormatDto,
    @UploadedFile()
    file: Express.Multer.File,
  ): Promise<ConsultationDocumentFormatType> {
    return {
      message: ConstantMessage.CONSULTATION_DOCUMENT_FORMAT_CREATED,
      data: await this.consultationDocumentFormatsService.create(
        file,
        createConsultationDocumentFormatDto,
      ),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api fetches a list of consultation document models',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.SUCCESS,
    type: ConsultationDocumentFormatListType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
  @Permissions('consultation_document_get')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get()
  async findAll(): Promise<ConsultationDocumentFormatListType> {
    return {
      message: ConstantMessage.SUCCESS,
      data: await this.consultationDocumentFormatsService.findAll(),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api fetches a consultation document model based on the given ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.CONSULTATION_DOCUMENT_FORMAT_FETCHED,
    type: ConsultationDocumentFormatType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
  @Permissions('consultation_document_view')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get(':id')
  async findOne(
    @Param() genericParamId: GenericParamID,
  ): Promise<ConsultationDocumentFormatType> {
    return {
      message: ConstantMessage.CONSULTATION_DOCUMENT_FORMAT_FETCHED,
      data: await this.consultationDocumentFormatsService.findOne(
        genericParamId.id,
      ),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api updates a consultation document model based on the given ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.CONSULTATION_DOCUMENT_FORMAT_UPDATED,
    type: SuccessMessageResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
  @Permissions('consultation_document_update')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Patch(':id')
  async update(
    @Param() genericParamId: GenericParamID,
    @Body()
    updateConsultationDocumentFormatDto: UpdateConsultationDocumentFormatDto,
  ): Promise<SuccessMessageResponse> {
    await this.consultationDocumentFormatsService.update(
      genericParamId.id,
      updateConsultationDocumentFormatDto,
    );
    return {
      message: ConstantMessage.CONSULTATION_DOCUMENT_FORMAT_UPDATED,
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api deletes a consultation document model based on the given ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.CONSULTATION_DOCUMENT_FORMAT_DELETED,
    type: SuccessMessageResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN)
  @Permissions('consultation_document_update')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Delete(':id')
  async remove(
    @Param() genericParamId: GenericParamID,
  ): Promise<SuccessMessageResponse> {
    await this.consultationDocumentFormatsService.remove(
      genericParamId.id,
    );
    return {
      message: ConstantMessage.CONSULTATION_DOCUMENT_FORMAT_DELETED,
    };
  }
}
