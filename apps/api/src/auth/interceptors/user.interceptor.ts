import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { Observable } from 'rxjs';

@Injectable()
export class UserInterceptor implements NestInterceptor {
  constructor(private readonly cls: ClsService) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<unknown> | Promise<Observable<unknown>> {
    const request = context.switchToHttp().getRequest();
    if (request.user && request.user) {
      this.cls.set('UserToken', request.user);
    }
    return next.handle();
  }
}
