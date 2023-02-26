// 抽离 App 配置

import { ConfigModule } from '@nestjs/config';
import * as ora from 'ora';
import { getYmlConfig } from 'src/utils/yml';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { DataSource } from 'typeorm';
// import * as CoreAllModule from '@/core';
import * as fs from 'fs';
import * as path from 'path';
// 获取core下的目录
const croePath = path.resolve(__dirname, '../../core');
const coreDris = fs.readdirSync(croePath);
// //  判断是否是文件夹
// coreDris.forEach((item) => {
//   const isDir = fs.statSync(path.resolve(croePath, item)).isDirectory();
//   if (isDir) {
//     const module = import(`${croePath}/${item}/${item}.module`);
//     console.log(module);
//   }
// });

// 动态导入core下的所有模块
export const getAllCoreModule = () => {
  const data = {};
  const result = [];
  for (const item of coreDris) {
    const isDir = fs.statSync(path.resolve(croePath, item)).isDirectory();
    if (isDir) {
      const module = require(`${croePath}/${item}/${item}.module`);
      Object.assign(data, module);
    }
  }
  Object.values(data).forEach((item) => {
    // 判断是否为 class
    if (/^class\s/.test(item.toString())) {
      result.push(item);
    }
  });
  return result;
};

export const getAppImports = () => [
  ConfigModule.forRoot({
    // 如果在多个文件中找到一个变量，则第一个优先
    // envFilePath: ['.env', `.${process.env.RUN_ENV == 'dev' ? 'dev' : 'pro'}.env`],
    isGlobal: true, // 是否全局
    ignoreEnvFile: true,
    load: [getYmlConfig], // 加载配置文件(注意: 不需要手动执行 getYmlConfig()会自动执行)
  }),
  TypeOrmModule.forRootAsync({
    useFactory: () => ({
      ...getYmlConfig('DATABASE'),
      namingStrategy: new SnakeNamingStrategy(), // 字段转换为下划线
    }),
    async dataSourceFactory(options) {
      if (!options) throw new Error('传递无效选项');
      const spinner = ora();

      const success = await new DataSource(options);
      if (!success) throw spinner.fail('连接数据库失败');
      return success;
    },
  }),
];

// export const getAppProviders = () => {
//   const allModule = [];
//   Object.values(CoreAllModule).forEach((item) => {
//     allModule.push(item);
//   });
//   return allModule;
// };
