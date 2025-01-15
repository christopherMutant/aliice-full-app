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
import { InabilityService } from './inability.service';
import { CreateInabilityDto } from './dto/create-inability.dto';
import { UpdateInabilityDto } from './dto/update-inability.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ConstantMessage } from '../../constants/constant-messages';
import { GenericErrorResponse } from '../../shared/types/generic-error.type';
import { Roles } from '../../auth/decorator/roles.decorator';
import { RefRoleKeys } from '../../shared/types/enums';
import { Permissions } from '../../auth/decorator/permission.decorator';
import { GenericParamID } from '../../shared/dtos/generic-params-id.dto';
import { SuccessMessageResponse } from '../../shared/types/success-message.type';
import { InabilityType } from './types/single-inability.type';
import { BasicGuard } from '../../auth/guards/basic.guard';
import { RolesAndPermissionsGuard } from '../../auth/guards/roles-and-permissions-guard.service';

@ApiTags('Inabilities')
@Controller('inability')
export class InabilityController {
  constructor(private readonly inabilityService: InabilityService) {}

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This Api creates an inability',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.INABILITY_CREATED,
    type: InabilityType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.DOCTOR)
  @Permissions('inability_create')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Post()
  async create(
    @Body() createInabilityDto: CreateInabilityDto,
  ): Promise<InabilityType> {
    return {
      message: ConstantMessage.INABILITY_CREATED,
      data: await this.inabilityService.create(createInabilityDto),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This Api fetches an inability',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.INABILITY_FETCHED,
    type: InabilityType,
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
  @Permissions('inability_view')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get(':id')
  async findOne(
    @Param() genericParamId: GenericParamID,
  ): Promise<InabilityType> {
    return {
      message: ConstantMessage.INABILITY_FETCHED,
      data: await this.inabilityService.findOne(genericParamId.id),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This Api updates an inability',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.INABILITY_UPDATED,
    type: SuccessMessageResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.DOCTOR)
  @Permissions('inability_update')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Patch(':id')
  async update(
    @Param() genericParamId: GenericParamID,
    @Body() updateInabilityDto: UpdateInabilityDto,
  ): Promise<SuccessMessageResponse> {
    await this.inabilityService.update(
      genericParamId.id,
      updateInabilityDto,
    );
    return { message: ConstantMessage.INABILITY_UPDATED };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This Api deletes an inability',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.INABILITY_DELETED,
    type: SuccessMessageResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.DOCTOR)
  @Permissions('inability_delete')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Delete(':id')
  async remove(
    @Param('id') id: string,
  ): Promise<SuccessMessageResponse> {
    await this.inabilityService.remove(id);
    return { message: ConstantMessage.INABILITY_DELETED };
  }
}
