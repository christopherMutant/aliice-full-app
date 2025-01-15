// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Param,
//   Delete,
//   HttpStatus,
//   Query,
//   UseGuards,
//   Patch,
// } from '@nestjs/common';
// import { ConsultationService } from './consultation.service';
// import { CreateConsultationDto } from './dto/create-consultation.dto';
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
// import { GenericParamID } from '../../shared/dtos/generic-params-id.dto';
// import { SuccessMessageResponse } from '../../shared/types/success-message.type';
// import { ConsultationQueryDto } from './dto/consultation-list.dto';
// import { ConsultationType } from './types/single-consultation.type';
// import { ConsultationListType } from './types/consultation-list.type';
// import { BasicGuard } from '../../auth/guards/basic.guard';
// import { RolesAndPermissionsGuard } from '../../auth/guards/roles-and-permissions-guard.service';
// import { UpdateConsultationDto } from './dto/update-consultation.dto';

// @ApiTags('Consultations')
// @Controller('consultation')
// export class ConsultationController {
//   constructor(
//     private readonly consultationService: ConsultationService,
//   ) {}

//   @ApiBearerAuth()
//   @ApiOperation({
//     description:
//       'This Api creates a consultation, consultation body must follow the body structure of the related consultation title',
//   })
//   @ApiResponse({
//     status: HttpStatus.OK,
//     description: ConstantMessage.CONSULTATION_CREATED,
//     type: ConsultationListType,
//   })
//   @ApiResponse({
//     status: HttpStatus.BAD_REQUEST,
//     description: 'Unavailable Entity',
//     type: GenericErrorResponse,
//   })
//   @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
//   @Permissions('consultation_create')
//   @UseGuards(BasicGuard, RolesAndPermissionsGuard)
//   @Post()
//   async create(
//     @Body() createConsultationDto: CreateConsultationDto,
//   ): Promise<ConsultationType> {
//     return {
//       message: ConstantMessage.CONSULTATION_CREATED,
//       data: await this.consultationService.create(
//         createConsultationDto,
//       ),
//     };
//   }

//   @ApiBearerAuth()
//   @ApiOperation({
//     description:
//       'This Api finds all consultations based on the provided patient ID',
//   })
//   @ApiResponse({
//     status: HttpStatus.OK,
//     description: ConstantMessage.SUCCESS,
//     type: ConsultationListType,
//   })
//   @ApiResponse({
//     status: HttpStatus.BAD_REQUEST,
//     description: 'Unavailable Entity',
//     type: GenericErrorResponse,
//   })
//   @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
//   @Permissions('consultation_get')
//   @UseGuards(BasicGuard, RolesAndPermissionsGuard)
//   @Get()
//   async findAll(
//     @Query() consultationQueryDto: ConsultationQueryDto,
//   ): Promise<ConsultationListType> {
//     return {
//       message: ConstantMessage.SUCCESS,
//       data: await this.consultationService.findAll(
//         consultationQueryDto,
//       ),
//     };
//   }

//   @ApiBearerAuth()
//   @ApiOperation({
//     description:
//       'This Api finds one consultation based on the provided consultation ID',
//   })
//   @ApiResponse({
//     status: HttpStatus.OK,
//     description: ConstantMessage.CONSULTATION_FETCHED,
//     type: ConsultationType,
//   })
//   @ApiResponse({
//     status: HttpStatus.BAD_REQUEST,
//     description: 'Unavailable Entity',
//     type: GenericErrorResponse,
//   })
//   @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
//   @Permissions('consultation_view')
//   @UseGuards(BasicGuard, RolesAndPermissionsGuard)
//   @Get(':id')
//   async findOne(
//     @Param() genericParamsId: GenericParamID,
//   ): Promise<ConsultationType> {
//     return {
//       message: ConstantMessage.CONSULTATION_FETCHED,
//       data: await this.consultationService.findOne(
//         genericParamsId.id,
//       ),
//     };
//   }

//   @ApiBearerAuth()
//   @ApiOperation({
//     description:
//       'This Api updates one consultation based on the provided consultation ID',
//   })
//   @ApiResponse({
//     status: HttpStatus.OK,
//     description: ConstantMessage.CONSULTATION_UPDATED,
//     type: SuccessMessageResponse,
//   })
//   @ApiResponse({
//     status: HttpStatus.BAD_REQUEST,
//     description: 'Unavailable Entity',
//     type: GenericErrorResponse,
//   })
//   @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
//   @Permissions('consultation_update')
//   @UseGuards(BasicGuard, RolesAndPermissionsGuard)
//   @Patch(':id')
//   async update(
//     @Param() genericParamsId: GenericParamID,
//     @Body() updateConsultationDto: UpdateConsultationDto,
//   ): Promise<SuccessMessageResponse> {
//     await this.consultationService.update(
//       genericParamsId.id,
//       updateConsultationDto,
//     );
//     return { message: ConstantMessage.CONSULTATION_DELETED };
//   }

//   @ApiBearerAuth()
//   @ApiOperation({
//     description:
//       'This Api deletes one consultation based on the provided consultation ID',
//   })
//   @ApiResponse({
//     status: HttpStatus.OK,
//     description: ConstantMessage.CONSULTATION_DELETED,
//     type: SuccessMessageResponse,
//   })
//   @ApiResponse({
//     status: HttpStatus.BAD_REQUEST,
//     description: 'Unavailable Entity',
//     type: GenericErrorResponse,
//   })
//   @Roles(RefRoleKeys.SUPER_ADMIN)
//   @Permissions('consultation_delete')
//   @UseGuards(BasicGuard, RolesAndPermissionsGuard)
//   @Delete(':id')
//   async remove(
//     @Param() genericParamsId: GenericParamID,
//   ): Promise<SuccessMessageResponse> {
//     await this.consultationService.remove(genericParamsId.id);
//     return { message: ConstantMessage.CONSULTATION_DELETED };
//   }
// }
