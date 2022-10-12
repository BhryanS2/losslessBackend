"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteChallengeController = void 0;
const deleteChallengeService_1 = require("../../services/challenge/deleteChallengeService");
const logger_1 = require("../../logger");
class DeleteChallengeController {
    async handle(req, res) {
        try {
            const { userId } = req;
            const idChallenge = req.params.id;
            const service = new deleteChallengeService_1.DeleteChallengeService();
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
        }
        catch (error) {
            logger_1.logger.error(error);
            return res.status(400).json({ message: error.message, success: false });
        }
    }
}
exports.DeleteChallengeController = DeleteChallengeController;
