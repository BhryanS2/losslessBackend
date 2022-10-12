import { prisma } from "../../prisma";
import { IsAdminService } from "./isAdmin";

export class DeleteChallengeService {
  async execute(id: string, userId: string) {
    const isAdmin = new IsAdminService();
    await isAdmin.execute(userId);
    const challengeDeleted = await prisma.challenges.update({
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
