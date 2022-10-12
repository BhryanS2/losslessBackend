"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetChallengeService = void 0;
const prisma_1 = require("../../prisma");
const node_cache_1 = __importDefault(require("node-cache"));
const CACHE_LIMIT = 0.2; // 200 ms
const dbCache = new node_cache_1.default({
    stdTTL: CACHE_LIMIT,
    checkperiod: CACHE_LIMIT * 0.2,
    useClones: false,
});
const Key = "challenges";
class GetChallengeService {
    async execute() {
        if (dbCache.has(Key)) {
            return dbCache.get(Key);
        }
        const challenges = await prisma_1.prisma.challenges.findMany({
            where: {
                deleted: false,
            },
            orderBy: {
                id: "asc",
            },
        });
        dbCache.set(Key, challenges);
        return challenges;
    }
}
exports.GetChallengeService = GetChallengeService;
