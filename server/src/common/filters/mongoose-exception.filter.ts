import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(BadRequestException)
export class MongooseExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    if (
      typeof exceptionResponse === 'object' &&
      (exceptionResponse as any).message &&
      (exceptionResponse as any).message.includes('validation failed')
    ) {
      const errors = (exceptionResponse as any).message;
      const formattedErrors = this.formatMongooseErrors(errors);

      return response.status(status).json({
        statusCode: status,
        message: 'Validation failed',
        errors: formattedErrors,
      });
    }

    response.status(status).json({
      statusCode: status,
      message: exception.message,
    });
  }

  private formatMongooseErrors(errors: any): Record<string, string> {
    const formatted: Record<string, string> = {};
    for (const key in errors) {
      if (errors[key].properties) {
        formatted[key] = errors[key].properties.message;
      }
    }
    return formatted;
  }
}
