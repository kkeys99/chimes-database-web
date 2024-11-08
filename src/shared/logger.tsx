/********************************************
 * A shared module for advanced debug logs
 ********************************************/

enum logLevel {
  ERROR,
  INFO,
  DEBUG,
}

class Logger {
  // static values
  static configLogLevel = logLevel.DEBUG;

  // class attributes
  logLevel: typeof logLevel;

  constructor() {
    this.logLevel = logLevel;
  }

  log(name: string, message: string, logLevel: logLevel) {
    const errorStr = logLevel === this.logLevel.ERROR ? "ERROR: " : "";
    if (logLevel <= Logger.configLogLevel) {
      console.log(`${name} - ${errorStr}${message}`);
    }
  }

  printObj(obj: Object, logLevel: logLevel) {
    if (logLevel <= Logger.configLogLevel) {
      console.log(obj);
    }
  }
}

// Instantiate and export
const logger = new Logger();
export default logger;
