// Description: Base exception filter(程序异常) 🪂
// v1.1 2023-02-11 不使用 BaseExceptionFilter 来处理程序所有异常错误逻辑(负责抛出错误前台),改用拦截器 ConsoleLogInterceptor 来处理程序异常(可以捕获错误位置)

import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class BaseExceptionFilter<T> implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    // const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    // const result = {
    //   path: request.url,
    //   status: 500,
    //   success: false,
    //   error: exception.toString(),
    //   message: 'Service Error',
    //   timestamp: getNowTime(),
    // };

    // console.log(exception);

    const result = exception;

    // Logger.handleLogStatus(request, result);
    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(result);
  }
}
