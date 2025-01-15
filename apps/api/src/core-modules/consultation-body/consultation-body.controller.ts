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
// import { ConsultationBodyService } from './consultation-body.service';
// import { CreateConsultationBodyDto } from './dto/create-consultation-body.dto';
// import { UpdateConsultationBodyDto } from './dto/update-consultation-body.dto';
// import {
//   ApiBearerAuth,
//   ApiOperation,
//   ApiResponse,
//   ApiTags,
// } from '@nestjs/swagger';
// import { ConstantMessage } from '../../constants/constant-messages';
// import { GenericErrorResponse } from '../../shared/types/generic-error.type';
// import { Roles } from '../../auth/decorator/roles.decorator';
// import { RefRoleKeys } from '../../shared/types/enums';
// import { Permissions } from '../../auth/decorator/permission.decorator';
// import { BasicGuard } from '../../auth/guards/basic.guard';
// import { RolesAndPermissionsGuard } from '../../auth/guards/roles-and-permissions-guard.service';
// import { GenericParamID } from '../../shared/dtos/generic-params-id.dto';
// import { SuccessMessageResponse } from '../../shared/types/success-message.type';
// import { ConsultationBodyPartResponseType } from './types/single-consultation-body.type';

// @ApiTags('Consultation Body')
// @Controller('consultation-body')
// export class ConsultationBodyController {
//   constructor(
//     private readonly consultationBodyService: ConsultationBodyService,
//   ) {}

//   @ApiBearerAuth()
//   @ApiOperation({
//     description: 'This Api creates a consultation body',
//   })
//   @ApiResponse({
//     status: HttpStatus.OK,
//     description: ConstantMessage.CONSULTATION_BODY_CREATED,
//     type: ConsultationBodyPartResponseType,
//   })
//   @ApiResponse({
//     status: HttpStatus.BAD_REQUEST,
//     description: 'Unavailable Entity',
//     type: GenericErrorResponse,
//   })
//   @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
//   @Permissions('consultation_body_create')
//   @UseGuards(BasicGuard, RolesAndPermissionsGuard)
//   @Post()
//   async create(
//     @Body() createConsultationBodyDto: CreateConsultationBodyDto,
//   ): Promise<ConsultationBodyPartResponseType> {
//     return {
//       message: ConstantMessage.CONSULTATION_BODY_CREATED,
//       data: await this.consultationBodyService.create(
//         createConsultationBodyDto,
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
//     description: ConstantMessage.CONSULTATION_BODY_FETCHED,
//     type: ConsultationBodyPartResponseType,
//   })
//   @ApiResponse({
//     status: HttpStatus.BAD_REQUEST,
//     description: 'Unavailable Entity',
//     type: GenericErrorResponse,
//   })
//   @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
//   @Permissions('consultation_body_view')
//   @UseGuards(BasicGuard, RolesAndPermissionsGuard)
//   @Get(':id')
//   async findOne(
//     @Param() genericParamId: GenericParamID,
//   ): Promise<ConsultationBodyPartResponseType> {
//     return {
//       message: ConstantMessage.CONSULTATION_BODY_FETCHED,
//       data: await this.consultationBodyService.findOne(
//         genericParamId.id,
//       ),
//     };
//   }

//   @ApiBearerAuth()
//   @ApiOperation({
//     description:
//       'This Api updates a consultation body based on the given consultation body part ID, can only update text of text consultation type',
//   })
//   @ApiResponse({
//     status: HttpStatus.OK,
//     description: ConstantMessage.CONSULTATION_BODY_UPDATED,
//     type: SuccessMessageResponse,
//   })
//   @ApiResponse({
//     status: HttpStatus.BAD_REQUEST,
//     description: 'Unavailable Entity',
//     type: GenericErrorResponse,
//   })
//   @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.FRONT_DESK)
//   @Permissions('consultation_body_update')
//   @UseGuards(BasicGuard, RolesAndPermissionsGuard)
//   @Patch(':id')
//   async update(
//     @Param() genericParamId: GenericParamID,
//     @Body() updateConsultationBodyDto: UpdateConsultationBodyDto,
//   ): Promise<SuccessMessageResponse> {
//     await this.consultationBodyService.update(
//       genericParamId.id,
//       updateConsultationBodyDto,
//     );
//     return { message: ConstantMessage.CONSULTATION_BODY_UPDATED };
//   }

//   @ApiBearerAuth()
//   @ApiOperation({
//     description:
//       'This Api deletes a consultation body based on the given consultation body part ID',
//   })
//   @ApiResponse({
//     status: HttpStatus.OK,
//     description: ConstantMessage.CONSULTATION_BODY_DELETED,
//     type: SuccessMessageResponse,
//   })
//   @ApiResponse({
//     status: HttpStatus.BAD_REQUEST,
//     description: 'Unavailable Entity',
//     type: GenericErrorResponse,
//   })
//   @Roles(RefRoleKeys.SUPER_ADMIN)
//   @Permissions('consultation_body_delete')
//   @UseGuards(BasicGuard, RolesAndPermissionsGuard)
//   @Delete(':id')
//   async remove(
//     @Param() genericParamId: GenericParamID,
//   ): Promise<SuccessMessageResponse> {
//     await this.consultationBodyService.remove(genericParamId.id);
//     return { message: ConstantMessage.CONSULTATION_BODY_DELETED };
//   }
// }
