import { genSalt, hash } from "bcrypt";

import { logger } from "../../logger";
import { prisma } from "../../prisma";

export class ChangePasswordService {
  async execute(email: string, password: string) {
    try {
      const users = prisma.users;
      const buffer = 10;
      const salt = await genSalt(buffer);
      const PasswordHash = await hash(password, salt);

      const user = await users.update({
        where: {
          email: email,
        },
        data: {
          password: PasswordHash,
        },
      });
      return user;
    } catch (error) {
      logger.error(error);
      throw new Error("Error in change password");
    }
  }
}
