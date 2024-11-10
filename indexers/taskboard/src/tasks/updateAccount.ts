import { account, blockNumber } from "@autonomys/auto-consensus";
import { activate, stringify } from "@autonomys/auto-utils";
import { ApiPromise } from "@polkadot/api";
import { Pool, PoolClient } from "pg";
import { connectToDB, queries } from "../utils/db";

interface Job {
  data: {
    networkId: string;
    accountId: string;
  };
}

interface UpdateResult {
  blockNumber: typeof blockNumber;
  updatedTables: string[];
  accountResult: any[];
}

export const updateAccount = async (job: Job): Promise<UpdateResult> => {
  const { networkId, accountId } = job.data;
  const result: UpdateResult = {
    blockNumber,
    updatedTables: [],
    accountResult: [],
  };

  try {
    const api: ApiPromise = await activate({ networkId });
    const pool: Pool = await connectToDB();

    const [accountState, currentBlockNumber] = await Promise.all([
      account(api, accountId),
      blockNumber(api),
    ]);
    result.accountResult.push(stringify({ accountId, accountState }));

    const client: PoolClient = await pool.connect();
    try {
      await client.query("BEGIN");
      // Execute queries
      const accountResult = await client.query(
        queries.consensusUpsertAccountQuery,
        [
          accountId,
          accountState.nonce,
          accountState.data.free,
          accountState.data.reserved,
          accountState.data.free + accountState.data.reserved,
          currentBlockNumber,
          currentBlockNumber,
        ]
      );
      // Track updated tables
      if (accountResult.rows.length > 0)
        result.updatedTables.push("consensus_accounts");
      await client.query("COMMIT");
    } catch (err) {
      await client.query("ROLLBACK");
      console.error("Error updating account balance:", err);
      throw new Error(`Failed to update account balance: ${err}`);
    } finally {
      client.release();
    }
    return result;
  } catch (err) {
    console.error("Error in updateAccountBalance:", err);
    throw new Error(`Failed to update account balance: ${err}`);
  }
};
