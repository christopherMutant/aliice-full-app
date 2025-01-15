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
import { CheckupService } from './checkup.service';
import { CreateCheckupDto } from './dto/create-checkup.dto';
import { UpdateCheckupDto } from './dto/update-checkup.dto';
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
import { ConstantMessage } from '../../constants/constant-messages';
import { CheckupType } from './types/single-checkup.type';
import { GenericParamID } from '../../shared/dtos/generic-params-id.dto';
import { SuccessMessageResponse } from '../../shared/types/success-message.type';

@ApiTags('Checkups')
@Controller('checkup')
export class CheckupController {
  constructor(private readonly checkupService: CheckupService) {}

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This Api creates a checkup',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.CHECKUP_CREATED,
    type: CheckupType,
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
  @Permissions('checkup_create')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Post()
  async create(
    @Body() createCheckupDto: CreateCheckupDto,
  ): Promise<CheckupType> {
    return {
      message: ConstantMessage.CHECKUP_CREATED,
      data: await this.checkupService.create(createCheckupDto),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api fetches a checkup based on the given checkup ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.CHECKUP_FETCHED,
    type: CheckupType,
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
  @Permissions('checkup_view')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get(':id')
  async findOne(
    @Param() genericParamId: GenericParamID,
  ): Promise<CheckupType> {
    return {
      message: ConstantMessage.CHECKUP_FETCHED,
      data: await this.checkupService.findOne(genericParamId.id),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api updates a checkup based on the given checkup ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.CHECKUP_UPDATED,
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
  @Permissions('checkup_update')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Patch(':id')
  async update(
    @Param() genericParamId: GenericParamID,
    @Body() updateCheckupDto: UpdateCheckupDto,
  ): Promise<SuccessMessageResponse> {
    await this.checkupService.update(
      genericParamId.id,
      updateCheckupDto,
    );
    return { message: ConstantMessage.SUCCESS };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api deletes a checkup based on the given checkup ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.CHECKUP_DELETED,
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
  @Permissions('checkup_update')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Delete(':id')
  async remove(
    @Param() genericParamId: GenericParamID,
  ): Promise<SuccessMessageResponse> {
    await this.checkupService.remove(genericParamId.id);
    return { message: ConstantMessage.SUCCESS };
  }
}
