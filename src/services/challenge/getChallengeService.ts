import { prisma } from "../../prisma";
import NodeCache from "node-cache";

const CACHE_LIMIT = 0.2; // 200 ms
const dbCache = new NodeCache({
  stdTTL: CACHE_LIMIT,
  checkperiod: CACHE_LIMIT * 0.2,
  useClones: false,
});
const Key = "challenges";
export class GetChallengeService {
  async execute() {
    if (dbCache.has(Key)) {
      return dbCache.get(Key);
    }
    const challenges = await prisma.challenges.findMany({
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
