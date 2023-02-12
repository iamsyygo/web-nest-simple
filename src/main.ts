import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getLocalIP } from './utils';
import * as ora from 'ora';
import { HttpExceptionFilter } from './filters/http-exception/http-exception.filter';
import { TransformInterceptor } from './interceptor/transform/transform.interceptor';
import { knife4jConfig } from './configs/docs';
import { BaseExceptionFilter } from './filters/base-exception/base-exception.filter';
import { ConsoleLogInterceptor } from './interceptor/console-log/console-log.interceptor';
import { ConfigService } from '@nestjs/config';
const spinner = ora();

async function bootstrap() {
  spinner.start('服务启动中...🛫\n');

  const app = await NestFactory.create(AppModule, {
    // cors: false, // 跨域
    // bodyParser: false, // body 解析
    logger: false, // 日志
  });

  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalInterceptors(new ConsoleLogInterceptor());
  app.useGlobalFilters(new BaseExceptionFilter()); //  v1.1 2023-02-11 不使用 BaseExceptionFilter 来处理程序所有异常错误逻辑(负责抛出错误前台),改用拦截器 ConsoleLogInterceptor 来处理程序异常(可以捕获错误位置)
  app.useGlobalFilters(new HttpExceptionFilter());
  app.setGlobalPrefix('api', { exclude: ['api/auth/login'] });
  knife4jConfig(app);

  const configService = app.get(ConfigService);
  const port = configService.get('APP_PROT') || 8030;

  await app.listen(port);

  spinner.succeed(`服务启动成功: http://${getLocalIP()}:${port}`);
  spinner.succeed(`连接数据库成功: ${configService.get('DATABASE')?.database}`);
  spinner.succeed(`📖 http://${getLocalIP()}:${port}/doc.html`);
  spinner.succeed(`Swagger: http://${getLocalIP()}:${port}/api-doc`);
}
bootstrap();
