import * as path from 'path';

// 获取完整路径
export function getFullPath(__dirname: string, ...args: string[]) {
  return path.resolve(__dirname, ...args);
}
