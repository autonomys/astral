CREATE DATABASE gemini_3h_accounts;
CREATE DATABASE gemini_3h_consensus;
CREATE DATABASE gemini_3h_leaderboard;
CREATE DATABASE gemini_3h_staking;

\c gemini_3h_accounts
CREATE EXTENSION IF NOT EXISTS btree_gist;

\c gemini_3h_consensus
CREATE EXTENSION IF NOT EXISTS btree_gist;

\c gemini_3h_leaderboard
CREATE EXTENSION IF NOT EXISTS btree_gist;

\c gemini_3h_staking
CREATE EXTENSION IF NOT EXISTS btree_gist;

-- Additional databases for testnet rewards
CREATE DATABASE gemini_3h_testnet_rewards;
CREATE DATABASE gemini_3g_testnet_rewards;

\c gemini_3h_testnet_rewards
CREATE EXTENSION IF NOT EXISTS btree_gist;

\c gemini_3g_testnet_rewards
CREATE EXTENSION IF NOT EXISTS btree_gist;