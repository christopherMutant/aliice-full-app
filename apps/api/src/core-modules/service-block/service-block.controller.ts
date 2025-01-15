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
import { ServiceBlockService } from './service-block.service';
import { CreateServiceBlockDto } from './dto/create-service-block.dto';
import { UpdateServiceBlockDto } from './dto/update-service-block.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ServiceBlockListQueryListingDto } from './dto/service-block-list.dto';
import { ConstantMessage } from '../../constants/constant-messages';
import { ServiceBlockType } from './types/single-service-block.type';
import { GenericErrorResponse } from '../../shared/types/generic-error.type';
import { Roles } from '../../auth/decorator/roles.decorator';
import { RefRoleKeys } from '../../shared/types/enums';
import { Permissions } from '../../auth/decorator/permission.decorator';
import { BasicGuard } from '../../auth/guards/basic.guard';
import { RolesAndPermissionsGuard } from '../../auth/guards/roles-and-permissions-guard.service';
import { ServiceBlockPaginatedListType } from './types/service-block-list.type';
import { GenericParamID } from '../../shared/dtos/generic-params-id.dto';
import { SuccessMessageResponse } from '../../shared/types/success-message.type';

@ApiTags('Service Blocks')
@Controller('service-block')
export class ServiceBlockController {
  constructor(
    private readonly serviceBlockService: ServiceBlockService,
  ) {}

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This Api creates a service block',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.SERVICE_BLOCK_CREATED,
    type: ServiceBlockType,
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
  @Permissions('service_block_create')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Post()
  async create(
    @Body() createServiceBlockDto: CreateServiceBlockDto,
  ): Promise<ServiceBlockType> {
    return {
      message: ConstantMessage.SERVICE_BLOCK_CREATED,
      data: await this.serviceBlockService.create(
        createServiceBlockDto,
      ),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This Api fetches a list of service blocks',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.SUCCESS,
    type: ServiceBlockPaginatedListType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN)
  @Permissions('service_block_get')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get()
  async findAll(
    @Query()
    serviceBlockListQueryListingDto: ServiceBlockListQueryListingDto,
  ): Promise<ServiceBlockPaginatedListType> {
    return await this.serviceBlockService.findAll(
      serviceBlockListQueryListingDto,
    );
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api fetches a service block based on the given service block ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.SERVICE_BLOCK_FETCHED,
    type: ServiceBlockType,
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
  @Permissions('service_block_view')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get(':id')
  async findOne(
    @Param() genericParamId: GenericParamID,
  ): Promise<ServiceBlockType> {
    return {
      message: ConstantMessage.SERVICE_BLOCK_FETCHED,
      data: await this.serviceBlockService.findOne(genericParamId.id),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api updates a service block based on the given service block ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.SERVICE_BLOCK_UPDATED,
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
  @Permissions('service_block_update')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Patch(':id')
  async update(
    @Param() genericParamId: GenericParamID,
    @Body() updateServiceBlockDto: UpdateServiceBlockDto,
  ): Promise<SuccessMessageResponse> {
    await this.serviceBlockService.update(
      genericParamId.id,
      updateServiceBlockDto,
    );

    return { message: ConstantMessage.SERVICE_BLOCK_UPDATED };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api deletes a service block based on the given service block ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.SERVICE_BLOCK_DELETED,
    type: SuccessMessageResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN)
  @Permissions('service_block_delete')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Delete(':id')
  async remove(
    @Param() genericParamId: GenericParamID,
  ): Promise<SuccessMessageResponse> {
    await this.serviceBlockService.remove(genericParamId.id);
    return { message: ConstantMessage.SERVICE_BLOCK_DELETED };
  }
}
