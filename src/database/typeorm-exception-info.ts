import { HttpStatus } from '@nestjs/common';

export class TypeORMExceptionInfo {
  static withErrorCode(
    status: HttpStatus,
    message: string,
    code: string,
  ): TypeORMExceptionInfo {
    const exceptionInfo = new this(status, message);
    exceptionInfo.code = code;
    exceptionInfo.see = TypeORMExceptionInfo.documentationLink;

    return exceptionInfo;
  }

  constructor(status: HttpStatus, message: string) {
    this.statusCode = status;
    this.message = message;
  }

  private static readonly documentationLink =
    'https://www.postgresql.org/docs/current/errcodes-appendix.html';

  statusCode: HttpStatus;
  message: string;
  code?: string;
  //postgres documentation link
  see?: string;
}
