import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SimpleModule } from './core/simple/simple.module';
import { LoggerMiddleware } from './middleware/logger/index.middleware';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        '.env',
        `.${process.env.RUN_ENV == 'dev' ? 'dev' : 'pro'}.env`,
      ], // 如果在多个文件中找到一个变量，则第一个优先
      isGlobal: true, // 是否全局
    }),
    SimpleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
