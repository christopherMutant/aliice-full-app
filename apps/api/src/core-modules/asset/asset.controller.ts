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
import { AssetService } from './asset.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { AssetQueryDto } from './dto/asset-query.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ConstantMessage } from '../../constants/constant-messages';
import { GenericErrorResponse } from '../../shared/types/generic-error.type';
import { RefRoleKeys } from '../../shared/types/enums';
import { Roles } from '../../auth/decorator/roles.decorator';
import { Permissions } from '../../auth/decorator/permission.decorator';
import { BasicGuard } from '../../auth/guards/basic.guard';
import { RolesAndPermissionsGuard } from '../../auth/guards/roles-and-permissions-guard.service';
import { GenericParamID } from '../../shared/dtos/generic-params-id.dto';
import { SuccessMessageResponse } from '../../shared/types/success-message.type';
import { AssetType } from './types/single-analysis.type';
import { AssetListType } from './types/analysis-list.type';

@ApiTags('Assets')
@Controller('asset')
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This Api creates an asset',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.ASSET_CREATED,
    type: AssetType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
  @Permissions('asset_create')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Post()
  async create(
    @Body() createAssetDto: CreateAssetDto,
  ): Promise<AssetType> {
    return {
      message: ConstantMessage.ASSET_CREATED,
      data: await this.assetService.create(createAssetDto),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This Api fetches a list of assets',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.SUCCESS,
    type: AssetListType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
  @Permissions('asset_get')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get()
  async findAll(
    @Query() assetQueryDto: AssetQueryDto,
  ): Promise<AssetListType> {
    return {
      message: ConstantMessage.SUCCESS,
      data: await this.assetService.findAll(assetQueryDto),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api fetches an asset based on the given asset ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.ASSET_FETCHED,
    type: AssetType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
  @Permissions('asset_view')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get(':id')
  async findOne(
    @Param() genericParamId: GenericParamID,
  ): Promise<AssetType> {
    return {
      message: ConstantMessage.ASSET_FETCHED,
      data: await this.assetService.findOne(genericParamId.id),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api updates an asset based on the given asset ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.ASSET_UPDATED,
    type: SuccessMessageResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
  @Permissions('asset_update')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Patch(':id')
  async update(
    @Param() genericParamId: GenericParamID,
    @Body() updateAssetDto: UpdateAssetDto,
  ): Promise<SuccessMessageResponse> {
    await this.assetService.update(genericParamId.id, updateAssetDto);

    return { message: ConstantMessage.ASSET_UPDATED };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api deletes an asset based on the given asset ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.ASSET_DELETED,
    type: SuccessMessageResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
  @Permissions('asset_delete')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Delete(':id')
  async remove(
    @Param() genericParamId: GenericParamID,
  ): Promise<SuccessMessageResponse> {
    await this.assetService.remove(genericParamId.id);

    return { message: ConstantMessage.ASSET_DELETED };
  }
}
