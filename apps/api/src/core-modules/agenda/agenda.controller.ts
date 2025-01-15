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
import { AgendaService } from './agenda.service';
import { CreateAgendaDto } from './dto/create-agenda.dto';
import { UpdateAgendaDto } from './dto/update-agenda.dto';
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
import { AuthenticatedUser } from '../../auth/decorator/authenticated-user.decorator';
import { User } from '../all-entities';
import { GenericParamID } from '../../shared/dtos/generic-params-id.dto';
import { SuccessMessageResponse } from '../../shared/types/success-message.type';
import { AgendaQueryListingDto } from './dto/agenda-list.dto';
import { AgendaType } from './types/single-agenda.type';
import { PaginatedAgendaType } from './types/agenda-paginated.type';
import { AgendaDropdownListType } from './types/agenda-dropdown-list.type';
import { AgendaListType } from './types/agenda-list.type';

@ApiTags('Agendas')
@Controller('agenda')
export class AgendaController {
  constructor(private readonly agendaService: AgendaService) {}

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This Api creates a new agenda',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: ConstantMessage.AGENDA_CREATED,
    type: AgendaType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
  @Permissions('agenda_create')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Post()
  async create(
    @Body() createAgendaDto: CreateAgendaDto,
  ): Promise<AgendaType> {
    return {
      message: ConstantMessage.AGENDA_CREATED,
      data: await this.agendaService.create(createAgendaDto),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api finds all agendas based on the search queries',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.AGENDA_FETCHED,
    type: PaginatedAgendaType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN)
  @Permissions('agenda_get')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get()
  async findAll(
    @AuthenticatedUser() user: User,
    @Query() agendaQueryListingDto: AgendaQueryListingDto,
  ): Promise<AgendaListType> {
    return {
      message: ConstantMessage.AGENDA_FETCHED,
      data: await this.agendaService.findAll(
        agendaQueryListingDto,
        user,
      ),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This Api finds list of all agendas for dropdown',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.SUCCESS,
    type: AgendaDropdownListType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
  @Permissions('agenda_get_list')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get('list')
  async findAllList(): Promise<AgendaDropdownListType> {
    return {
      message: ConstantMessage.AGENDA_FETCHED,
      data: await this.agendaService.findAllList(),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api finds one the agenda based on the ID provided',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.AGENDA_FETCHED,
    type: AgendaType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
  @Permissions('agenda_view')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get(':id')
  async findOne(
    @Param() genericParamsId: GenericParamID,
  ): Promise<AgendaType> {
    return {
      message: ConstantMessage.AGENDA_FETCHED,
      data: await this.agendaService.findOne(genericParamsId.id),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api updates the agenda based on the ID provided',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.AGENDA_UPDATED,
    type: SuccessMessageResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
  @Permissions('agenda_update')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Patch(':id')
  async update(
    @Param() genericParamsId: GenericParamID,
    @Body() updateAgendaDto: UpdateAgendaDto,
  ): Promise<SuccessMessageResponse> {
    await this.agendaService.update(
      genericParamsId.id,
      updateAgendaDto,
    );
    return { message: ConstantMessage.AGENDA_UPDATED };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api deletes the agenda based on the ID provided',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.AGENDA_DELETE,
    type: SuccessMessageResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
  @Permissions('agenda_delete')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Delete(':id')
  async remove(
    @Param() genericParamsId: GenericParamID,
  ): Promise<SuccessMessageResponse> {
    await this.agendaService.remove(genericParamsId.id);
    return { message: ConstantMessage.AGENDA_DELETE };
  }
}
