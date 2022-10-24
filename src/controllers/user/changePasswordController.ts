import { Request, Response } from "express";
import { ChangePasswordService } from "../../services/user/changePasswordService";

export class ChangePasswordController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;
    const service = new ChangePasswordService();
    try {
      await service.execute(email, password);
      response.status(200).json({
        message: "Password changed successfully",
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
