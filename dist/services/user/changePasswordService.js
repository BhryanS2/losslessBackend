"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangePasswordService = void 0;
const bcrypt_1 = require("bcrypt");
const logger_1 = require("../../logger");
const prisma_1 = require("../../prisma");
class ChangePasswordService {
    async execute(email, password) {
        try {
            const users = prisma_1.prisma.users;
            const buffer = 10;
            const salt = await (0, bcrypt_1.genSalt)(buffer);
            const PasswordHash = await (0, bcrypt_1.hash)(password, salt);
            const user = await users.update({
                where: {
                    email: email,
                },
                data: {
                    password: PasswordHash,
                },
            });
            return user;
        }
        catch (error) {
            logger_1.logger.error(error);
            throw new Error("Error in change password");
        }
    }
}
exports.ChangePasswordService = ChangePasswordService;
