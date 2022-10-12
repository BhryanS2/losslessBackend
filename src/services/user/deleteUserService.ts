import { logger } from "../../logger";
import { prisma } from "../../prisma";

export class DeleteService {
  async execute(userId: number) {
    try {
      const users = prisma.users;
      const user = await users.update({
        where: {
          id: userId,
        },
        data: {
          deletedAt: new Date(),
        },
      });
      return user;
    } catch (error) {
      logger.error(error);
      throw new Error("Error in delete user");
    }
  }
}
