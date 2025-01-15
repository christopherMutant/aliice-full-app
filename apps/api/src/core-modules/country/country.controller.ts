import {
  Controller,
  Get,
  Param,
  HttpStatus,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CountryService } from './country.service';
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
import { BasicGuard } from '../../auth/guards/basic.guard';
import { RolesAndPermissionsGuard } from '../../auth/guards/roles-and-permissions-guard.service';
import { CountryType } from './types/single-country-type';
import { CountryListType } from './types/country-list-type';
import { CountryQueryDto } from './dto/country-query.dto';

@ApiTags('Countries')
@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This Api find all countries',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.COUNTRIES_FETCHED,
    type: CountryListType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
  @Permissions('country_get')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get()
  async findAll(
    @Query() countryQueryDto: CountryQueryDto,
  ): Promise<CountryListType> {
    return {
      message: ConstantMessage.COUNTRIES_FETCHED,
      data: await this.countryService.findAll(countryQueryDto),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api finds one country based on the provided country ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.COUNTRIES_FETCHED,
    type: CountryType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
  @Permissions('country_view')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get(':id')
  async findOne(
    @Param() genericParamsId: GenericParamID,
  ): Promise<CountryType> {
    return {
      message: ConstantMessage.COUNTRY_FETCHED,
      data: await this.countryService.findOne(genericParamsId.id),
    };
  }
}
