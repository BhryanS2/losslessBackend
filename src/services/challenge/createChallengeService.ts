import { prisma } from "../../prisma";
import { challengeType } from "../../types/auth";
import { IsAdminService } from "./isAdmin";

export class CreateChallengeService {
  async execute(data: challengeType, userId: string) {
    const isAdmin = new IsAdminService();
    await isAdmin.execute(userId);

    const challenge = await prisma.challenges.create({
      data: {
        amount: data.amount,
        description: data.description,
        type: data.type,
      },
    });
    return challenge;
  }
}
