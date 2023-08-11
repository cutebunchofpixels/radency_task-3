import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import {
  BaseError,
  EmptyResultError,
  QueryError,
  ForeignKeyConstraintError,
} from 'sequelize';

@Catch(BaseError)
export class SequelizeFilter implements ExceptionFilter {
  catch(exception: BaseError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let message: string;
    let statusCode: HttpStatus;

    switch (exception.constructor) {
      case EmptyResultError:
        message = 'Requested database entity could not be found';
        statusCode = HttpStatus.NOT_FOUND;
        break;
      case QueryError:
        message = 'Database query could not be executed';
        statusCode = HttpStatus.BAD_REQUEST;
        break;
      case ForeignKeyConstraintError:
        message = 'Your request violates database entity relations';
        statusCode = HttpStatus.BAD_REQUEST;
        break;
      default:
        message = 'Database error occured';
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        break;
    }

    response.status(statusCode).json({
      status: statusCode,
      message,
    });
  }
}
