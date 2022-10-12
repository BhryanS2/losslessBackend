"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsAdminService = void 0;
const prisma_1 = require("../../prisma");
class IsAdminService {
    async execute(userId) {
        const user = await prisma_1.prisma.users.findFirst({
            where: {
                id: Number(userId),
            },
        });
        if (!user) {
            throw new Error("User not found");
        }
        if (user.email !== process.env.ADMIN_EMAIL) {
            throw new Error("User is not admin");
        }
    }
}
exports.IsAdminService = IsAdminService;
