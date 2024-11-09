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
exports.updateAccount = updateAccount;
const auto_consensus_1 = require("@autonomys/auto-consensus");
const auto_utils_1 = require("@autonomys/auto-utils");
const db_1 = require("../utils/db");
function updateAccount(job) {
    return __awaiter(this, void 0, void 0, function* () {
        const { networkId, accountId } = job.data;
        const result = {
            blockNumber: auto_consensus_1.blockNumber,
            updatedTables: [],
            query: [],
        };
        try {
            const api = yield (0, auto_utils_1.activate)({ networkId });
            const pool = yield (0, db_1.connectToDB)();
            const [accountState, currentBlockNumber] = yield Promise.all([
                (0, auto_consensus_1.account)(api, accountId),
                (0, auto_consensus_1.blockNumber)(api),
            ]);
            const client = yield pool.connect();
            try {
                yield client.query("BEGIN");
                // Execute queries
                const accountResult = yield client.query(db_1.queries.consensusUpsertAccountQuery, [
                    accountId,
                    accountState.nonce,
                    accountState.data.free,
                    accountState.data.reserved,
                    accountState.data.free + accountState.data.reserved,
                    currentBlockNumber,
                    currentBlockNumber,
                ]);
                // Track updated tables
                if (accountResult.rows.length > 0)
                    result.updatedTables.push("consensus_accounts");
                yield client.query("COMMIT");
            }
            catch (err) {
                yield client.query("ROLLBACK");
                console.error("Error updating account balance:", err);
                throw new Error(`Failed to update account balance: ${err}`);
            }
            finally {
                client.release();
            }
            return result;
        }
        catch (err) {
            console.error("Error in updateAccountBalance:", err);
            throw new Error(`Failed to update account balance: ${err}`);
        }
    });
}
