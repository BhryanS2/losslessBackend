import { Request, Response } from "express";
import { UpdateService } from "../../services/user/updateUserService";

export class UpdateController {
  async handle(request: Request, response: Response) {
    const { userId } = request;
    const data = request.body;

    if (!data.challengeCompletedId || !data.userLevel || !data.experience) {
      const fields = {
        challengeCompletedId: !data.challengeCompletedId
          ? "challengeCompletedId is required"
          : "",
        userLevel: !data.userLevel ? "userLevel is required" : "",
        experience: !data.experience ? "experience is required" : "",
      };
      return response.status(400).json({
        message: "fields are required",
        fields,
        success: false,
      });
    }

    const service = new UpdateService();
    try {
      await service.execute(Number(userId), data);
      response.status(204).json({
        message: "User updated successfully",
        success: true,
      });
    } catch (error) {
      response.status(400).json({
        message: error.message,
        success: false,
      });
    }
  }
}
