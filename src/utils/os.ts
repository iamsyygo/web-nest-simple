import * as os from 'os';

// 获取本地 IP 地址
export function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const devName in interfaces) {
    const iface = interfaces[devName];
    for (let i = 0; i < iface.length; i++) {
      const alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '' && !alias.internal) {
        return alias.address;
      }
    }
  }
}
