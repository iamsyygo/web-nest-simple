// Description: 文档配置
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { knife4jSetup } from 'nestjs-knife4j';

export const knife4jConfig = (app) => {
  const options = new DocumentBuilder()
    .setTitle('NestJs API Docs')
    .setDescription('NestJs 的 API 文档')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api-doc', app, document);
  knife4jSetup(app, {
    urls: [
      {
        name: '🥽',
        url: `/api-json`,
        swaggerVersion: '1.0',
        location: `/api-json`,
      },
    ],
  });
};
