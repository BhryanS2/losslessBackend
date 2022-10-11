import { prisma } from "../../prisma";
import { IsAdminService } from "./isAdmin";

export class EditChallengeService {
  async execute({ id, amount, description, type }, userId: string) {
    const isAdmin = new IsAdminService();
    await isAdmin.execute(userId);

    const challenge = await prisma.challenges.update({
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
