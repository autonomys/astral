import { balance } from "@autonomys/auto-consensus";
import { request } from "http";
import { createAndSaveBalanceHistory } from "./db";
import { stringify } from "./utils";

export const updateAccountBalance = async (
  accountId: string,
  blockNumber: bigint
) => {
  const _balance = await balance(api as any, accountId);

  await createAndSaveBalanceHistory(
    accountId,
    blockNumber,
    _balance.free,
    _balance.reserved,
    _balance.free + _balance.reserved
  );

  const postData = stringify({
    queueName: "gemini-3h",
    taskName: "accountBalanceUpdate",
    data: {
      accountId,
      blockNumber: blockNumber.toString(),
      ..._balance,
    },
    opts: {
      delay: 10000,
    },
    jobId: "accountBalanceUpdate:" + accountId + ":" + blockNumber.toString(),
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

  return _balance;
};
