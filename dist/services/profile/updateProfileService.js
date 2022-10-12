"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProfileService = void 0;
const prisma_1 = require("../../prisma");
class UpdateProfileService {
    async execute({ data, userId }) {
        if (!data) {
            throw new Error("Data is required");
        }
        const userProfile = await prisma_1.prisma.userProfile.findFirst({
            where: {
                id: userId,
            },
        });
        if (!userProfile) {
            throw new Error("User profile not found");
        }
        const challenge = await prisma_1.prisma.challenges.findFirst({
            where: {
                id: data.challengeCompletedId,
            },
        });
        if (!challenge) {
            throw new Error("Challenge not found");
        }
        await prisma_1.prisma.userProfile.update({
            where: {
                id: userId,
            },
            data: {
                userLevel: data.userLevel,
                experience: data.experience,
                challengesCompleted: {
                    create: {
                        userId,
                        challengesId: data.challengeCompletedId,
                    },
                },
            },
        });
        const profile = await prisma_1.prisma.userProfile.findFirst({
            where: {
                id: userId,
            },
        });
        const challengeCompleted = await prisma_1.prisma.challengesCompleted.findMany({
            where: {
                userId,
            },
        });
        return {
            userProfile: profile,
            challengesCompleted: challengeCompleted.length,
        };
    }
}
exports.UpdateProfileService = UpdateProfileService;
