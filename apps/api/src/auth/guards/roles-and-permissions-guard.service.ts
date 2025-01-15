import {
  CanActivate,
  ConflictException,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorator/roles.decorator';
import { RefRoleKeys } from '../../shared/types/enums';
import { AppErrorMessages } from '../../constants/app-error-messages';
import { UserRole } from '../../core-modules/role/entities/user-role.entity';
import { PERMISSIONS_KEY } from '../decorator/permission.decorator';

@Injectable()
export class RolesAndPermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<
      RefRoleKeys[]
    >(ROLES_KEY, [context.getHandler(), context.getClass()]);

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    if (!user) {
      throw new ConflictException(AppErrorMessages.insufficient_role);
    }

    const requiredRoleCheck = requiredRoles.some(role =>
      user.userRoles
        .map((userRole: UserRole) => userRole.refRole.key)
        .includes(role),
    );

    if (!requiredRoleCheck) {
      throw new ConflictException(AppErrorMessages.insufficient_role);
    }

    const requiredPermissions = this.reflector.getAllAndOverride<
      string[]
    >(PERMISSIONS_KEY, [context.getHandler(), context.getClass()]);

    if (!requiredPermissions) {
      return true;
    }

    const userPermissions = user.userRoles.flatMap(
      (userRole: UserRole) => userRole.refRole.permissions,
    );

    const hasRequiredPermission = requiredPermissions.every(
      permission => userPermissions.includes(permission),
    );

    if (!hasRequiredPermission) {
      throw new ConflictException(
        AppErrorMessages.insufficient_permission,
      );
    }

    return true;
  }
}
