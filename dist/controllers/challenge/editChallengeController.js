"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditChallengeController = void 0;
const logger_1 = require("../../logger");
const editChallengeService_1 = require("../../services/challenge/editChallengeService");
class EditChallengeController {
    async handle(req, res) {
        try {
            const data = req.body;
            if (!data) {
                throw new Error("No data provided");
            }
            const { userId } = req;
            const idChallenge = req.params.id;
            const service = new editChallengeService_1.EditChallengeService();
            if (!data.amount || !data.description || !data.type || !data.id) {
                const fields = {
                    amount: !data.amount ? "amount is required" : "",
                    description: !data.description ? "description is required" : "",
                    type: !data.type ? "type is required" : "",
                    id: !idChallenge ? "id is required" : "",
                };
                return res
                    .status(400)
                    .json({ message: "fields are required", fields, success: false });
            }
            const response = await service.execute(Object.assign({ id: idChallenge }, data), userId);
            return res.json({ message: response, success: true });
        }
        catch (error) {
            logger_1.logger.error(error);
            return res.status(400).json({ message: error.message, success: false });
        }
    }
}
exports.EditChallengeController = EditChallengeController;
