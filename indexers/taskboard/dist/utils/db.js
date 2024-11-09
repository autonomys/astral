"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.queries = exports.entryTypeToTable = exports.connectToDB = void 0;
const pg_1 = require("pg");
const connectToDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const dbConfig = {
        user: process.env.DB_USER || "postgres",
        host: process.env.DB_HOST || "localhost",
        database: process.env.DB_DATABASE || "postgres",
        password: process.env.DB_PASSWORD || "postgres",
        port: Number(process.env.DB_PORT) || 5432,
    };
    const pool = new pg_1.Pool(dbConfig);
    return pool;
});
exports.connectToDB = connectToDB;
const entryTypeToTable = (entryType) => entryType
    .replace(/([A-Z])/g, "_$1")
    .toLowerCase()
    .replace(/^_/, "") + "s";
exports.entryTypeToTable = entryTypeToTable;
const consensusSectionsQuery = `
    INSERT INTO consensus.sections (id, _id, _block_range)
    SELECT DISTINCT section as id, 
      gen_random_uuid() as _id,
      int8range($1::int8, $1::int8) as _block_range
    FROM (
      SELECT section FROM consensus.extrinsics WHERE _block_range @> $1::int8
      UNION
      SELECT section FROM consensus.events WHERE _block_range @> $1::int8
    ) combined_sections
    ON CONFLICT (id) DO NOTHING
    RETURNING *`;
// Get unique extrinsic modules
const consensusExtrinsicModulesQuery = `
    INSERT INTO consensus.extrinsic_modules (id, _id, section, method, _block_range)
    SELECT DISTINCT 
      LOWER(name) as id,
      gen_random_uuid() as _id,
      section,
      module as method,
      int8range($1::int8, $1::int8) as _block_range
    FROM consensus.extrinsics 
    WHERE _block_range @> $1::int8
    ON CONFLICT (id) DO NOTHING
    RETURNING *`;
// Get unique event modules
const consensusEventModulesQuery = `
    INSERT INTO consensus.event_modules (id, _id, section, method, _block_range)
    SELECT DISTINCT 
      LOWER(name) as id,
      gen_random_uuid() as _id,
      section,
      module as method,
      int8range($1::int8, $1::int8) as _block_range
    FROM consensus.events 
    WHERE _block_range @> $1::int8
    ON CONFLICT (id) DO NOTHING
    RETURNING *`;
// Get unique log kinds
const consensusLogKindsQuery = `
    INSERT INTO consensus.log_kinds (id, _id, _block_range)
    SELECT DISTINCT kind as id, 
      gen_random_uuid() as _id,
      int8range($1::int8, $1::int8) as _block_range
    FROM consensus.logs 
    WHERE _block_range @> $1::int8
    ON CONFLICT (id) DO NOTHING
    RETURNING *`;
// Update or insert accounts
const consensusAccountsQuery = `
    INSERT INTO consensus.accounts (id, _id, nonce, free, reserved, total, created_at, updated_at, _block_range)
    SELECT DISTINCT ON (id) 
      id,
      gen_random_uuid() as _id,
      nonce,
      free,
      reserved,
      total,
      created_at,
      updated_at,
      int8range($1::int8, $1::int8) as _block_range
    FROM consensus.account_histories
    WHERE _block_range @> $1::int8
    ON CONFLICT (id) 
    DO UPDATE SET
      nonce = EXCLUDED.nonce,
      free = EXCLUDED.free,
      reserved = EXCLUDED.reserved,
      total = EXCLUDED.total,
      created_at = EXCLUDED.created_at,
      updated_at = EXCLUDED.updated_at
    RETURNING *`;
// Get unique sections from both extrinsics and events
const updateLeaderboardRanking = (table) => `
  WITH ranked_entries AS (
    SELECT id, 
           RANK() OVER (ORDER BY value DESC) AS new_rank
    FROM leaderboard.${table}
  )
  UPDATE leaderboard.${table} t
  SET rank = r.new_rank
  FROM ranked_entries r
  WHERE t.id = r.id;
  `;
const consensusUpsertAccountQuery = `
    INSERT INTO consensus.accounts (id, _id, nonce, free, reserved, total, created_at, updated_at, _block_range)
    VALUES ($1, gen_random_uuid(), $2, $3, $4, $5, $6, $6, int8range($7::int8, $7::int8))
    ON CONFLICT (id) 
    DO UPDATE SET
      nonce = $2,
      free = $3,
      reserved = $4,
      total = $5,
      updated_at = $6
    RETURNING *`;
const queries = {
    consensusSectionsQuery,
    consensusExtrinsicModulesQuery,
    consensusEventModulesQuery,
    consensusLogKindsQuery,
    consensusAccountsQuery,
    updateLeaderboardRanking,
    consensusUpsertAccountQuery,
};
exports.queries = queries;
