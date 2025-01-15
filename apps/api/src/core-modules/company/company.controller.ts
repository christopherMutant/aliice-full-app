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
  Query,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ConstantMessage } from '../../constants/constant-messages';
import { CompanyType } from './types/company.type';
import { GenericErrorResponse } from '../../shared/types/generic-error.type';
import { BasicGuard } from '../../auth/guards/basic.guard';
import { RolesAndPermissionsGuard } from '../../auth/guards/roles-and-permissions-guard.service';
import { Permissions } from '../../auth/decorator/permission.decorator';
import { Roles } from '../../auth/decorator/roles.decorator';
import { RefRoleKeys } from '../../shared/types/enums';
import { SuccessMessageResponse } from '../../shared/types/success-message.type';
import { GenericParamID } from '../../shared/dtos/generic-params-id.dto';
import { PaginatedCompany } from './types/company.list';
import { CompanyQueryListingDto } from './dto/company.list.dto';

@ApiTags('Company')
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This API creates a new company entity',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: ConstantMessage.COMPANY_CREATED,
    type: CompanyType,
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
  @Permissions('company_create')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Post()
  async create(
    @Body() createCompanyDto: CreateCompanyDto,
  ): Promise<CompanyType> {
    return {
      message: ConstantMessage.COMPANY_CREATED,
      data: await this.companyService.create(createCompanyDto),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This API returns a list of companies',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.COMPANY_FETCHED,
    type: PaginatedCompany,
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
  @Permissions('company_get')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get()
  async findAll(
    @Query() companyQueryListingDto: CompanyQueryListingDto,
  ): Promise<PaginatedCompany> {
    return await this.companyService.findAll(companyQueryListingDto);
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api finds one the company base on the Id provided',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.COMPANY_FETCHED,
    type: CompanyType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(
    RefRoleKeys.SUPER_ADMIN,
    RefRoleKeys.FRONT_DESK,
    RefRoleKeys.FRONT_DESK,
  )
  @Permissions('company_view')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get(':id')
  async findOne(
    @Param() genericParamsId: GenericParamID,
  ): Promise<CompanyType> {
    return {
      message: ConstantMessage.COMPANY_FETCHED,
      data: await this.companyService.findOne(genericParamsId.id),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This API updates a company based on the provided id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.COMPANY_UPDATED,
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
  @Permissions('company_update')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Patch(':id')
  async update(
    @Param() genericParamId: GenericParamID,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ): Promise<SuccessMessageResponse> {
    await this.companyService.update(
      genericParamId.id,
      updateCompanyDto,
    );
    return {
      message: ConstantMessage.COMPANY_UPDATED,
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This API deletes a company based on the provided id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.COMPANY_DELETED,
    type: SuccessMessageResponse,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.DOCTOR)
  @Permissions('company_delete')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Delete(':id')
  async remove(
    @Param() genericParamId: GenericParamID,
  ): Promise<SuccessMessageResponse> {
    await this.companyService.remove(genericParamId.id);
    return {
      message: ConstantMessage.COMPANY_DELETED,
    };
  }
}
