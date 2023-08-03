import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { EntityNotFoundError, QueryFailedError, TypeORMError } from 'typeorm';
import { TypeORMExceptionInfo } from './typeorm-exception-info';

@Catch(TypeORMError)
export class TypeORMFilter implements ExceptionFilter {
  catch(exception: TypeORMError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let message: string;
    let postgresErrorCode: string;
    let statusCode: HttpStatus;

    switch (exception.constructor) {
      case QueryFailedError:
        statusCode = HttpStatus.BAD_REQUEST;
        message = 'Database query could not be executed';
        postgresErrorCode = (exception as any).code;
        break;
      case EntityNotFoundError: // this is another TypeOrm error
        statusCode = HttpStatus.NOT_FOUND;
        message = 'Requested entity could not be found';
        postgresErrorCode = (exception as any).code;
        break;
      default:
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        message = 'Database error occured';
    }

    let messageBody: TypeORMExceptionInfo;

    if (postgresErrorCode) {
      messageBody = TypeORMExceptionInfo.withErrorCode(
        statusCode,
        message,
        postgresErrorCode,
      );
    } else {
      messageBody = new TypeORMExceptionInfo(statusCode, message);
    }

    response.status(statusCode).json(messageBody);
  }
}
