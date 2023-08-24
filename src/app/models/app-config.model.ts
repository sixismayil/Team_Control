export interface IAppConfig {
  urls: {
      homeUrl: string,
      cbarUrl: string,
      contactUrl: string,
  },
  keys: {
      secretKey: string
  },
  other: {
      testLogin: boolean,
      clearStorageHour: number; //
      resourceApiURI: string; //
      bsxmLogin: string;
  }
}
