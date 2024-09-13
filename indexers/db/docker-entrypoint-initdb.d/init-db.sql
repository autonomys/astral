CREATE DATABASE accounts;
CREATE DATABASE consensus;
CREATE DATABASE leaderboard;
CREATE DATABASE staking;

\c accounts
CREATE EXTENSION IF NOT EXISTS btree_gist;

\c consensus
CREATE EXTENSION IF NOT EXISTS btree_gist;

\c leaderboard
CREATE EXTENSION IF NOT EXISTS btree_gist;

\c staking
CREATE EXTENSION IF NOT EXISTS btree_gist;