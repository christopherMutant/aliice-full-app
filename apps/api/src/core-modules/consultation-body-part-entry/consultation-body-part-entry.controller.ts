// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Patch,
//   Param,
//   Delete,
//   HttpStatus,
//   UseGuards,
// } from '@nestjs/common';
// import { ConsultationBodyPartEntryService } from './consultation-body-part-entry.service';
// import { CreateConsultationBodyPartEntryDto } from './dto/create-consultation-body-part-entry.dto';
// import { UpdateConsultationBodyPartEntryDto } from './dto/update-consultation-body-part-entry.dto';
// import {
//   ApiBearerAuth,
//   ApiOperation,
//   ApiResponse,
//   ApiTags,
// } from '@nestjs/swagger';
// import { ConstantMessage } from '../../constants/constant-messages';
// import { GenericErrorResponse } from '../../shared/types/generic-error.type';
// import { RefRoleKeys } from '../../shared/types/enums';
// import { Roles } from '../../auth/decorator/roles.decorator';
// import { Permissions } from '../../auth/decorator/permission.decorator';
// import { BasicGuard } from '../../auth/guards/basic.guard';
// import { RolesAndPermissionsGuard } from '../../auth/guards/roles-and-permissions-guard.service';
// import { GenericParamID } from '../../shared/dtos/generic-params-id.dto';
// import { SuccessMessageResponse } from '../../shared/types/success-message.type';
// import { ConsultationBodyPartEntryResponseType } from './types/single-consultation-body.type';

// @ApiTags('Consultation Body Part Entry')
// @Controller('consultation-body-part-entry')
// export class ConsultationBodyPartEntryController {
//   constructor(
//     private readonly consultationBodyPartEntryService: ConsultationBodyPartEntryService,
//   ) {}

//   @ApiBearerAuth()
//   @ApiOperation({
//     description: 'This Api creates a consultation body entry',
//   })
//   @ApiResponse({
//     status: HttpStatus.OK,
//     description: ConstantMessage.CONSULTATION_BODY_ENTRY_CREATED,
//     type: ConsultationBodyPartEntryResponseType,
//   })
//   @ApiResponse({
//     status: HttpStatus.BAD_REQUEST,
//     description: 'Unavailable Entity',
//     type: GenericErrorResponse,
//   })
//   @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
//   @Permissions('consultation_body_entry_create')
//   @UseGuards(BasicGuard, RolesAndPermissionsGuard)
//   @Post()
//   async create(
//     @Body()
//     createConsultationBodyPartEntryDto: CreateConsultationBodyPartEntryDto,
//   ): Promise<ConsultationBodyPartEntryResponseType> {
//     return {
//       message: ConstantMessage.CONSULTATION_BODY_ENTRY_CREATED,
//       data: await this.consultationBodyPartEntryService.create(
//         createConsultationBodyPartEntryDto,
//       ),
//     };
//   }

//   @ApiBearerAuth()
//   @ApiOperation({
//     description:
//       'This Api fetches a consultation body based on the given consultation body part ID',
//   })
//   @ApiResponse({
//     status: HttpStatus.OK,
//     description: ConstantMessage.CONSULTATION_BODY_ENTRY_FETCHED,
//     type: ConsultationBodyPartEntryResponseType,
//   })
//   @ApiResponse({
//     status: HttpStatus.BAD_REQUEST,
//     description: 'Unavailable Entity',
//     type: GenericErrorResponse,
//   })
//   @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
//   @Permissions('consultation_body_entry_view')
//   @UseGuards(BasicGuard, RolesAndPermissionsGuard)
//   @Get(':id')
//   async findOne(
//     @Param() genericParamId: GenericParamID,
//   ): Promise<ConsultationBodyPartEntryResponseType> {
//     return {
//       message: ConstantMessage.CONSULTATION_BODY_ENTRY_FETCHED,
//       data: await this.consultationBodyPartEntryService.findOne(
//         genericParamId.id,
//       ),
//     };
//   }

//   @ApiBearerAuth()
//   @ApiOperation({
//     description:
//       'This Api updates a consultation body entry based on the given consultation body entry ID',
//   })
//   @ApiResponse({
//     status: HttpStatus.OK,
//     description: ConstantMessage.CONSULTATION_BODY_ENTRY_UPDATED,
//     type: SuccessMessageResponse,
//   })
//   @ApiResponse({
//     status: HttpStatus.BAD_REQUEST,
//     description: 'Unavailable Entity',
//     type: GenericErrorResponse,
//   })
//   @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
//   @Permissions('consultation_body_entry_update')
//   @UseGuards(BasicGuard, RolesAndPermissionsGuard)
//   @Patch(':id')
//   async update(
//     @Param() genericParamId: GenericParamID,
//     @Body()
//     updateConsultationBodyPartEntryDto: UpdateConsultationBodyPartEntryDto,
//   ): Promise<SuccessMessageResponse> {
//     await this.consultationBodyPartEntryService.update(
//       genericParamId.id,
//       updateConsultationBodyPartEntryDto,
//     );
//     return {
//       message: ConstantMessage.CONSULTATION_BODY_ENTRY_UPDATED,
//     };
//   }

//   @ApiBearerAuth()
//   @ApiOperation({
//     description:
//       'This Api deletes a consultation body entry based on the given consultation body entry ID',
//   })
//   @ApiResponse({
//     status: HttpStatus.OK,
//     description: ConstantMessage.CONSULTATION_BODY_ENTRY_DELETED,
//     type: SuccessMessageResponse,
//   })
//   @ApiResponse({
//     status: HttpStatus.BAD_REQUEST,
//     description: 'Unavailable Entity',
//     type: GenericErrorResponse,
//   })
//   @Roles(RefRoleKeys.SUPER_ADMIN)
//   @Permissions('consultation_body_entry_delete')
//   @UseGuards(BasicGuard, RolesAndPermissionsGuard)
//   @Delete(':id')
//   async remove(
//     @Param() genericParamId: GenericParamID,
//   ): Promise<SuccessMessageResponse> {
//     await this.consultationBodyPartEntryService.remove(
//       genericParamId.id,
//     );
//     return {
//       message: ConstantMessage.CONSULTATION_BODY_ENTRY_DELETED,
//     };
//   }
// }
