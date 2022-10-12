"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginController = void 0;
const loginUserService_1 = require("../../services/user/loginUserService");
class LoginController {
    async handle(req, res) {
        try {
            const service = new loginUserService_1.LoginService();
            const response = await service.execute(req.body);
            return res.json({ message: response, success: true });
        }
        catch (error) {
            return res.status(400).json({ message: error.message, success: false });
        }
    }
}
exports.LoginController = LoginController;
