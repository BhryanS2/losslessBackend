import { Request, Response } from "express";
import { logger } from "../../logger";
import { CreateChallengeService } from "../../services/challenge/createChallengeService";

export class CreateChallengeController {
  async handle(req: Request, res: Response) {
    console.log("create challenge controller");

    try {
      const data = req.body;
      const { userId } = req;

      const service = new CreateChallengeService();
      if (!data.amount || !data.description || !data.type) {
        const fields = {
          amount: !data.amount ? "amount is required" : "",
          description: !data.description ? "description is required" : "",
          type: !data.type ? "type is required" : "",
        };
        return res
          .status(400)
          .json({ message: "fields are required", fields, success: false });
      }
      const response = await service.execute(data, userId);
      return res.json({ message: response, success: true });
    } catch (error) {
      logger.error(error);
      return res.status(400).json({ message: error.message, success: false });
    }
  }
}
