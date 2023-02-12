// Description: Console log interceptor 🪂
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';
import { Logger } from 'src/configs/logs';
import { getNowTime } from 'src/utils';

@Injectable()
export class ConsoleLogInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    return next.handle().pipe(
      catchError((err) => {
        const ctx = context.switchToHttp();
        const res = ctx.getResponse();
        const status = res.statusCode;

        const request = ctx.getRequest<Request>();
        const result = {
          path: request.url,
          status,
          success: false,
          error: err.toString(),
          message: status >= 500 ? 'Service Error' : 'Client Error',
          timestamp: getNowTime(),
          timeout: `+${Date.now() - now}ms`,
        };
        Logger.handleLogStatus(request, result, context);

        return throwError(result); // 返回到异常过滤器 BaseExceptionFilter 中,返回给前端
      }),
    );
  }
}
