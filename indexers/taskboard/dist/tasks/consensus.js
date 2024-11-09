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
exports.consensusUniqueRowsMapping = consensusUniqueRowsMapping;
const db_1 = require("../utils/db");
function consensusUniqueRowsMapping(job) {
    return __awaiter(this, void 0, void 0, function* () {
        const { blockNumber } = job.data;
        const pool = yield (0, db_1.connectToDB)();
        const result = {
            blockNumber,
            updatedTables: [],
            query: [],
        };
        try {
            const client = yield pool.connect();
            // To-Do: Implement the logic to update the consensus tables
            // Tables:
            // - consensus_account_profiles
            // - consensus_account_rewards
            // Logic:
            // - For new accounts, create a new row in the consensus_account_profile and consensus_account_rewards
            // - For each rewards row, increment the total rewards value and counts for the corresponding account and reward type
            // Remaining:
            // - Should this be a cron tasks that pickup all the last rows (from the last block handled in redis) and process them in one go? instead of a single block?
            try {
                yield client.query("BEGIN");
                // Execute queries
                const [sectionsResult, extrinsicModuleResult, eventModuleResult, logResult, accountResult,] = yield Promise.all([
                    client.query(db_1.queries.consensusSectionsQuery, [blockNumber]),
                    client.query(db_1.queries.consensusExtrinsicModulesQuery, [blockNumber]),
                    client.query(db_1.queries.consensusEventModulesQuery, [blockNumber]),
                    client.query(db_1.queries.consensusLogKindsQuery, [blockNumber]),
                    client.query(db_1.queries.consensusAccountsQuery, [blockNumber]),
                ]);
                // Track updated tables
                if (sectionsResult.rows.length > 0)
                    result.updatedTables.push("consensus_sections");
                if (extrinsicModuleResult.rows.length > 0)
                    result.updatedTables.push("consensus_extrinsic_module");
                if (eventModuleResult.rows.length > 0)
                    result.updatedTables.push("consensus_event_module");
                if (logResult.rows.length > 0)
                    result.updatedTables.push("consensus_log_kinds");
                if (accountResult.rows.length > 0)
                    result.updatedTables.push("consensus_accounts");
                yield client.query("COMMIT");
            }
            catch (err) {
                yield client.query("ROLLBACK");
                console.error("Error updating consensus tables:", err);
                throw new Error(`Failed to update consensus tables: ${err}`);
            }
            finally {
                client.release();
            }
            return result;
        }
        catch (err) {
            console.error("Error in consensus:", err);
            throw new Error(`Failed to update consensus tables: ${err}`);
        }
    });
}
