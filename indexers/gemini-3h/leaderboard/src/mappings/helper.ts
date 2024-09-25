import { request } from "http";
import { BLOCK_SORT_AND_RANK_INTERVAL } from "./contants";
import { stringify } from "./utils";

export const sortAndRankLeaderboard = async (blockNumber: bigint) => {
  const postData = stringify({
    queueName: "gemini-3h",
    taskName: "leaderboardSortAndRank",
    data: {
      blockNumber: blockNumber.toString(),
      interval: BLOCK_SORT_AND_RANK_INTERVAL,
    },
    opts: {
      delay: 60000,
    },
    jobId: "sortAndRankLeaderboard:" + blockNumber.toString(),
  });

  const options = {
    hostname: "taskboard",
    port: 3000,
    path: "/add-task",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(postData),
    },
  };

  const req = request(options, (res) => res.setEncoding("utf8"));
  req.on("error", (e) => {
    logger.error(`Problem with request: ${e.message}`);
  });
  req.write(postData);
  req.end();
};
