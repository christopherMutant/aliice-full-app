import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { MedicalNoteService } from './medical-note.service';
import { UpdateMedicalNoteDto } from './dto/update-medical-note.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateMedicalNoteChildDto } from './dto/update-medical-note-child.dto';
import { AuthenticatedUser } from '../../auth/decorator/authenticated-user.decorator';
import { User } from '../all-entities';
import { RolesAndPermissionsGuard } from '../../auth/guards/roles-and-permissions-guard.service';
import { BasicGuard } from '../../auth/guards/basic.guard';
import { Roles } from '../../auth/decorator/roles.decorator';
import { RefRoleKeys } from '../../shared/types/enums';
import { ConstantMessage } from '../../constants/constant-messages';
import { GenericErrorResponse } from '../../shared/types/generic-error.type';
import { Permissions } from '../../auth/decorator/permission.decorator';
import { MedicalNoteType } from './types/single-medical-note.type';
import { MedicalNoteHistoryListType } from './types/medical-note-history-list.type';
import { SuccessMessageResponse } from '../../shared/types/success-message.type';

@ApiTags('Medical Notes')
@Controller('medical-note')
export class MedicalNoteController {
  constructor(
    private readonly medicalNoteService: MedicalNoteService,
  ) {}

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api fetches a medical note based on the given patient ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.MEDICAL_NOTE_FETCHED,
    type: MedicalNoteType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
  @Permissions('medical_note_view')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<MedicalNoteType> {
    return {
      message: ConstantMessage.MEDICAL_NOTE_FETCHED,
      data: await this.medicalNoteService.findOneByPatientId(id),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api fetches a list of history changes based on the given medical note child ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.SUCCESS,
    type: MedicalNoteHistoryListType,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
  @Permissions('medical_note_child_history_get')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get('history/:id')
  async findAll(
    @Param('id') id: string,
  ): Promise<MedicalNoteHistoryListType> {
    return {
      message: ConstantMessage.SUCCESS,
      data: await this.medicalNoteService.findAllHistory(id),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api updates a medical note based on the given medical note ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.MEDICAL_NOTE_UPDATED,
    type: SuccessMessageResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN)
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMedicalNoteDto: UpdateMedicalNoteDto,
  ): Promise<SuccessMessageResponse> {
    await this.medicalNoteService.update(id, updateMedicalNoteDto);
    return { message: ConstantMessage.MEDICAL_NOTE_UPDATED };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This Api updates a medical note childe based on the given medical note child ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.MEDICAL_NOTE_CHILD_UPDATED,
    type: SuccessMessageResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
  @Permissions('medical_note_child_update')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Patch('child/:id')
  async updateChild(
    @AuthenticatedUser() user: User,
    @Param('id') id: string,
    @Body() updateMedicalNoteChildDto: UpdateMedicalNoteChildDto,
  ): Promise<SuccessMessageResponse> {
    await this.medicalNoteService.updateChild(
      id,
      updateMedicalNoteChildDto,
      user,
    );

    return { message: ConstantMessage.MEDICAL_NOTE_CHILD_UPDATED };
  }
}
