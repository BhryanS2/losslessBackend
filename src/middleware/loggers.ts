import * as winston from "winston";
import type { Request, Response, NextFunction } from "express";

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
const logger = winston.createLogger(myWinstonOptions);

export function logRequest(req: Request, res: Response, next: NextFunction) {
  // log method, url, and body
  logger.info(`${req.method} ${req.url}`);
  logger.debug(req.body);
  next();
}

export function logError(
  err: string,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.error(err);
  next();
}

export function logInfo(info: string) {
  logger.info(info);
}
