// Description: Response transform interceptor 🪂
import { CallHandler, ExecutionContext, HttpException, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Logger } from 'src/configs/logs';
import { getNowTime } from 'src/utils';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    return next.handle().pipe(
      map((data) => {
        const ctx = context.switchToHttp();
        const { url: path } = ctx.getRequest();
        let { statusCode: status } = ctx.getResponse();
        let prop = typeof data === 'string' ? 'message' : 'data';
        let response = {};
        // 防止通过 return new BadGatewayException() 抛出的错误,无法获取准确的状态码(return 默认为 200)
        if (data instanceof HttpException) {
          prop = 'message';
          status = data.getStatus();
          response = data.getResponse();
          delete response['statusCode'];
        }

        // console.log(context.getClass()['name']);
        const result = {
          timestamp: getNowTime(),
          path,
          status,
          success: true,
          [prop]: data,
          ...response,
          timeout: `+${Date.now() - now}ms`,
        };
        Logger.handleLogStatus(ctx.getRequest(), result, context);
        return result;
      }),
    );
  }
}
