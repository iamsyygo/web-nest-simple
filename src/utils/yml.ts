import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';

const getEnv = () => process.env.RUN_ENV;

export const getYmlConfig = (key?: string) => {
  const ymlData = yaml.load(readFileSync(`.${getEnv()}.yml`, 'utf-8')) as Record<string, any>;
  if (!key) return ymlData;
  return ymlData[key];
};
