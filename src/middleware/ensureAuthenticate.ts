import type { Request, Response, NextFunction } from "express";
import { response } from "express";
import { verify } from "jsonwebtoken";
import * as winston from "winston";

interface Payload {
  userId: string;
  iat: number;
  exp: number;
}

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.align(),
        winston.format.printf(
          (info) => `${info.timestamp} ${info.level}: ${info.message}`
        )
      ),
    }),
  ],
  defaultMeta: { service: "user-service" },
  format: winston.format.json(),
  silent: false,
});

function isValid(authToken: string) {
  logger.info("isValid");
  logger.debug(authToken);
  if (!authToken) {
    logger.info("no data");
    return false;
  }

  const [bearer, token] = authToken.split(/\s+/);
  if (bearer.toLocaleLowerCase() !== "bearer") {
    logger.info("no bearer");
    logger.debug(bearer);
    return false;
  }
  if (!token) {
    logger.info("no token");
    logger.warn(token);
    return false;
  }
  logger.info("token is valid");
  return token;
}

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authToken = req.headers.authorization;
    const token = isValid(authToken);
    if (!token) {
      logger.info("token is not valid");
      logger.error(authToken);
      return res.status(401).end();
    }

    logger.info("token is valid");

    logger.debug(`token is ${token}`);
    const { userId } = verify(token, process.env.JWT_SECRET) as Payload;
    req.userId = userId;
    return next();
  } catch (err) {
    return response.status(401).json({ message: "token expired." });
  }

  // res.redirect("/login");
}
