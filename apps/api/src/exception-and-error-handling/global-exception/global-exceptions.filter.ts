import {
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { BaseExceptionFilter } from '@nestjs/core';
import { StaticLogger } from '../logger/winston';
import { QueryFailedError, TypeORMError } from 'typeorm';
@Catch()
export class GlobalExceptionsFilter extends BaseExceptionFilter {
  constructor() {
    super();
  }
  catch(
    exception: HttpException | Error | QueryFailedError,
    host: ArgumentsHost,
  ): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (exception instanceof TypeORMError) {
      const response = host.switchToHttp().getResponse();
      const status = HttpStatus.INTERNAL_SERVER_ERROR;

      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toDateString(),
        path: request.url,
        method: request.method,
        message: 'Query failed error occurred.',
        error: exception.message,
      });
    }

    if (exception instanceof HttpException) {
      const status =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;

      const notImplemented = status === HttpStatus.NOT_IMPLEMENTED;
      const hasResponse = exception.getResponse();

      /** Making the same response as Special case  */
      if (typeof hasResponse === 'object') {
        hasResponse['timestamp'] = new Date().toDateString();
        hasResponse['path'] = request.url;
        hasResponse['method'] = request.method;
      }
      const errorResponse = hasResponse
        ? hasResponse
        : {
            statusCode: status,
            timestamp: new Date().toDateString(),
            path: request.url,
            method: request.method,
            message: exception.message || exception.name || null,
            error: status.toString(),
          };

      /** Special Case */
      if (notImplemented && hasResponse) {
        StaticLogger.alertLog(
          ' [Not Implemented Special Case] ' +
            JSON.stringify(errorResponse),
        );
        response.status(HttpStatus.OK).json(errorResponse);
      } else {
        StaticLogger.instance.error(exception);
        response.status(status).json(errorResponse);
      }
    } else {
      StaticLogger.alertLog(
        ' [Unhandled Exception] ' + exception.stack,
      );
      super.catch(exception, host);
    }
  }
}
