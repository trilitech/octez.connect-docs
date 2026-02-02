declare module "../Logger" {
  export default class Logger {
    constructor(update: Function);
    log(...args: any[]): void;
  }
}

declare module "./Logger" {
  export default class Logger {
    constructor(update: Function);
    log(...args: any[]): void;
  }
}

declare const logger: {
  log(...args: any[]): void;
};
