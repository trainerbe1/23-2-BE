import path from 'path';
import winston, { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file'; 

const __dirname = path.resolve(); 

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'blue',
  http: 'magenta',
  debug: 'white',
};
winston.addColors(colors);

const transport = new transports.DailyRotateFile({
  filename: path.join(__dirname, 'src/log/logger/application-%DATE%.log'),
  datePattern: 'YYYY-MM-DD-HH', 
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '7d',
});

const logger = createLogger({
  level: 'error',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
    format.colorize({all:true})
  ),
  transports: [
    transport,
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: true,
      colorize: true,
    }), //! hilangkan untuk production
  ],
  exitOnError: false,
});

export { logger };
