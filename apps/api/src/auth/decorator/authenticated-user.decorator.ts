import {
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';

export const AuthenticatedUser = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const { user } = request;
    return data ? user[data] : user;
  },
);
