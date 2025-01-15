import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { RefRoleKeys } from '../../shared/types/enums';

export const ROLES_KEY = 'roles';
export const Roles = (
  ...roles: RefRoleKeys[]
): CustomDecorator<string> => SetMetadata(ROLES_KEY, roles);
