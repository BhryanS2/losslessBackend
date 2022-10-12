"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateChallengeService = void 0;
const prisma_1 = require("../../prisma");
const isAdmin_1 = require("./isAdmin");
class CreateChallengeService {
    async execute(data, userId) {
        const isAdmin = new isAdmin_1.IsAdminService();
        await isAdmin.execute(userId);
        const challenge = await prisma_1.prisma.challenges.create({
            data: {
                amount: data.amount,
                description: data.description,
                type: data.type,
            },
        });
        return challenge;
    }
}
exports.CreateChallengeService = CreateChallengeService;
