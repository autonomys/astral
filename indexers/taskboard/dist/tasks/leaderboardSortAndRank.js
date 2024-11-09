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
exports.leaderboardSortAndRank = leaderboardSortAndRank;
const constants_1 = require("../constants");
const db_1 = require("../utils/db");
function leaderboardSortAndRank(job) {
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
            try {
                yield client.query("BEGIN");
                const updateQueries = Object.keys(constants_1.LEADERBOARD_ENTRY_TYPE).map((key) => {
                    const table = (0, db_1.entryTypeToTable)(constants_1.LEADERBOARD_ENTRY_TYPE[key]);
                    const rankingQuery = db_1.queries.updateLeaderboardRanking(table);
                    return client.query(rankingQuery).then((queryResult) => {
                        result.query.push(rankingQuery);
                        return {
                            table,
                            rowCount: queryResult.rowCount,
                        };
                    });
                });
                const updatedTables = yield Promise.all(updateQueries);
                result.updatedTables.push(...updatedTables);
                yield client.query("COMMIT");
            }
            catch (err) {
                yield client.query("ROLLBACK");
                console.error("Error updating rankings:", err);
                throw new Error(`Failed to update rankings: ${err}`);
            }
            finally {
                client.release();
            }
            return result;
        }
        catch (err) {
            console.error("Error in leaderboardSortAndRank:", err);
            throw new Error(`Failed to sort and rank leaderboard: ${err}`);
        }
    });
}
