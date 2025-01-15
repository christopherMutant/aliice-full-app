import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  HttpStatus,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { FileUploadService } from './file_upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ConstantMessage } from '../../constants/constant-messages';
import { GenericErrorResponse } from '../types/generic-error.type';
import { SuccessMessageResponse } from '../types/success-message.type';
import { IconListType } from './types/icon-list-type';
import { Roles } from '../../auth/decorator/roles.decorator';
import { RefRoleKeys } from '../types/enums';
import { Permissions } from '../../auth/decorator/permission.decorator';
import { BasicGuard } from '../../auth/guards/basic.guard';
import { RolesAndPermissionsGuard } from '../../auth/guards/roles-and-permissions-guard.service';

@ApiTags('File Upload')
@Controller('file-upload')
export class FileUploadController {
  constructor(
    private readonly fileUploadService: FileUploadService,
  ) {}
  @ApiBearerAuth()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOperation({
    description:
      'This Api uploads icon images to the bucket, receives files in zip format',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.ICONS_UPLOADED,
    type: SuccessMessageResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN)
  @Permissions('icon_upload')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @Post('/icons-upload')
  @HttpCode(HttpStatus.OK)
  async imagesUploadZip(
    @UploadedFile('file') zipFile: Express.Multer.File,
  ): Promise<SuccessMessageResponse> {
    await this.fileUploadService.iconsUploadZip(zipFile);
    return { message: ConstantMessage.ICONS_UPLOADED };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api get all icon names with url from the bucket',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.ICONS_FETCHED,
    type: IconListType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN)
  @Permissions('icon_get')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get('icons')
  async findAllIcons(): Promise<IconListType> {
    return {
      message: ConstantMessage.ICONS_FETCHED,
      data: await this.fileUploadService.findAllIcons(),
    };
  }
}
