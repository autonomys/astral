CREATE DATABASE taurus;

\c taurus
CREATE EXTENSION IF NOT EXISTS btree_gist;

CREATE DATABASE gemini_3h;

\c gemini_3h
CREATE EXTENSION IF NOT EXISTS btree_gist;

-- Additional databases for testnet rewards
CREATE DATABASE gemini_3g_testnet_rewards;

\c gemini_3g_testnet_rewards
CREATE EXTENSION IF NOT EXISTS btree_gist;