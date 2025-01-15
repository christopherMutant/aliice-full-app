import {
  Controller,
  Body,
  Patch,
  Param,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UserAddressService } from './user-address.service';
import { UpdateUserAddressDto } from './dto/update-user-address.dto';
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
import { GenericParamID } from '../../shared/dtos/generic-params-id.dto';
import { SuccessMessageResponse } from '../../shared/types/success-message.type';

@ApiTags('User Address')
@Controller('user-address')
export class UserAddressController {
  constructor(
    private readonly userAddressService: UserAddressService,
  ) {}

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This api updates the user address based on the id provided',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.USER_ADDRESS_CREATED,
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
  @Permissions('user_address_update')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Patch(':id')
  async update(
    @Param() genericParamId: GenericParamID,
    @Body() updateUserAddressDto: UpdateUserAddressDto,
  ): Promise<SuccessMessageResponse> {
    await this.userAddressService.update(
      genericParamId.id,
      updateUserAddressDto,
    );
    return {
      message: ConstantMessage.USER_ADDRESS_UPDATED,
    };
  }
}
