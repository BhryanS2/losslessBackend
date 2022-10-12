"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteChallengeService = void 0;
const prisma_1 = require("../../prisma");
const isAdmin_1 = require("./isAdmin");
class DeleteChallengeService {
    async execute(id, userId) {
        const isAdmin = new isAdmin_1.IsAdminService();
        await isAdmin.execute(userId);
        const challengeDeleted = await prisma_1.prisma.challenges.update({
            where: {
                id: Number(id),
            },
            data: {
                deleted: true,
            },
        });
        return challengeDeleted;
    }
}
exports.DeleteChallengeService = DeleteChallengeService;
