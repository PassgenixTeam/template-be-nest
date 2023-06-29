import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IResponse } from '../interfaces/response.interface';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, IResponse<T>>
{
  private readonly logger = new Logger(TransformInterceptor.name);

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<IResponse<T>> {
    return next.handle().pipe(
      map((data) => {
        return {
          statusCode: context.switchToHttp().getResponse().statusCode,
          data,
          currentTimestamp: new Date().getTime(),
          message: 'Success',
        };
      }),
      catchError((err) => {
        this.logger.error(err.message, err.stack);
        throw err;
      }),
    );
  }
}
