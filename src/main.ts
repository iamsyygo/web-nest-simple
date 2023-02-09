import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getLocalIP } from './utils';
import * as ora from 'ora';
import { LoggerService } from './configs/logs';
import { getFullPath } from './utils/path';
const spinner = ora();

async function bootstrap() {
  spinner.start('服务启动中...🛫\n');
  const app = await NestFactory.create(AppModule, {
    // cors: false, // 跨域
    // bodyParser: false, // body 解析
    logger: new LoggerService(getFullPath(__dirname, '../src/configs/logs')), // 日志
  });
  await app.listen(3000);
  spinner.succeed(`服务启动成功: http://${getLocalIP()}:3000`);
}
bootstrap();
