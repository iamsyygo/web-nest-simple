// Description: HttpExceptionFilter 🪂
// v1.1 2021-02-11 HttpExceptionFilter 只用来捕获如 NotFoundException 的无法找到资源的异常或者无法匹配路由的请求(其它的均使用拦截器 ConsoleLogInterceptor 来处理程序异常,容易捕获错误位置)
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { Logger } from 'src/configs/logs';
import { getNowTime } from 'src/utils';

@Catch(HttpException)
export class HttpExceptionFilter<T = HttpException> implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    console.log(exception);

    const result = {
      timestamp: getNowTime(),
      path: request.url,
      status,
      success: false,
      error: exception.message,
      message: `${status >= 500 ? 'Service Error' : 'Client Error'}`,
    };

    Logger.handleLogStatus(ctx.getRequest(), result);

    response.status(status).json(result);
  }
}
