"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateChallengeController = void 0;
const logger_1 = require("../../logger");
const createChallengeService_1 = require("../../services/challenge/createChallengeService");
class CreateChallengeController {
    async handle(req, res) {
        try {
            const data = req.body;
            const { userId } = req;
            const service = new createChallengeService_1.CreateChallengeService();
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
        }
        catch (error) {
            logger_1.logger.error(error);
            return res.status(400).json({ message: error.message, success: false });
        }
    }
}
exports.CreateChallengeController = CreateChallengeController;
