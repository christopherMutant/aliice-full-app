import {
  Controller,
  Get,
  Param,
  HttpStatus,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CantonService } from './canton.service';
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
import { BasicGuard } from '../../auth/guards/basic.guard';
import { RolesAndPermissionsGuard } from '../../auth/guards/roles-and-permissions-guard.service';
import { GenericParamID } from '../../shared/dtos/generic-params-id.dto';
import { CantonQueryDto } from './dto/canton-query.dto';
import { CantonListType } from './types/canton-list-type';
import { CantonType } from './types/single-canton-type';

@ApiTags('Cantons')
@Controller('canton')
export class CantonController {
  constructor(private readonly cantonService: CantonService) {}

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This Api find all cantons',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.CANTONS_FETCHED,
    type: CantonListType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
  @Permissions('canton_get')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get()
  async findAll(
    @Query() cantonQueryDto: CantonQueryDto,
  ): Promise<CantonListType> {
    return {
      message: ConstantMessage.CANTONS_FETCHED,
      data: await this.cantonService.findAll(cantonQueryDto),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api finds one canton based on the provided canton ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.CANTON_FETCHED,
    type: CantonType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
  @Permissions('canton_view')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get(':id')
  async findOne(
    @Param() genericParamsId: GenericParamID,
  ): Promise<CantonType> {
    return {
      message: ConstantMessage.CANTON_FETCHED,
      data: await this.cantonService.findOne(genericParamsId.id),
    };
  }
}
