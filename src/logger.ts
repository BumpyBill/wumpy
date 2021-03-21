import chalk from "chalk";

export function log(text: string, type: LoggerType, code: LoggerCode) {
  var color: chalk.Chalk = chalk.green;
  switch (type) {
    case LoggerType.WARN:
      color = chalk.yellow;
      break;
    case LoggerType.ERROR:
      color = chalk.red;
      break;
  }

  console.log(color(`[${type}] ${text}\n{${code}}`));
}

export enum LoggerType {
  WARN = "WARN",
  ERROR = "ERROR",
  LOG = "LOG",
}

export enum LoggerCode {
  GOOD = "GOOD",
  INVALID_INPUT_OR_OUTPUT_FILE = "INVALID_INPUT_OR_OUTPUT_FILE",
  FS_PROBLEM = "FS_PROBLEM",
  COMPILE_ERROR = "COMPILE_ERROR",
}
