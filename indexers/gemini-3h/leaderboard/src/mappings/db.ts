import { randomUUID } from "crypto";
import { LeaderboardEntry } from "../types";

export async function createAndSaveLeaderboardEntry(
  leaderboard: string,
  owner: string,
  value: bigint | number,
  timestamp: Date,
  createdAt: number
): Promise<LeaderboardEntry> {
  const id = randomUUID();
  if (typeof value === "number") {
    value = BigInt(value);
  }
  const entry = LeaderboardEntry.create({
    id,
    leaderboard,
    owner,
    value,
    accountedFor: false,
    timestamp,
    createdAt,
  });
  await entry.save();
  return entry;
}
