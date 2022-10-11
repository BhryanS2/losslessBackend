import { prisma } from "../../prisma";

export class IsAdminService {
  async execute(userId: string) {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
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
