import * as winston from "winston";

const consoleTransport = new winston.transports.Console();
const myWinstonOptions = {
  transports: [consoleTransport],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.align(),
    winston.format.printf(
      (info) => `${info.timestamp} ${info.level}: ${info.message}`
    )
  ),
};
export const logger = winston.createLogger(myWinstonOptions);
