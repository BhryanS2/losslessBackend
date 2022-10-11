import { prisma } from "../../prisma";
import { IsAdminService } from "./isAdmin";

export class DeleteChallengeService {
  async execute({ id }, userId: string) {
    const isAdmin = new IsAdminService();
    await isAdmin.execute(userId);


    const challenge = await prisma.challenges.delete({
      where: {
        id,
      },
    });
    return challenge;
  }
}
