"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteService = void 0;
const logger_1 = require("../../logger");
const prisma_1 = require("../../prisma");
class DeleteService {
    async execute(userId) {
        try {
            const users = prisma_1.prisma.users;
            const user = await users.update({
                where: {
                    id: userId,
                },
                data: {
                    deletedAt: new Date(),
                },
            });
            return user;
        }
        catch (error) {
            logger_1.logger.error(error);
            throw new Error("Error in delete user");
        }
    }
}
exports.DeleteService = DeleteService;
