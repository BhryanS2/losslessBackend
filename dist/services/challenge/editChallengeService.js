"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditChallengeService = void 0;
const prisma_1 = require("../../prisma");
const isAdmin_1 = require("./isAdmin");
class EditChallengeService {
    async execute({ id, amount, description, type }, userId) {
        const isAdmin = new isAdmin_1.IsAdminService();
        await isAdmin.execute(userId);
        const challenge = await prisma_1.prisma.challenges.update({
            where: {
                id,
            },
            data: {
                amount,
                description,
                type,
            },
        });
        return challenge;
    }
}
exports.EditChallengeService = EditChallengeService;
