import path from 'path';
import {createLogger, format, transports} from 'winston';

const transport = new transports.DailyRotateFile({
  filename: path.join(__dirname, './logger/application-%DATE%.log'),
  datePattern: 'YYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '7d',
});

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
    format.splat(),
  ),
  transports: [
    transport,
  ],
});

export { logger }
