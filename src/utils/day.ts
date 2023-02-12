import * as dayjs from 'dayjs';

// 获取当前时间 yyyy-MM-dd HH:mm:ss
export const getNowTime = () => {
  return dayjs().format('YYYY-MM-DD HH:mm:ss');
};
