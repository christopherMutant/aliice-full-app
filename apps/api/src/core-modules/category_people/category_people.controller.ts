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
} from '@nestjs/common';
import { CategoryPeopleService } from './category_people.service';
import { CreateCategoryPersonDto } from './dto/create-category_person.dto';
import { UpdateCategoryPersonDto } from './dto/update-category_person.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ConstantMessage } from '../../constants/constant-messages';
import { CategoryPeopleType } from './types/category-people.type';
import { GenericErrorResponse } from '../../shared/types/generic-error.type';
import { Roles } from '../../auth/decorator/roles.decorator';
import { RefRoleKeys } from '../../shared/types/enums';
import { Permissions } from '../../auth/decorator/permission.decorator';
import { BasicGuard } from '../../auth/guards/basic.guard';
import { RolesAndPermissionsGuard } from '../../auth/guards/roles-and-permissions-guard.service';
import { SuccessMessageResponse } from '../../shared/types/success-message.type';
import { GenericParamID } from '../../shared/dtos/generic-params-id.dto';
import { CategoryPeopleListType } from './types/category-people-list.type';

@ApiTags('Category People')
@Controller('category-people')
export class CategoryPeopleController {
  constructor(
    private readonly categoryPeopleService: CategoryPeopleService,
  ) {}

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This api creates a new people category',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: ConstantMessage.CATEGORY_PEOPLE_CREATED,
    type: CategoryPeopleType,
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
  @Permissions('category_people_created')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Post()
  async create(
    @Body() createCategoryPersonDto: CreateCategoryPersonDto,
  ): Promise<CategoryPeopleType> {
    return {
      message: ConstantMessage.CATEGORY_PEOPLE_CREATED,
      data: await this.categoryPeopleService.create(
        createCategoryPersonDto,
      ),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description: 'This api will return all the category people list',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: ConstantMessage.SUCCESS,
    type: CategoryPeopleListType,
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
  @Permissions('category_people_get')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Get('list')
  async categoryPeopleList(): Promise<CategoryPeopleListType> {
    return {
      message: ConstantMessage.SUCCESS,
      data: await this.categoryPeopleService.categoryPeopleList(),
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This api updates a people category based on the id provided',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.CATEGORY_PEOPLE_UPDATED,
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
  @Permissions('category_people_update')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Patch(':id')
  async update(
    @Param() genericParamId: GenericParamID,
    @Body() updateCategoryPersonDto: UpdateCategoryPersonDto,
  ): Promise<SuccessMessageResponse> {
    await this.categoryPeopleService.update(
      genericParamId.id,
      updateCategoryPersonDto,
    );
    return {
      message: ConstantMessage.CATEGORY_PEOPLE_UPDATED,
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    description:
      'This api deletes people category based on the id provided',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ConstantMessage.CATEGORY_PEOPLE_DELETE,
    type: SuccessMessageResponse,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Unavailable Entity',
    type: GenericErrorResponse,
  })
  @Roles(RefRoleKeys.SUPER_ADMIN, RefRoleKeys.DOCTOR)
  @Permissions('category_people_delete')
  @UseGuards(BasicGuard, RolesAndPermissionsGuard)
  @Delete(':id')
  async remove(
    @Param() genericParamId: GenericParamID,
  ): Promise<SuccessMessageResponse> {
    await this.categoryPeopleService.remove(genericParamId.id);
    return {
      message: ConstantMessage.CATEGORY_PEOPLE_DELETE,
    };
  }
}
