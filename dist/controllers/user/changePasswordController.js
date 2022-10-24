"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangePasswordController = void 0;
const changePasswordService_1 = require("../../services/user/changePasswordService");
class ChangePasswordController {
    async handle(request, response) {
        const { email, password } = request.body;
        const service = new changePasswordService_1.ChangePasswordService();
        try {
            await service.execute(email, password);
            response.status(200).json({
                message: "Password changed successfully",
                success: true,
            });
        }
        catch (error) {
            response.status(400).json({
                message: error.message,
                success: false,
            });
        }
    }
}
exports.ChangePasswordController = ChangePasswordController;
