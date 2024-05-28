import path from 'path';
import winston, { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file'; 

const __dirname = path.resolve(); 

const transport = new transports.DailyRotateFile({
  filename: path.join(__dirname, 'src/logger/application-%DATE%.log'),
  datePattern: 'YYYY-MM-DD-HH', 
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
  ),
  transports: [
    transport,
    new winston.transports.Console({}) //! hilangkan ini di production
  ],
});

export { logger };
