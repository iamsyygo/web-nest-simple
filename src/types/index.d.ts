// declare module 'ip' {
//   export const address: string;
// }

declare module 'pino-http' {
  export interface Options {
    customAttributeKeys?: {
      req?: string;
      res?: string;
      err?: string;
      responseTime?: string;
    };
    level?: string;
    customLogLevel?: (res: { statusCode: number }, err: any) => string;
    serializers?: {
      req?: (req: {
        httpVersion: any;
        raw: { httpVersion: any; params: any; query: any; body: any };
        params: any;
        query: any;
        body: any;
      }) => any;
      err?: (err: {
        params: any;
        raw: { params: any; query: any; body: any };
        query: any;
        body: any;
      }) => any;
    };
    prettyPrint?: boolean | object;
  }
}
