import { Request, Response } from "express";
import { DeleteChallengeService } from "../../services/challenge/deleteChallengeService";
import { logger } from "../../logger";

export class DeleteChallengeController {
  async handle(req: Request, res: Response) {
    try {
      const { userId } = req;
      const idChallenge = req.params.id;

      const service = new DeleteChallengeService();
      if (!idChallenge) {
        const fields = {
          id: !idChallenge ? "id is required" : "",
        };
        return res
          .status(400)
          .json({ message: "fields are required", fields, success: false });
      }
      const response = await service.execute(idChallenge, userId);
      return res.json({ message: response, success: true });
    } catch (error) {
      logger.error(error);
      return res.status(400).json({ message: error.message, success: false });
    }
  }
}
