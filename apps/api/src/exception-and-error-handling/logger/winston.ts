import * as winston from 'winston';
import { utilities } from 'nest-winston';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as SlackHook from 'winston-slack-webhook-transport';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ENV } from '../../config/env';
const logLevels = {
  emergency: 0,
  alert: 1,
  critical: 2,
  error: 3,
  warning: 4,
  notice: 5,
  info: 6,
  debug: 7,
  general: 8,
};

const defaultFormatter = winston.format.combine(
  winston.format.timestamp(),
  winston.format.ms(),
  utilities.format.nestLike('Aliice Backend API', {
    colors: true,
    prettyPrint: true,
  }),
);

export const winstonConfig: winston.LoggerOptions = {
  level: 'debug',
  levels: logLevels,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
    winston.format.colorize(),
  ),
  transports: [
    new winston.transports.Console({
      format: defaultFormatter,
    }),
  ],
  exceptionHandlers: [
    new winston.transports.Console({
      format: defaultFormatter,
      level: 'alert',
    }),
  ],
  rejectionHandlers: [
    new winston.transports.Console({
      format: defaultFormatter,
      level: 'warning',
    }),
  ],
};

const staticLogger = winston.createLogger(winstonConfig);

const alertLog = (message: string): void => {
  staticLogger.log({ level: 'alert', message });
};

export const StaticLogger = {
  alertLog: alertLog,
  instance: staticLogger,
};
