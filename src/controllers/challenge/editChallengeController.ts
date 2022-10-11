import { Request, Response } from "express";
import { EditChallengeService } from "../../services/challenge/editChallengeService";

export class EditChallengeController {
  async handle(req: Request, res: Response) {
    try {
      const data = req.body;
      const { userId } = req;
      const idChallenge = req.params.id;

      const service = new EditChallengeService();
      if (!data.amount || !data.description || !data.type || !data.id) {
        const fields = {
          amount: !data.amount ? "amount is required" : "",
          description: !data.description ? "description is required" : "",
          type: !data.type ? "type is required" : "",
          id: !idChallenge ? "id is required" : "",
        };
        return res.status(400).json({ message: "fields are required", fields, success: false });
      }
      const response = await service.execute({
        id: idChallenge,
        ...data
      }, userId);
      return res.json({ message: response, success: true });
    } catch (error) {
      return res.status(400).json({ message: error.message, success: false });
    }
  }
}
