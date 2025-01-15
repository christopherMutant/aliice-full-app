import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ReferenceService } from './reference.service';
import { CreateReferenceDto } from './dto/create-reference.dto';
import { UpdateReferenceDto } from './dto/update-reference.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ConstantMessage } from '../../constants/constant-messages';
import { ReferenceType } from './types/reference.type';
import { GenericErrorResponse } from '../../shared/types/generic-error.type';
import { Roles } from '../../auth/decorator/roles.decorator';
import { RefRoleKeys } from '../../shared/types/enums';
import { Permissions } from '../../auth/decorator/permission.decorator';
import { BasicGuard } from '../../auth/guards/basic.guard';
import { RolesAndPermissionsGuard } from '../../auth/guards/roles-and-permissions-guard.service';
import { SuccessMessageResponse } from '../../shared/types/success-message.type';
import { GenericParamID } from '../../shared/dtos/generic-params-id.dto';

@ApiTags('Reference')
@Controller('reference')
export class ReferenceController {
  constructor(private readonly referenceService: ReferenceService) {}

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This Api creates a new reference for the user',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: ConstantMessage.REFERENCE_CREATED,
    type: ReferenceType,
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
  @Permissions('reference_create')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Post()
  async create(
    @Body() createReferenceDto: CreateReferenceDto,
  ): Promise<ReferenceType> {
    return {
      message: ConstantMessage.REFERENCE_CREATED,
      data: await this.referenceService.create(createReferenceDto),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api updates the reference base on the id provided',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.REFERENCE_UPDATED,
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
  @Permissions('reference_updated')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Patch(':id')
  async update(
    @Param() genericParamId: GenericParamID,
    @Body() updateReferenceDto: UpdateReferenceDto,
  ): Promise<SuccessMessageResponse> {
    await this.referenceService.update(
      genericParamId.id,
      updateReferenceDto,
    );
    return {
      message: ConstantMessage.REFERENCE_UPDATED,
    };
  }
}
