const { connectToDB, queries } = require("../utils/db");

async function accountBalanceUpdate(job) {
  const { accountId, blockNumber, free, reserved } = job.data;
  const accountIdLower = accountId.toLowerCase();

  const pool = await connectToDB();

  const selectValues = [accountIdLower];
  const updateValues = [free, reserved, blockNumber, accountIdLower];

  try {
    const accountsByAccountId = await pool.query(
      queries.selectAccountsByAccountId,
      selectValues
    );
    if (accountsByAccountId.rowCount === 0) {
      console.log("No account found with accountId:", accountIdLower);
      throw new Error("No account found with accountId:", accountIdLower);
    }
    const updateAccountsByAccountId = await pool.query(
      queries.updateAccountsByAccountId,
      updateValues
    );

    return {
      accountIdLower,
      accountsByAccountId,
      updateAccountsByAccountId,
    };
  } catch (err) {
    console.error("Error in accountBalanceUpdate:", err);
    throw new Error("Failed to update account balance: " + err);
  }
}

module.exports = {
  accountBalanceUpdate,
};
