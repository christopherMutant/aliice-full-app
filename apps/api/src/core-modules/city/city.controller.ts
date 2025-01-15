import {
  Controller,
  Get,
  Post,
  Param,
  HttpStatus,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CityService } from './city.service';
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
import { CityQueryDto } from './dto/city-query.dto';
import { GenericParamID } from '../../shared/dtos/generic-params-id.dto';
import { SuccessMessageResponse } from '../../shared/types/success-message.type';
import { CityType } from './types/single-city-type';
import { CityListType } from './types/city-list-type';

@ApiTags('Cities')
@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This Api find all cities',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.SUCCESS,
    type: SuccessMessageResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN)
  @Permissions('city_update')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Post('update_city_relations')
  async create(): Promise<SuccessMessageResponse> {
    await this.cityService.create();
    return { message: ConstantMessage.SUCCESS };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This Api find all cities',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.CITIES_FETCHED,
    type: CityListType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
  @Permissions('city_get')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get()
  async findAll(
    @Query() cityQueryDto: CityQueryDto,
  ): Promise<CityListType> {
    return {
      message: ConstantMessage.CITIES_FETCHED,
      data: await this.cityService.findAll(cityQueryDto),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api finds one city based on the provided city ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.CITY_FETCHED,
    type: CityType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
  @Permissions('city_view')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get(':id')
  async findOne(
    @Param() genericParamsId: GenericParamID,
  ): Promise<CityType> {
    return {
      message: ConstantMessage.CITY_FETCHED,
      data: await this.cityService.findOne(genericParamsId.id),
    };
  }
}
