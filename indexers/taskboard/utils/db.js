const { Pool } = require("pg");

const connectToDB = async (
  database = process.env.DB_GEMINI_3H || "gemini_3h"
) => {
  const dbConfig = {
    user: process.env.DB_USER || "postgres",
    host: process.env.DB_HOST || "localhost",
    database,
    password: process.env.DB_PASSWORD || "postgres",
    port: process.env.DB_PORT || 5432,
  };

  const pool = new Pool(dbConfig);

  return pool;
};

const selectAccountsByAccountId = `SELECT * FROM accounts.accounts WHERE account_id = $1`;

const updateAccountsByAccountId = `
UPDATE accounts.accounts
SET free = $1, reserved = $2, updated_at = $3
WHERE account_id = $4
`;

const queries = {
  selectAccountsByAccountId,
  updateAccountsByAccountId,
};

module.exports = { connectToDB, queries };
