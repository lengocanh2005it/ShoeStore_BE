import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { map, Observable } from 'rxjs';
import { ApiResponse } from 'src/utils/api-response.interface';
import { RESPONSE_MESSAGE } from 'src/utils/response-message.decorator';

@Injectable()
export class FormatResponseApiInterceptor<T> implements NestInterceptor<T> {
  constructor(private readonly reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<ApiResponse> | Promise<Observable<ApiResponse>> {
    const customMessage: string = this.reflector.get<string>(
      RESPONSE_MESSAGE,
      context.getHandler(),
    );
    const defaultMessage: string = 'Success';
    const message: string = customMessage ?? defaultMessage;

    const statusCode: number = context.switchToHttp().getResponse().statusCode;

    return next.handle().pipe(
      map((data) => ({
        statusCode,
        message,
        ...(data && { data }),
      })),
    );
  }
}
