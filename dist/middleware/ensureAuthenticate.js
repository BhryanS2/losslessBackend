"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuthenticated = void 0;
const express_1 = require("express");
const jsonwebtoken_1 = require("jsonwebtoken");
const winston = __importStar(require("winston"));
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(winston.format.colorize(), winston.format.timestamp(), winston.format.align(), winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)),
        }),
    ],
    defaultMeta: { service: "user-service" },
    format: winston.format.json(),
    silent: false,
});
function isValid(authToken) {
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
function ensureAuthenticated(req, res, next) {
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
        const { userId } = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        req.userId = userId;
        return next();
    }
    catch (err) {
        return express_1.response.status(401).json({ message: "token expired." });
    }
    // res.redirect("/login");
}
exports.ensureAuthenticated = ensureAuthenticated;
