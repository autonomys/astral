const { connectToDB, queries } = require("../utils/db");
const { activate } = require("@autonomys/auto-utils");
const { account, blockNumber } = require("@autonomys/auto-consensus");

async function updateAccount(job) {
  const { networkId, accountId } = job.data;
  const result = {
    blockNumber,
    updatedTables: [],
    query: [],
  };

  try {
    const api = await activate({ networkId });
    const pool = await connectToDB();

    const [accountState, currentBlockNumber] = await Promise.all([
      account(api, accountId),
      blockNumber(api),
    ]);

    const client = await pool.connect();
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
      throw new Error("Failed to update account balance: " + err);
    } finally {
      client.release();
    }
    return result;
  } catch (err) {
    console.error("Error in updateAccountBalance:", err);
    throw new Error("Failed to update account balance: " + err);
  }
}

module.exports = {
  updateAccount,
};
