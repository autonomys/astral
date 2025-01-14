\c postgres
CREATE EXTENSION IF NOT EXISTS btree_gist;

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE SCHEMA consensus;
ALTER SCHEMA consensus OWNER TO postgres;

CREATE SCHEMA dictionary;
ALTER SCHEMA dictionary OWNER TO postgres;

CREATE SCHEMA leaderboard;
ALTER SCHEMA leaderboard OWNER TO postgres;

CREATE SCHEMA files;
ALTER SCHEMA files OWNER TO postgres;

CREATE SCHEMA users;
ALTER SCHEMA users OWNER TO postgres;

CREATE EXTENSION IF NOT EXISTS btree_gist WITH SCHEMA public;
COMMENT ON EXTENSION btree_gist IS 'support for indexing common datatypes in GiST';

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;
COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';

CREATE FUNCTION consensus.schema_notification() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
  BEGIN
    PERFORM pg_notify(
            '0xe77c40c915ba06be',
            'schema_updated');
    RETURN NULL;
  END;
  $$;
ALTER FUNCTION consensus.schema_notification() OWNER TO postgres;

CREATE FUNCTION dictionary.schema_notification() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
  BEGIN
    PERFORM pg_notify(
            '0xb06225a820520934',
            'schema_updated');
    RETURN NULL;
  END;
  $$;
ALTER FUNCTION dictionary.schema_notification() OWNER TO postgres;

CREATE FUNCTION leaderboard.schema_notification() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
  BEGIN
    PERFORM pg_notify(
            '0x51141d2e27d3dfd7',
            'schema_updated');
    RETURN NULL;
  END;
  $$;
ALTER FUNCTION leaderboard.schema_notification() OWNER TO postgres;

CREATE FUNCTION files.schema_notification() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
  BEGIN
    PERFORM pg_notify(
            '0xb1598cb16f4da9c8',
            'schema_updated');
    RETURN NULL;
  END;
  $$;
ALTER FUNCTION files.schema_notification() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

CREATE TABLE consensus._metadata (
    key character varying(255) NOT NULL,
    value jsonb,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
ALTER TABLE consensus._metadata OWNER TO postgres;

CREATE TABLE dictionary._metadata (
    key character varying(255) NOT NULL,
    value jsonb,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
ALTER TABLE dictionary._metadata OWNER TO postgres;

CREATE TABLE leaderboard._metadata (
    key character varying(255) NOT NULL,
    value jsonb,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
ALTER TABLE leaderboard._metadata OWNER TO postgres;

CREATE TABLE files._metadata (
    key character varying(255) NOT NULL,
    value jsonb,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
ALTER TABLE files._metadata OWNER TO postgres;

CREATE TABLE users.profiles (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    avatar_url text NOT NULL,
    banner_url text NOT NULL,
    email text NOT NULL,
    email_is_verified boolean NOT NULL,
    email_is_public boolean NOT NULL,
    website text NOT NULL,
    website_is_verified boolean NOT NULL,
    website_is_public boolean NOT NULL,
    discord text NOT NULL,
    discord_is_verified boolean NOT NULL,
    discord_is_public boolean NOT NULL,
    github text NOT NULL,
    github_is_verified boolean NOT NULL,
    github_is_public boolean NOT NULL,
    twitter text NOT NULL,
    twitter_is_verified boolean NOT NULL,
    twitter_is_public boolean NOT NULL,
    proof_message text NOT NULL,
    proof_signature text NOT NULL,
    api_total_requests numeric NOT NULL,
    api_daily_requests_limit numeric NOT NULL,
    api_monthly_requests_limit numeric NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    deleted_at timestamp with time zone
);
ALTER TABLE users.profiles OWNER TO postgres;
ALTER TABLE ONLY users.profiles ADD CONSTRAINT profiles_pkey PRIMARY KEY (id);
ALTER TABLE users.profiles ALTER COLUMN created_at SET DEFAULT now();
ALTER TABLE users.profiles ALTER COLUMN updated_at SET DEFAULT now();

CREATE TABLE users.api_keys (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    profile_id uuid NOT NULL,
    description text NOT NULL,
    key uuid DEFAULT gen_random_uuid() NOT NULL,
    total_requests numeric NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone
);
ALTER TABLE users.api_keys OWNER TO postgres;
ALTER TABLE ONLY users.api_keys ADD CONSTRAINT api_keys_pkey PRIMARY KEY (id);
ALTER TABLE ONLY users.api_keys ADD CONSTRAINT api_keys_key_unique UNIQUE (key);

CREATE TABLE users.api_keys_daily_usage (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    api_key_id uuid NOT NULL,
    total_requests numeric NOT NULL,
    date DATE DEFAULT CURRENT_DATE NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone
);

ALTER TABLE users.api_keys_daily_usage OWNER TO postgres;
ALTER TABLE ONLY users.api_keys_daily_usage ADD CONSTRAINT api_keys_daily_usage_pkey PRIMARY KEY (id);

CREATE TABLE users.api_keys_monthly_usage (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    api_key_id uuid NOT NULL,
    total_requests numeric NOT NULL,
    date DATE DEFAULT date_trunc('month', CURRENT_DATE) NOT NULL CHECK (date_trunc('month', date) = date),
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone
);
ALTER TABLE users.api_keys_monthly_usage OWNER TO postgres;
ALTER TABLE ONLY users.api_keys_monthly_usage ADD CONSTRAINT api_keys_monthly_usage_pkey PRIMARY KEY (id);

CREATE TABLE users.api_daily_usage (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    profile_id uuid NOT NULL,
    total_requests numeric NOT NULL,
    date DATE DEFAULT CURRENT_DATE NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone
);

ALTER TABLE users.api_daily_usage OWNER TO postgres;
ALTER TABLE ONLY users.api_daily_usage ADD CONSTRAINT api_daily_usage_pkey PRIMARY KEY (id);

CREATE TABLE users.api_monthly_usage (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    profile_id uuid NOT NULL,
    total_requests numeric NOT NULL,
    date DATE DEFAULT date_trunc('month', CURRENT_DATE) NOT NULL CHECK (date_trunc('month', date) = date),
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone
);
ALTER TABLE users.api_monthly_usage OWNER TO postgres;
ALTER TABLE ONLY users.api_monthly_usage ADD CONSTRAINT api_monthly_usage_pkey PRIMARY KEY (id);

CREATE TABLE users.wallets (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    profile_id uuid NOT NULL,
    address VARCHAR(50) NOT NULL,
    type VARCHAR(20) NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone
);
ALTER TABLE users.wallets OWNER TO postgres;
ALTER TABLE ONLY users.wallets ADD CONSTRAINT wallets_pkey PRIMARY KEY (id);
ALTER TABLE ONLY users.wallets ADD CONSTRAINT address_key UNIQUE (address);

CREATE TABLE consensus.account_histories (
    id VARCHAR(50) NOT NULL,
    nonce NUMERIC NOT NULL,
    free NUMERIC NOT NULL,
    reserved NUMERIC NOT NULL,
    total NUMERIC,
    created_at NUMERIC NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE consensus.account_histories OWNER TO postgres;

CREATE TABLE consensus.account_rewards (
    id VARCHAR(50) NOT NULL,
    total_rewards_value NUMERIC,
    total_rewards_counts NUMERIC,
    block_rewards_value NUMERIC,
    block_rewards_counts NUMERIC,
    vote_rewards_value NUMERIC,
    vote_rewards_counts NUMERIC,
    estimated_staking_rewards_value NUMERIC,
    estimated_staking_rewards_counts NUMERIC,
    created_at NUMERIC NOT NULL,
    updated_at NUMERIC NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE consensus.account_rewards OWNER TO postgres;

CREATE TABLE consensus.accounts (
    id VARCHAR(50) NOT NULL,
    nonce NUMERIC NOT NULL,
    free NUMERIC NOT NULL,
    reserved NUMERIC NOT NULL,
    total NUMERIC,
    created_at NUMERIC NOT NULL,
    updated_at NUMERIC NOT NULL
);
ALTER TABLE consensus.accounts OWNER TO postgres;

CREATE TABLE consensus.blocks (
    id VARCHAR(32) NOT NULL,
    sort_id VARCHAR(32) NOT NULL,
    height NUMERIC NOT NULL,
    hash VARCHAR(66) NOT NULL,
    "timestamp" TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    parent_hash VARCHAR(66) NOT NULL,
    spec_id VARCHAR(32) NOT NULL,
    state_root VARCHAR(66) NOT NULL,
    extrinsics_root VARCHAR(66) NOT NULL,
    space_pledged NUMERIC NOT NULL,
    blockchain_size NUMERIC NOT NULL,
    extrinsics_count INTEGER NOT NULL,
    events_count INTEGER NOT NULL,
    transfers_count INTEGER NOT NULL,
    rewards_count INTEGER NOT NULL,
    block_rewards_count INTEGER NOT NULL,
    vote_rewards_count INTEGER NOT NULL,
    transfer_value NUMERIC NOT NULL,
    reward_value NUMERIC NOT NULL,
    block_reward_value NUMERIC NOT NULL,
    vote_reward_value NUMERIC NOT NULL,
    author_id VARCHAR(50) NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE consensus.blocks OWNER TO postgres;

CREATE TABLE consensus.cumulative_blocks (
    id VARCHAR(32) NOT NULL,
    cumulative_extrinsics_count NUMERIC NOT NULL,
    cumulative_events_count NUMERIC NOT NULL,
    cumulative_transfers_count NUMERIC NOT NULL,
    cumulative_rewards_count NUMERIC NOT NULL,
    cumulative_block_rewards_count NUMERIC NOT NULL,
    cumulative_vote_rewards_count NUMERIC NOT NULL,
    cumulative_transfer_value NUMERIC NOT NULL,
    cumulative_reward_value NUMERIC NOT NULL,
    cumulative_block_reward_value NUMERIC NOT NULL,
    cumulative_vote_reward_value NUMERIC NOT NULL
);
ALTER TABLE consensus.cumulative_blocks OWNER TO postgres;

CREATE TABLE consensus.event_modules (
    id VARCHAR(65) NOT NULL,
    section VARCHAR(32) NOT NULL,
    method VARCHAR(32) NOT NULL
);
ALTER TABLE consensus.event_modules OWNER TO postgres;

CREATE TABLE consensus.events (
    id VARCHAR(65) NOT NULL,
    sort_id VARCHAR(65) NOT NULL,
    block_height NUMERIC NOT NULL,
    block_hash VARCHAR(66) NOT NULL,
    extrinsic_id VARCHAR(65) NOT NULL,
    extrinsic_hash VARCHAR(66) NOT NULL,
    section VARCHAR(32) NOT NULL,
    module VARCHAR(32) NOT NULL,
    name VARCHAR(65) NOT NULL,
    index_in_block NUMERIC NOT NULL,
    "timestamp" TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    phase VARCHAR(32) NOT NULL,
    pos INTEGER NOT NULL,
    args JSONB NOT NULL,
    cid VARCHAR(80),
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE consensus.events OWNER TO postgres;

CREATE TABLE consensus.extrinsic_modules (
    id VARCHAR(65) NOT NULL,
    section VARCHAR(32) NOT NULL,
    method VARCHAR(32) NOT NULL
);
ALTER TABLE consensus.extrinsic_modules OWNER TO postgres;

CREATE TABLE consensus.extrinsics (
    id VARCHAR(65) NOT NULL,
    sort_id VARCHAR(65) NOT NULL,
    hash VARCHAR(66) NOT NULL,
    block_height numeric NOT NULL,
    block_hash VARCHAR(66) NOT NULL,
    section VARCHAR(32) NOT NULL,
    module VARCHAR(32) NOT NULL,
    name VARCHAR(65) NOT NULL,
    index_in_block INTEGER NOT NULL,
    success BOOLEAN NOT NULL,
    "timestamp" TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    nonce NUMERIC NOT NULL,
    signer VARCHAR(50) NOT NULL,
    signature VARCHAR(132) NOT NULL,
    args JSONB NOT NULL,
    error VARCHAR(255) NOT NULL,
    tip NUMERIC NOT NULL,
    fee NUMERIC NOT NULL,
    pos INTEGER NOT NULL,
    cid VARCHAR(80),
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE consensus.extrinsics OWNER TO postgres;

CREATE TABLE consensus.log_kinds (
    id VARCHAR(32) NOT NULL,
    kind VARCHAR(32) NOT NULL
);
ALTER TABLE consensus.log_kinds OWNER TO postgres;

CREATE TABLE consensus.logs (
    id VARCHAR(65) NOT NULL,
    sort_id VARCHAR(65) NOT NULL,
    block_height NUMERIC NOT NULL,
    block_hash VARCHAR(66) NOT NULL,
    index_in_block INTEGER NOT NULL,
    kind VARCHAR(32) NOT NULL,
    value JSONB,
    "timestamp" TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE consensus.logs OWNER TO postgres;

CREATE TABLE consensus.rewards (
    id VARCHAR(120) NOT NULL,
    block_height NUMERIC NOT NULL,
    block_hash VARCHAR(66) NOT NULL,
    extrinsic_id VARCHAR(65) NOT NULL,
    event_id VARCHAR(65) NOT NULL,
    account_id VARCHAR(50) NOT NULL,
    reward_type VARCHAR(32) NOT NULL,
    amount NUMERIC NOT NULL,
    "timestamp" TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE consensus.rewards OWNER TO postgres;

CREATE TABLE consensus.sections (
    id VARCHAR(32) NOT NULL,
    section VARCHAR(32) NOT NULL
);
ALTER TABLE consensus.sections OWNER TO postgres;

CREATE TABLE consensus.transfers (
    id VARCHAR(132) NOT NULL,
    block_height NUMERIC NOT NULL,
    block_hash VARCHAR(66) NOT NULL,
    extrinsic_id VARCHAR(65) NOT NULL,
    event_id VARCHAR(65) NOT NULL,
    "from" VARCHAR(50) NOT NULL,
    "to" VARCHAR(50) NOT NULL,
    value NUMERIC NOT NULL,
    fee NUMERIC NOT NULL,
    success BOOLEAN NOT NULL,
    "timestamp" TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE consensus.transfers OWNER TO postgres;

CREATE TABLE dictionary.events (
    id VARCHAR(65) NOT NULL,
    module VARCHAR(32) NOT NULL,
    event VARCHAR(32) NOT NULL,
    block_height NUMERIC NOT NULL
);
ALTER TABLE dictionary.events OWNER TO postgres;

CREATE TABLE dictionary.extrinsics (
    id VARCHAR(65) NOT NULL,
    tx_hash VARCHAR(66) NOT NULL,
    module VARCHAR(32) NOT NULL,
    call VARCHAR(32) NOT NULL,
    block_height NUMERIC NOT NULL,
    success BOOLEAN NOT NULL,
    is_signed BOOLEAN NOT NULL
);
ALTER TABLE dictionary.extrinsics OWNER TO postgres;

CREATE TABLE dictionary.spec_versions (
    id VARCHAR(32) NOT NULL,
    block_height NUMERIC NOT NULL
);
ALTER TABLE dictionary.spec_versions OWNER TO postgres;

CREATE TABLE leaderboard.account_extrinsic_failed_total_count_histories (
    id VARCHAR(182) NOT NULL,
    account_id VARCHAR(50) NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    block_height NUMERIC NOT NULL,
    extrinsic_id VARCHAR(65) NOT NULL,
    event_id VARCHAR(65) NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE leaderboard.account_extrinsic_failed_total_count_histories OWNER TO postgres;

CREATE TABLE leaderboard.account_extrinsic_failed_total_counts (
    id VARCHAR(50) NOT NULL,
    rank INTEGER NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
);
ALTER TABLE leaderboard.account_extrinsic_failed_total_counts OWNER TO postgres;

CREATE TABLE leaderboard.account_extrinsic_success_total_count_histories (
    id VARCHAR(182) NOT NULL,
    account_id VARCHAR(50) NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    block_height NUMERIC NOT NULL,
    extrinsic_id VARCHAR(65) NOT NULL,
    event_id VARCHAR(65) NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE leaderboard.account_extrinsic_success_total_count_histories OWNER TO postgres;

CREATE TABLE leaderboard.account_extrinsic_success_total_counts (
    id VARCHAR(50) NOT NULL,
    rank INTEGER NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
);
ALTER TABLE leaderboard.account_extrinsic_success_total_counts OWNER TO postgres;

CREATE TABLE leaderboard.account_extrinsic_total_count_histories (
    id VARCHAR(182) NOT NULL,
    account_id VARCHAR(50) NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    block_height NUMERIC NOT NULL,
    extrinsic_id VARCHAR(65) NOT NULL,
    event_id VARCHAR(65) NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE leaderboard.account_extrinsic_total_count_histories OWNER TO postgres;

CREATE TABLE leaderboard.account_extrinsic_total_counts (
    id VARCHAR(50) NOT NULL,
    rank INTEGER NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
);
ALTER TABLE leaderboard.account_extrinsic_total_counts OWNER TO postgres;

CREATE TABLE leaderboard.account_remark_count_histories (
    id VARCHAR(182) NOT NULL,
    account_id VARCHAR(50) NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    block_height NUMERIC NOT NULL,
    extrinsic_id VARCHAR(65) NOT NULL,
    event_id VARCHAR(65) NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE leaderboard.account_remark_count_histories OWNER TO postgres;

CREATE TABLE leaderboard.account_remark_counts (
    id VARCHAR(50) NOT NULL,
    rank INTEGER NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
);
ALTER TABLE leaderboard.account_remark_counts OWNER TO postgres;

CREATE TABLE leaderboard.account_transaction_fee_paid_total_value_histories (
    id VARCHAR(182) NOT NULL,
    account_id VARCHAR(50) NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    block_height NUMERIC NOT NULL,
    extrinsic_id VARCHAR(65) NOT NULL,
    event_id VARCHAR(65) NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE leaderboard.account_transaction_fee_paid_total_value_histories OWNER TO postgres;

CREATE TABLE leaderboard.account_transaction_fee_paid_total_values (
    id VARCHAR(50) NOT NULL,
    rank INTEGER NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
);
ALTER TABLE leaderboard.account_transaction_fee_paid_total_values OWNER TO postgres;

CREATE TABLE leaderboard.account_transfer_receiver_total_count_histories (
    id VARCHAR(182) NOT NULL,
    account_id VARCHAR(50) NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    block_height NUMERIC NOT NULL,
    extrinsic_id VARCHAR(65) NOT NULL,
    event_id VARCHAR(65) NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE leaderboard.account_transfer_receiver_total_count_histories OWNER TO postgres;

CREATE TABLE leaderboard.account_transfer_receiver_total_counts (
    id VARCHAR(50) NOT NULL,
    rank INTEGER NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
);
ALTER TABLE leaderboard.account_transfer_receiver_total_counts OWNER TO postgres;

CREATE TABLE leaderboard.account_transfer_receiver_total_value_histories (
    id VARCHAR(182) NOT NULL,
    account_id VARCHAR(50) NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    block_height NUMERIC NOT NULL,
    extrinsic_id VARCHAR(65) NOT NULL,
    event_id VARCHAR(65) NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE leaderboard.account_transfer_receiver_total_value_histories OWNER TO postgres;

CREATE TABLE leaderboard.account_transfer_receiver_total_values (
    id VARCHAR(50) NOT NULL,
    rank INTEGER NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
);
ALTER TABLE leaderboard.account_transfer_receiver_total_values OWNER TO postgres;

CREATE TABLE leaderboard.account_transfer_sender_total_count_histories (
    id VARCHAR(182) NOT NULL,
    account_id VARCHAR(50) NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    block_height NUMERIC NOT NULL,
    extrinsic_id VARCHAR(65) NOT NULL,
    event_id VARCHAR(65) NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE leaderboard.account_transfer_sender_total_count_histories OWNER TO postgres;

CREATE TABLE leaderboard.account_transfer_sender_total_counts (
    id VARCHAR(50) NOT NULL,
    rank INTEGER NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
);
ALTER TABLE leaderboard.account_transfer_sender_total_counts OWNER TO postgres;

CREATE TABLE leaderboard.account_transfer_sender_total_value_histories (
    id VARCHAR(182) NOT NULL,
    account_id VARCHAR(50) NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    block_height NUMERIC NOT NULL,
    extrinsic_id VARCHAR(65) NOT NULL,
    event_id VARCHAR(65) NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE leaderboard.account_transfer_sender_total_value_histories OWNER TO postgres;

CREATE TABLE leaderboard.account_transfer_sender_total_values (
    id VARCHAR(50) NOT NULL,
    rank INTEGER NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
);
ALTER TABLE leaderboard.account_transfer_sender_total_values OWNER TO postgres;

CREATE TABLE leaderboard.farmer_block_total_count_histories (
    id VARCHAR(182) NOT NULL,
    account_id VARCHAR(50) NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    block_height NUMERIC NOT NULL,
    extrinsic_id VARCHAR(65) NOT NULL,
    event_id VARCHAR(65) NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE leaderboard.farmer_block_total_count_histories OWNER TO postgres;

CREATE TABLE leaderboard.farmer_block_total_counts (
    id VARCHAR(50) NOT NULL,
    rank INTEGER NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
);
ALTER TABLE leaderboard.farmer_block_total_counts OWNER TO postgres;

CREATE TABLE leaderboard.farmer_block_total_value_histories (
    id VARCHAR(182) NOT NULL,
    account_id VARCHAR(50) NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    block_height NUMERIC NOT NULL,
    extrinsic_id VARCHAR(65) NOT NULL,
    event_id VARCHAR(65) NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE leaderboard.farmer_block_total_value_histories OWNER TO postgres;

CREATE TABLE leaderboard.farmer_block_total_values (
    id VARCHAR(50) NOT NULL,
    rank INTEGER NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
);
ALTER TABLE leaderboard.farmer_block_total_values OWNER TO postgres;

CREATE TABLE leaderboard.farmer_vote_and_block_total_count_histories (
    id VARCHAR(182) NOT NULL,
    account_id VARCHAR(50) NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    block_height NUMERIC NOT NULL,
    extrinsic_id VARCHAR(65) NOT NULL,
    event_id VARCHAR(65) NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE leaderboard.farmer_vote_and_block_total_count_histories OWNER TO postgres;

CREATE TABLE leaderboard.farmer_vote_and_block_total_counts (
    id VARCHAR(50) NOT NULL,
    rank INTEGER NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
);
ALTER TABLE leaderboard.farmer_vote_and_block_total_counts OWNER TO postgres;

CREATE TABLE leaderboard.farmer_vote_and_block_total_value_histories (
    id VARCHAR(182) NOT NULL,
    account_id VARCHAR(50) NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    block_height NUMERIC NOT NULL,
    extrinsic_id VARCHAR(65) NOT NULL,
    event_id VARCHAR(65) NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE leaderboard.farmer_vote_and_block_total_value_histories OWNER TO postgres;

CREATE TABLE leaderboard.farmer_vote_and_block_total_values (
    id VARCHAR(50) NOT NULL,
    rank INTEGER NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
);
ALTER TABLE leaderboard.farmer_vote_and_block_total_values OWNER TO postgres;

CREATE TABLE leaderboard.farmer_vote_total_count_histories (
    id VARCHAR(182) NOT NULL,
    account_id VARCHAR(50) NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    block_height NUMERIC NOT NULL,
    extrinsic_id VARCHAR(65) NOT NULL,
    event_id VARCHAR(65) NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE leaderboard.farmer_vote_total_count_histories OWNER TO postgres;

CREATE TABLE leaderboard.farmer_vote_total_counts (
    id VARCHAR(50) NOT NULL,
    rank INTEGER NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
);
ALTER TABLE leaderboard.farmer_vote_total_counts OWNER TO postgres;

CREATE TABLE leaderboard.farmer_vote_total_value_histories (
    id VARCHAR(182) NOT NULL,
    account_id VARCHAR(50) NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    block_height NUMERIC NOT NULL,
    extrinsic_id VARCHAR(65) NOT NULL,
    event_id VARCHAR(65) NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE leaderboard.farmer_vote_total_value_histories OWNER TO postgres;

CREATE TABLE leaderboard.farmer_vote_total_values (
    id VARCHAR(50) NOT NULL,
    rank INTEGER NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
);
ALTER TABLE leaderboard.farmer_vote_total_values OWNER TO postgres;

CREATE TABLE leaderboard.nominator_deposits_total_count_histories (
    id VARCHAR(182) NOT NULL,
    account_id VARCHAR(50) NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    block_height NUMERIC NOT NULL,
    extrinsic_id VARCHAR(65) NOT NULL,
    event_id VARCHAR(65) NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE leaderboard.nominator_deposits_total_count_histories OWNER TO postgres;

CREATE TABLE leaderboard.nominator_deposits_total_counts (
    id VARCHAR(50) NOT NULL,
    rank INTEGER NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
);
ALTER TABLE leaderboard.nominator_deposits_total_counts OWNER TO postgres;

CREATE TABLE leaderboard.nominator_deposits_total_value_histories (
    id VARCHAR(182) NOT NULL,
    account_id VARCHAR(50) NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    block_height NUMERIC NOT NULL,
    extrinsic_id VARCHAR(65) NOT NULL,
    event_id VARCHAR(65) NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE leaderboard.nominator_deposits_total_value_histories OWNER TO postgres;

CREATE TABLE leaderboard.nominator_deposits_total_values (
    id VARCHAR(50) NOT NULL,
    rank INTEGER NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
);
ALTER TABLE leaderboard.nominator_deposits_total_values OWNER TO postgres;

CREATE TABLE leaderboard.nominator_withdrawals_total_count_histories (
    id VARCHAR(182) NOT NULL,
    account_id VARCHAR(50) NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    block_height NUMERIC NOT NULL,
    extrinsic_id VARCHAR(65) NOT NULL,
    event_id VARCHAR(65) NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE leaderboard.nominator_withdrawals_total_count_histories OWNER TO postgres;

CREATE TABLE leaderboard.nominator_withdrawals_total_counts (
    id VARCHAR(50) NOT NULL,
    rank INTEGER NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
);
ALTER TABLE leaderboard.nominator_withdrawals_total_counts OWNER TO postgres;

CREATE TABLE leaderboard.operator_bundle_total_count_histories (
    id VARCHAR(182) NOT NULL,
    account_id VARCHAR(50) NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    block_height NUMERIC NOT NULL,
    extrinsic_id VARCHAR(65) NOT NULL,
    event_id VARCHAR(65) NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE leaderboard.operator_bundle_total_count_histories OWNER TO postgres;

CREATE TABLE leaderboard.operator_bundle_total_counts (
    id VARCHAR(50) NOT NULL,
    rank INTEGER NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
);
ALTER TABLE leaderboard.operator_bundle_total_counts OWNER TO postgres;

CREATE TABLE leaderboard.operator_deposits_total_count_histories (
    id VARCHAR(182) NOT NULL,
    account_id VARCHAR(50) NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    block_height NUMERIC NOT NULL,
    extrinsic_id VARCHAR(65) NOT NULL,
    event_id VARCHAR(65) NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE leaderboard.operator_deposits_total_count_histories OWNER TO postgres;

CREATE TABLE leaderboard.operator_deposits_total_counts (
    id VARCHAR(50) NOT NULL,
    rank INTEGER NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
);
ALTER TABLE leaderboard.operator_deposits_total_counts OWNER TO postgres;

CREATE TABLE leaderboard.operator_deposits_total_value_histories (
    id VARCHAR(182) NOT NULL,
    account_id VARCHAR(50) NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    block_height NUMERIC NOT NULL,
    extrinsic_id VARCHAR(65) NOT NULL,
    event_id VARCHAR(65) NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE leaderboard.operator_deposits_total_value_histories OWNER TO postgres;

CREATE TABLE leaderboard.operator_deposits_total_values (
    id VARCHAR(50) NOT NULL,
    rank INTEGER NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
);
ALTER TABLE leaderboard.operator_deposits_total_values OWNER TO postgres;

CREATE TABLE leaderboard.operator_total_rewards_collected_histories (
    id VARCHAR(182) NOT NULL,
    account_id VARCHAR(50) NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    block_height NUMERIC NOT NULL,
    extrinsic_id VARCHAR(65) NOT NULL,
    event_id VARCHAR(65) NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE leaderboard.operator_total_rewards_collected_histories OWNER TO postgres;

CREATE TABLE leaderboard.operator_total_rewards_collecteds (
    id VARCHAR(50) NOT NULL,
    rank INTEGER NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
);
ALTER TABLE leaderboard.operator_total_rewards_collecteds OWNER TO postgres;

CREATE TABLE leaderboard.operator_total_tax_collected_histories (
    id VARCHAR(182) NOT NULL,
    account_id VARCHAR(50) NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    block_height NUMERIC NOT NULL,
    extrinsic_id VARCHAR(65) NOT NULL,
    event_id VARCHAR(65) NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE leaderboard.operator_total_tax_collected_histories OWNER TO postgres;

CREATE TABLE leaderboard.operator_total_tax_collecteds (
    id VARCHAR(50) NOT NULL,
    rank INTEGER NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
);
ALTER TABLE leaderboard.operator_total_tax_collecteds OWNER TO postgres;

CREATE TABLE leaderboard.operator_withdrawals_total_count_histories (
    id VARCHAR(182) NOT NULL,
    account_id VARCHAR(50) NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    block_height NUMERIC NOT NULL,
    extrinsic_id VARCHAR(65) NOT NULL,
    event_id VARCHAR(65) NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE leaderboard.operator_withdrawals_total_count_histories OWNER TO postgres;

CREATE TABLE leaderboard.operator_withdrawals_total_counts (
    id VARCHAR(50) NOT NULL,
    rank INTEGER NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
);
ALTER TABLE leaderboard.operator_withdrawals_total_counts OWNER TO postgres;

CREATE TABLE files.chunks (
    id VARCHAR(80) NOT NULL,
    type VARCHAR(20) NOT NULL,
    link_depth INTEGER NOT NULL,
    size NUMERIC,
    name VARCHAR(255),
    data TEXT,
    upload_options TEXT,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE files.chunks OWNER TO postgres;

CREATE TABLE files.cids (
    id VARCHAR(80) NOT NULL,
    block_height NUMERIC NOT NULL,
    block_hash VARCHAR(66) NOT NULL,
    extrinsic_id VARCHAR(65) NOT NULL,
    extrinsic_hash VARCHAR(66) NOT NULL,
    index_in_block INTEGER NOT NULL,
    links JSONB NOT NULL,
    "timestamp" TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE files.cids OWNER TO postgres;

CREATE TABLE files.errors (
    id VARCHAR(65) NOT NULL,
    block_height NUMERIC NOT NULL,
    block_hash VARCHAR(66) NOT NULL,
    extrinsic_id VARCHAR(65) NOT NULL,
    extrinsic_hash VARCHAR(66) NOT NULL,
    index_in_block INTEGER NOT NULL,
    error TEXT NOT NULL,
    "timestamp" TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE files.errors OWNER TO postgres;

CREATE TABLE files.file_cids (
    id VARCHAR(161) NOT NULL,
    parent_cid VARCHAR(80) NOT NULL,
    child_cid VARCHAR(80) NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE files.file_cids OWNER TO postgres;

CREATE TABLE files.files (
    id VARCHAR(80) NOT NULL,
    size NUMERIC NOT NULL,
    name VARCHAR(255),
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE files.files OWNER TO postgres;

CREATE TABLE files.folder_cids (
    id VARCHAR(161) NOT NULL,
    parent_cid VARCHAR(80) NOT NULL,
    child_cid VARCHAR(80) NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE files.folder_cids OWNER TO postgres;

CREATE TABLE files.folders (
    id VARCHAR(80) NOT NULL,
    size NUMERIC NOT NULL,
    name VARCHAR(255),
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE files.folders OWNER TO postgres;

CREATE TABLE files.metadata (
    id VARCHAR(80) NOT NULL,
    size NUMERIC NOT NULL,
    name VARCHAR(255),
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE files.metadata OWNER TO postgres;

CREATE TABLE files.metadata_cids (
    id VARCHAR(161) NOT NULL,
    parent_cid VARCHAR(80) NOT NULL,
    child_cid VARCHAR(80) NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE files.metadata_cids OWNER TO postgres;

ALTER TABLE ONLY consensus._metadata
    ADD CONSTRAINT _metadata_pkey PRIMARY KEY (key);

ALTER TABLE ONLY consensus.account_histories
    ADD CONSTRAINT account_histories_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY consensus.account_rewards
    ADD CONSTRAINT account_rewards_id_key UNIQUE (id);

ALTER TABLE ONLY consensus.account_rewards
    ADD CONSTRAINT account_rewards_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY consensus.accounts
    ADD CONSTRAINT accounts_id_key PRIMARY KEY (id);

ALTER TABLE ONLY consensus.blocks
    ADD CONSTRAINT blocks_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY consensus.cumulative_blocks
    ADD CONSTRAINT cumulative_blocks_pkey PRIMARY KEY (id);

ALTER TABLE ONLY consensus.event_modules
    ADD CONSTRAINT event_modules_id_key PRIMARY KEY (id);

ALTER TABLE ONLY consensus.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY consensus.extrinsic_modules
    ADD CONSTRAINT extrinsic_modules_id_key PRIMARY KEY (id);

ALTER TABLE ONLY consensus.extrinsics
    ADD CONSTRAINT extrinsics_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY consensus.log_kinds
    ADD CONSTRAINT log_kinds_id_key PRIMARY KEY (id);

ALTER TABLE ONLY consensus.logs
    ADD CONSTRAINT logs_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY consensus.rewards
    ADD CONSTRAINT rewards_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY consensus.sections
    ADD CONSTRAINT sections_id_key PRIMARY KEY (id);

ALTER TABLE ONLY consensus.transfers
    ADD CONSTRAINT transfers_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY dictionary._metadata
    ADD CONSTRAINT _metadata_pkey PRIMARY KEY (key);

ALTER TABLE ONLY dictionary.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);

ALTER TABLE ONLY dictionary.extrinsics
    ADD CONSTRAINT extrinsics_pkey PRIMARY KEY (id);

ALTER TABLE ONLY dictionary.spec_versions
    ADD CONSTRAINT spec_versions_pkey PRIMARY KEY (id);


ALTER TABLE ONLY leaderboard._metadata
    ADD CONSTRAINT _metadata_pkey PRIMARY KEY (key);

ALTER TABLE ONLY leaderboard.account_extrinsic_failed_total_count_histories
    ADD CONSTRAINT account_extrinsic_failed_total_count_histories_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY leaderboard.account_extrinsic_failed_total_counts
    ADD CONSTRAINT account_extrinsic_failed_total_counts_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.account_extrinsic_success_total_count_histories
    ADD CONSTRAINT account_extrinsic_success_total_count_histories_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY leaderboard.account_extrinsic_success_total_counts
    ADD CONSTRAINT account_extrinsic_success_total_counts_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.account_extrinsic_total_count_histories
    ADD CONSTRAINT account_extrinsic_total_count_histories_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY leaderboard.account_extrinsic_total_counts
    ADD CONSTRAINT account_extrinsic_total_counts_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.account_remark_count_histories
    ADD CONSTRAINT account_remark_count_histories_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY leaderboard.account_remark_counts
    ADD CONSTRAINT account_remark_counts_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.account_transaction_fee_paid_total_value_histories
    ADD CONSTRAINT account_transaction_fee_paid_total_value_histories_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY leaderboard.account_transaction_fee_paid_total_values
    ADD CONSTRAINT account_transaction_fee_paid_total_values_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.account_transfer_receiver_total_count_histories
    ADD CONSTRAINT account_transfer_receiver_total_count_histories_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY leaderboard.account_transfer_receiver_total_counts
    ADD CONSTRAINT account_transfer_receiver_total_counts_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.account_transfer_receiver_total_value_histories
    ADD CONSTRAINT account_transfer_receiver_total_value_histories_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY leaderboard.account_transfer_receiver_total_values
    ADD CONSTRAINT account_transfer_receiver_total_values_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.account_transfer_sender_total_count_histories
    ADD CONSTRAINT account_transfer_sender_total_count_histories_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY leaderboard.account_transfer_sender_total_counts
    ADD CONSTRAINT account_transfer_sender_total_counts_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.account_transfer_sender_total_value_histories
    ADD CONSTRAINT account_transfer_sender_total_value_histories_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY leaderboard.account_transfer_sender_total_values
    ADD CONSTRAINT account_transfer_sender_total_values_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.farmer_block_total_count_histories
    ADD CONSTRAINT farmer_block_total_count_histories_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY leaderboard.farmer_block_total_counts
    ADD CONSTRAINT farmer_block_total_counts_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.farmer_block_total_value_histories
    ADD CONSTRAINT farmer_block_total_value_histories_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY leaderboard.farmer_block_total_values
    ADD CONSTRAINT farmer_block_total_values_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.farmer_vote_and_block_total_count_histories
    ADD CONSTRAINT farmer_vote_and_block_total_count_histories_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY leaderboard.farmer_vote_and_block_total_counts
    ADD CONSTRAINT farmer_vote_and_block_total_counts_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.farmer_vote_and_block_total_value_histories
    ADD CONSTRAINT farmer_vote_and_block_total_value_histories_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY leaderboard.farmer_vote_and_block_total_values
    ADD CONSTRAINT farmer_vote_and_block_total_values_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.farmer_vote_total_count_histories
    ADD CONSTRAINT farmer_vote_total_count_histories_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY leaderboard.farmer_vote_total_counts
    ADD CONSTRAINT farmer_vote_total_counts_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.farmer_vote_total_value_histories
    ADD CONSTRAINT farmer_vote_total_value_histories_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY leaderboard.farmer_vote_total_values
    ADD CONSTRAINT farmer_vote_total_values_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.nominator_deposits_total_count_histories
    ADD CONSTRAINT nominator_deposits_total_count_histories_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY leaderboard.nominator_deposits_total_counts
    ADD CONSTRAINT nominator_deposits_total_counts_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.nominator_deposits_total_value_histories
    ADD CONSTRAINT nominator_deposits_total_value_histories_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY leaderboard.nominator_deposits_total_values
    ADD CONSTRAINT nominator_deposits_total_values_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.nominator_withdrawals_total_count_histories
    ADD CONSTRAINT nominator_withdrawals_total_count_histories_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY leaderboard.nominator_withdrawals_total_counts
    ADD CONSTRAINT nominator_withdrawals_total_counts_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.operator_bundle_total_count_histories
    ADD CONSTRAINT operator_bundle_total_count_histories_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY leaderboard.operator_bundle_total_counts
    ADD CONSTRAINT operator_bundle_total_counts_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.operator_deposits_total_count_histories
    ADD CONSTRAINT operator_deposits_total_count_histories_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY leaderboard.operator_deposits_total_counts
    ADD CONSTRAINT operator_deposits_total_counts_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.operator_deposits_total_value_histories
    ADD CONSTRAINT operator_deposits_total_value_histories_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY leaderboard.operator_deposits_total_values
    ADD CONSTRAINT operator_deposits_total_values_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.operator_total_rewards_collected_histories
    ADD CONSTRAINT operator_total_rewards_collected_histories_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY leaderboard.operator_total_rewards_collecteds
    ADD CONSTRAINT operator_total_rewards_collecteds_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.operator_total_tax_collected_histories
    ADD CONSTRAINT operator_total_tax_collected_histories_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY leaderboard.operator_total_tax_collecteds
    ADD CONSTRAINT operator_total_tax_collecteds_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.operator_withdrawals_total_count_histories
    ADD CONSTRAINT operator_withdrawals_total_count_histories_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY leaderboard.operator_withdrawals_total_counts
    ADD CONSTRAINT operator_withdrawals_total_counts_pkey PRIMARY KEY (id);

ALTER TABLE ONLY files._metadata
    ADD CONSTRAINT _metadata_pkey PRIMARY KEY (key);

ALTER TABLE ONLY files.chunks
    ADD CONSTRAINT chunks_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY files.cids
    ADD CONSTRAINT cids_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY files.errors
    ADD CONSTRAINT errors_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY files.file_cids
    ADD CONSTRAINT file_cids_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY files.files
    ADD CONSTRAINT files_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY files.folder_cids
    ADD CONSTRAINT folder_cids_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY files.folders
    ADD CONSTRAINT folders_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY files.metadata_cids
    ADD CONSTRAINT metadata_cids_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY files.metadata
    ADD CONSTRAINT metadata_pkey PRIMARY KEY (_id);

CREATE INDEX "0x08aa840e441d13bb" ON consensus.blocks USING gist (height, _block_range);
CREATE INDEX "0x09a98aa53fa2c2e3" ON consensus.logs USING btree (id);
CREATE INDEX "0x12b6c780263a8815" ON consensus.transfers USING gist (block_height, _block_range);
CREATE INDEX "0x1532f5e4701949a5" ON consensus.extrinsics USING gist (hash, _block_range);
CREATE INDEX "0x1e967733a0d5db15" ON consensus.rewards USING btree (id);
CREATE INDEX "0x2481c1ffa5112599" ON consensus.logs USING gist (block_hash, _block_range);
CREATE INDEX "0x26e9de0ee335659c" ON consensus.extrinsic_modules USING btree (id);
CREATE INDEX "0x2a038c9edc202d38" ON consensus.transfers USING gist (event_id, _block_range);
CREATE INDEX "0x2c6d435d5ab69412" ON consensus.extrinsics USING gist (sort_id, _block_range);
CREATE INDEX "0x2cbe628ebc830c12" ON consensus.logs USING gist (sort_id, _block_range);
CREATE INDEX "0x30b779cc3aeeeec6" ON consensus.events USING gist (extrinsic_id, _block_range);
CREATE INDEX "0x3ae5d1670e99e612" ON consensus.transfers USING gist ("timestamp", _block_range);
CREATE INDEX "0x3d8ee08d232943ea" ON consensus.sections USING btree (id);
CREATE INDEX "0x444de3b3611c1fcd" ON consensus.account_histories USING gist (created_at, _block_range);
CREATE INDEX "0x47d5e34ca84a0356" ON consensus.rewards USING gist (event_id, _block_range);
CREATE INDEX "0x4a66afa700f00759" ON consensus.events USING gist (block_hash, _block_range);
CREATE INDEX "0x4b2e240a52e09d22" ON consensus.extrinsics USING gist (cid, _block_range);
CREATE INDEX "0x4cb388e53e3e30f3" ON consensus.accounts USING btree (id);
CREATE INDEX "0x55286926221be2e7" ON consensus.event_modules USING btree (id);
CREATE INDEX "0x57fc196dcc99a091" ON consensus.events USING gist (block_height, _block_range);
CREATE INDEX "0x59386a58438fa05a" ON consensus.extrinsics USING gist (section, _block_range);
CREATE INDEX "0x59f75d2bc1e6a0bc" ON consensus.blocks USING gist ("timestamp", _block_range);
CREATE INDEX "0x5b5ab04a8ff6f214" ON consensus.events USING gist (cid, _block_range);
CREATE INDEX "0x5eb8e024a00f2132" ON consensus.rewards USING gist (extrinsic_id, _block_range);
CREATE INDEX "0x6008270492da5713" ON consensus.events USING gist ("timestamp", _block_range);
CREATE INDEX "0x6131d72d57f2a188" ON consensus.blocks USING gist (hash, _block_range);
CREATE INDEX "0x61510445e44f4f2f" ON consensus.logs USING gist (index_in_block, _block_range);
CREATE INDEX "0x64128774d8de590c" ON consensus.log_kinds USING btree (id);
CREATE INDEX "0x6f53f38c566a1b3a" ON consensus.extrinsics USING gist (module, _block_range);
CREATE INDEX "0x73cd163028b0b898" ON consensus.rewards USING gist (account_id, _block_range);
CREATE INDEX "0x73d8b9e481a083a2" ON consensus.transfers USING gist (block_hash, _block_range);
CREATE INDEX "0x774ec1c372b71838" ON consensus.events USING gist (sort_id, _block_range);
CREATE INDEX "0x79131319c12e8920" ON consensus.transfers USING gist ("from", _block_range);
CREATE INDEX "0x79ff6a28c8a013aa" ON consensus.logs USING gist ("timestamp", _block_range);
CREATE INDEX "0x889e9f7e5a64267c" ON consensus.extrinsics USING gist (block_height, _block_range);
CREATE INDEX "0x946898e0d99da99d" ON consensus.blocks USING gist (sort_id, _block_range);
CREATE INDEX "0x9dc19a4dda2286f4" ON consensus.events USING gist (section, _block_range);
CREATE INDEX "0xa1455f2831f03723" ON consensus.rewards USING gist ("timestamp", _block_range);
CREATE INDEX "0xb0f971b6213bd370" ON consensus.events USING gist (module, _block_range);
CREATE INDEX "0xb3d3d7d2b08d4e7e" ON consensus.rewards USING gist (block_hash, _block_range);
CREATE INDEX "0xb7bb46c9ebdd7fe1" ON consensus.transfers USING gist (extrinsic_id, _block_range);
CREATE INDEX "0xb91efc8ed4021e6e" ON consensus.transfers USING btree (id);
CREATE INDEX "0xbbc46ed346025b1f" ON consensus.account_histories USING gist (total, _block_range);
CREATE INDEX "0xc0683fc6175b395a" ON consensus.events USING gist (extrinsic_hash, _block_range);
CREATE INDEX "0xc7a7467355cf8dbb" ON consensus.extrinsics USING gist ("timestamp", _block_range);
CREATE INDEX "0xccedb032815757ed" ON consensus.blocks USING btree (id);
CREATE INDEX "0xd21b20c334f80c2e" ON consensus.account_histories USING btree (id);
CREATE INDEX "0xd8db4c8313621519" ON consensus.extrinsics USING btree (id);
CREATE INDEX "0xe2d1f5b9c21b141e" ON consensus.extrinsics USING gist (signer, _block_range);
CREATE INDEX "0xe56a7291c224fff9" ON consensus.transfers USING gist ("to", _block_range);
CREATE INDEX "0xe5bf5858bd35a276" ON consensus.events USING btree (id);
CREATE INDEX "0xf095c4017bdfed7d" ON consensus.rewards USING gist (block_height, _block_range);
CREATE INDEX "0xf20fbf5a3f59a046" ON consensus.extrinsics USING gist (success, _block_range);
CREATE INDEX "0xf303d79993939441" ON consensus.rewards USING gist (reward_type, _block_range);
CREATE INDEX "0xf6317466d2b3ee74" ON consensus.logs USING gist (block_height, _block_range);
CREATE INDEX "0xfa91e9294de2a975" ON consensus.extrinsics USING gist (block_hash, _block_range);
CREATE INDEX "0xff37291e107f6ca9" ON consensus.blocks USING gist (author_id, _block_range);

CREATE INDEX "0x288575ef7a7aaf75" ON dictionary.extrinsics USING btree (module);
CREATE INDEX "0x46e7a495bb4c21d1" ON dictionary.events USING btree (event);
CREATE INDEX "0x57c58da22539b57d" ON dictionary.extrinsics USING btree (block_height);
CREATE INDEX "0x5b57ecd94445ad2e" ON dictionary.extrinsics USING btree (call);
CREATE INDEX "0x62b8f3181611d490" ON dictionary.events USING btree (module);
CREATE INDEX "0xc0c9768d1987b60f" ON dictionary.events USING btree (block_height);


CREATE INDEX "0x00a19bd16cefb56d" ON leaderboard.operator_total_rewards_collected_histories USING gist (block_height, _block_range);
CREATE INDEX "0x0237b4bb45c8cd3d" ON leaderboard.farmer_vote_and_block_total_values USING btree (created_at);
CREATE INDEX "0x0244cc7c84316bf5" ON leaderboard.nominator_deposits_total_count_histories USING gist (block_height, _block_range);
CREATE INDEX "0x03f87f972ff639fb" ON leaderboard.nominator_deposits_total_counts USING btree (rank);
CREATE INDEX "0x04c74d64a2ca170d" ON leaderboard.operator_deposits_total_values USING btree (created_at);
CREATE INDEX "0x0a50f1f460ef26ea" ON leaderboard.farmer_vote_and_block_total_counts USING btree (created_at);
CREATE INDEX "0x0a89134e4a3de20e" ON leaderboard.account_transfer_receiver_total_values USING btree (updated_at);
CREATE INDEX "0x0a914dd2bb308160" ON leaderboard.farmer_block_total_value_histories USING btree (id);
CREATE INDEX "0x0b56aa1915c7f363" ON leaderboard.account_transaction_fee_paid_total_value_histories USING gist (account_id, _block_range);
CREATE INDEX "0x0b8b8b69754807d3" ON leaderboard.farmer_vote_and_block_total_count_histories USING gist (value, _block_range);
CREATE INDEX "0x15178b2615ecb334" ON leaderboard.farmer_vote_total_counts USING btree (value);
CREATE INDEX "0x17aa9d3d762269fa" ON leaderboard.account_transfer_receiver_total_value_histories USING gist (value, _block_range);
CREATE INDEX "0x19ecd7ecdee51bdc" ON leaderboard.account_transfer_sender_total_value_histories USING gist (value, _block_range);
CREATE INDEX "0x1dc9d229fc046a77" ON leaderboard.farmer_block_total_counts USING btree (value);
CREATE INDEX "0x1ed6c532b99ee178" ON leaderboard.nominator_deposits_total_values USING btree (rank);
CREATE INDEX "0x1fcbfceab1d743dc" ON leaderboard.nominator_deposits_total_value_histories USING gist (block_height, _block_range);
CREATE INDEX "0x1fd4ad1795e237a1" ON leaderboard.farmer_vote_total_value_histories USING btree (id);
CREATE INDEX "0x203a197257ce12a5" ON leaderboard.farmer_vote_total_counts USING btree (rank);
CREATE INDEX "0x206ce884fc1c5cd0" ON leaderboard.account_transfer_sender_total_count_histories USING gist (value, _block_range);
CREATE INDEX "0x21d9f76ed37bd96e" ON leaderboard.account_transfer_receiver_total_counts USING btree (created_at);
CREATE INDEX "0x2543cf3b9ae14ab8" ON leaderboard.operator_deposits_total_counts USING btree (created_at);
CREATE INDEX "0x25d59bd5befefa21" ON leaderboard.farmer_vote_and_block_total_values USING btree (updated_at);
CREATE INDEX "0x261402fc9f454bf4" ON leaderboard.nominator_deposits_total_values USING btree (updated_at);
CREATE INDEX "0x274bfb55e0692363" ON leaderboard.account_transfer_sender_total_counts USING btree (updated_at);
CREATE INDEX "0x283ae161d36cc261" ON leaderboard.farmer_block_total_value_histories USING gist (account_id, _block_range);
CREATE INDEX "0x2a19af3b66553514" ON leaderboard.farmer_vote_and_block_total_count_histories USING gist (account_id, _block_range);
CREATE INDEX "0x2ab353d6f5476280" ON leaderboard.farmer_vote_and_block_total_value_histories USING gist (value, _block_range);
CREATE INDEX "0x2e81c6470104e40a" ON leaderboard.account_transfer_receiver_total_counts USING btree (updated_at);
CREATE INDEX "0x3082545cf9f8ade6" ON leaderboard.operator_total_rewards_collected_histories USING btree (id);
CREATE INDEX "0x33208903dd1d791b" ON leaderboard.operator_deposits_total_value_histories USING gist (value, _block_range);
CREATE INDEX "0x3676ac6d2b32bc84" ON leaderboard.operator_total_rewards_collected_histories USING gist (account_id, _block_range);
CREATE INDEX "0x36fad076b7b609c8" ON leaderboard.operator_total_tax_collecteds USING btree (rank);
CREATE INDEX "0x37cd3b31685e6b8a" ON leaderboard.operator_deposits_total_count_histories USING btree (id);
CREATE INDEX "0x3bb471ec1101b66a" ON leaderboard.account_transfer_receiver_total_values USING btree (created_at);
CREATE INDEX "0x3c11ae5e03742fc1" ON leaderboard.farmer_vote_total_count_histories USING btree (id);
CREATE INDEX "0x3c8d59be33cc30fd" ON leaderboard.account_transaction_fee_paid_total_values USING btree (value);
CREATE INDEX "0x3fb3bf4c3648e89f" ON leaderboard.operator_bundle_total_counts USING btree (value);
CREATE INDEX "0x414cf5a248371b9e" ON leaderboard.operator_total_rewards_collecteds USING btree (value);
CREATE INDEX "0x421f161af0318c8b" ON leaderboard.nominator_withdrawals_total_count_histories USING gist (account_id, _block_range);
CREATE INDEX "0x45b6baa60f76afe5" ON leaderboard.farmer_block_total_counts USING btree (rank);
CREATE INDEX "0x45db7717e810fbed" ON leaderboard.account_extrinsic_failed_total_counts USING btree (created_at);
CREATE INDEX "0x4650f835071e0d71" ON leaderboard.farmer_vote_total_value_histories USING gist (account_id, _block_range);
CREATE INDEX "0x48833908a7574703" ON leaderboard.account_transfer_sender_total_counts USING btree (created_at);
CREATE INDEX "0x499757adbe68e426" ON leaderboard.operator_bundle_total_count_histories USING gist (value, _block_range);
CREATE INDEX "0x4ca9e9ee31b8c664" ON leaderboard.account_remark_count_histories USING gist (block_height, _block_range);
CREATE INDEX "0x4d064ce423ead9f9" ON leaderboard.nominator_deposits_total_value_histories USING gist (value, _block_range);
CREATE INDEX "0x4da777bb92510b22" ON leaderboard.farmer_vote_and_block_total_value_histories USING gist (block_height, _block_range);
CREATE INDEX "0x4e666b4c0682b5d9" ON leaderboard.account_transfer_receiver_total_count_histories USING gist (account_id, _block_range);
CREATE INDEX "0x4ebb0e134d2bbcde" ON leaderboard.operator_deposits_total_count_histories USING gist (block_height, _block_range);
CREATE INDEX "0x4ec7b66d408abb23" ON leaderboard.nominator_deposits_total_count_histories USING gist (account_id, _block_range);
CREATE INDEX "0x5162c85596c9338e" ON leaderboard.operator_deposits_total_values USING btree (value);
CREATE INDEX "0x52bb11467ca64f9e" ON leaderboard.nominator_deposits_total_value_histories USING gist (account_id, _block_range);
CREATE INDEX "0x52d6270f1cc3c4dd" ON leaderboard.operator_bundle_total_counts USING btree (rank);
CREATE INDEX "0x547b123af6dcd32a" ON leaderboard.account_extrinsic_total_counts USING btree (updated_at);
CREATE INDEX "0x554eb4e5ac77f3eb" ON leaderboard.operator_withdrawals_total_count_histories USING btree (id);
CREATE INDEX "0x5691017160aa14de" ON leaderboard.account_transfer_sender_total_value_histories USING gist (block_height, _block_range);
CREATE INDEX "0x5738b9b369347bf1" ON leaderboard.account_remark_counts USING btree (created_at);
CREATE INDEX "0x594dec910ab418ad" ON leaderboard.operator_total_rewards_collected_histories USING gist (value, _block_range);
CREATE INDEX "0x5b1a07a2eacad81c" ON leaderboard.operator_bundle_total_counts USING btree (updated_at);
CREATE INDEX "0x5bd3b2299db13775" ON leaderboard.farmer_vote_and_block_total_counts USING btree (updated_at);
CREATE INDEX "0x5cfd74ecb2e7596e" ON leaderboard.nominator_withdrawals_total_counts USING btree (created_at);
CREATE INDEX "0x5dc53a0b91bef6f5" ON leaderboard.account_transfer_receiver_total_value_histories USING gist (account_id, _block_range);
CREATE INDEX "0x5ed08ec48c219622" ON leaderboard.farmer_vote_total_value_histories USING gist (value, _block_range);
CREATE INDEX "0x6446d391095803fe" ON leaderboard.account_transfer_receiver_total_values USING btree (rank);
CREATE INDEX "0x648d3308d6c4914f" ON leaderboard.operator_deposits_total_counts USING btree (value);
CREATE INDEX "0x6625bd986dfdd912" ON leaderboard.farmer_vote_total_values USING btree (rank);
CREATE INDEX "0x67610203489d7569" ON leaderboard.operator_total_tax_collecteds USING btree (created_at);
CREATE INDEX "0x67876d73c8d1484a" ON leaderboard.nominator_deposits_total_values USING btree (created_at);
CREATE INDEX "0x6a80c339bc124d94" ON leaderboard.account_extrinsic_success_total_count_histories USING gist (value, _block_range);
CREATE INDEX "0x6e3c8d300e206644" ON leaderboard.account_transfer_sender_total_values USING btree (value);
CREATE INDEX "0x6e7ba35bab79dae5" ON leaderboard.account_remark_counts USING btree (value);
CREATE INDEX "0x6effab7bf55318c0" ON leaderboard.farmer_block_total_values USING btree (created_at);
CREATE INDEX "0x719e87ef859d46f9" ON leaderboard.account_extrinsic_total_count_histories USING gist (value, _block_range);
CREATE INDEX "0x73606d69a16a51ed" ON leaderboard.farmer_vote_and_block_total_counts USING btree (rank);
CREATE INDEX "0x74444c6cbb827fed" ON leaderboard.account_extrinsic_failed_total_counts USING btree (rank);
CREATE INDEX "0x759f7e295510308d" ON leaderboard.operator_deposits_total_count_histories USING gist (value, _block_range);
CREATE INDEX "0x75d5f56abf048ee1" ON leaderboard.account_remark_count_histories USING gist (value, _block_range);
CREATE INDEX "0x77f1b742d319402c" ON leaderboard.account_transaction_fee_paid_total_values USING btree (created_at);
CREATE INDEX "0x7aa3904a7d3a4563" ON leaderboard.farmer_block_total_count_histories USING gist (account_id, _block_range);
CREATE INDEX "0x7c0e839f35282376" ON leaderboard.farmer_block_total_counts USING btree (created_at);
CREATE INDEX "0x7c584a4083105781" ON leaderboard.farmer_block_total_values USING btree (value);
CREATE INDEX "0x7cdbfa16661f71ee" ON leaderboard.nominator_withdrawals_total_counts USING btree (value);
CREATE INDEX "0x7ef3b9aa555b5a05" ON leaderboard.account_transfer_receiver_total_values USING btree (value);
CREATE INDEX "0x804628cadf8ddb42" ON leaderboard.farmer_block_total_value_histories USING gist (value, _block_range);
CREATE INDEX "0x809a1540a47b34f1" ON leaderboard.account_remark_count_histories USING gist (account_id, _block_range);
CREATE INDEX "0x82f033a6c175eddd" ON leaderboard.farmer_vote_and_block_total_values USING btree (value);
CREATE INDEX "0x82fe14c738066801" ON leaderboard.account_transfer_sender_total_values USING btree (created_at);
CREATE INDEX "0x83d0481ecdfe1e3c" ON leaderboard.operator_total_tax_collected_histories USING gist (account_id, _block_range);
CREATE INDEX "0x8463b2f12b68a67c" ON leaderboard.operator_withdrawals_total_count_histories USING gist (value, _block_range);
CREATE INDEX "0x84d750e3c36ee4ab" ON leaderboard.operator_total_tax_collecteds USING btree (updated_at);
CREATE INDEX "0x865a7a78cd9957e1" ON leaderboard.account_transaction_fee_paid_total_value_histories USING btree (id);
CREATE INDEX "0x87379ebd9abb3c9f" ON leaderboard.account_extrinsic_total_counts USING btree (created_at);
CREATE INDEX "0x878e2eb4c7464f91" ON leaderboard.farmer_block_total_value_histories USING gist (block_height, _block_range);
CREATE INDEX "0x882daca0abfba2b8" ON leaderboard.account_extrinsic_success_total_count_histories USING gist (block_height, _block_range);
CREATE INDEX "0x8b7c68617ff4e62b" ON leaderboard.operator_deposits_total_value_histories USING btree (id);
CREATE INDEX "0x8ba1fd011d0120e6" ON leaderboard.account_remark_counts USING btree (updated_at);
CREATE INDEX "0x8c12fe09c9fbcd4f" ON leaderboard.farmer_block_total_count_histories USING btree (id);
CREATE INDEX "0x8c4adce4e421c71f" ON leaderboard.operator_withdrawals_total_count_histories USING gist (account_id, _block_range);
CREATE INDEX "0x8d7008ea364cf94c" ON leaderboard.account_transfer_sender_total_count_histories USING btree (id);
CREATE INDEX "0x8fa61e629a2dcd38" ON leaderboard.account_transfer_receiver_total_value_histories USING btree (id);
CREATE INDEX "0x901aff3934f41bd9" ON leaderboard.farmer_vote_total_counts USING btree (updated_at);
CREATE INDEX "0x9100c4535abd1ba4" ON leaderboard.farmer_vote_and_block_total_count_histories USING gist (block_height, _block_range);
CREATE INDEX "0x94d8701298d99d82" ON leaderboard.account_extrinsic_total_count_histories USING gist (account_id, _block_range);
CREATE INDEX "0x957df7861716b7e5" ON leaderboard.nominator_deposits_total_count_histories USING btree (id);
CREATE INDEX "0x958866172e237c5c" ON leaderboard.operator_total_rewards_collecteds USING btree (updated_at);
CREATE INDEX "0x964d1cdad7a5330f" ON leaderboard.farmer_vote_total_count_histories USING gist (value, _block_range);
CREATE INDEX "0x97633453dae86d22" ON leaderboard.account_transfer_receiver_total_value_histories USING gist (block_height, _block_range);
CREATE INDEX "0x979a3db4e9e7c431" ON leaderboard.account_extrinsic_failed_total_count_histories USING gist (value, _block_range);
CREATE INDEX "0x97d32cd19e3802db" ON leaderboard.farmer_block_total_values USING btree (rank);
CREATE INDEX "0x99d0f21c8605c41c" ON leaderboard.account_transfer_sender_total_counts USING btree (value);
CREATE INDEX "0x9b42c9f7087cc0dd" ON leaderboard.account_transfer_receiver_total_count_histories USING btree (id);
CREATE INDEX "0x9cd9957f6e6b9cf4" ON leaderboard.account_extrinsic_total_count_histories USING btree (id);
CREATE INDEX "0x9f3af39f22aac290" ON leaderboard.farmer_vote_and_block_total_count_histories USING btree (id);
CREATE INDEX "0x9fc7939319b88d37" ON leaderboard.nominator_deposits_total_counts USING btree (value);
CREATE INDEX "0xa035d5be2ef2e7ff" ON leaderboard.nominator_deposits_total_values USING btree (value);
CREATE INDEX "0xa0371f05d6ab705d" ON leaderboard.farmer_vote_total_values USING btree (created_at);
CREATE INDEX "0xa03f24a9dfd38cdc" ON leaderboard.farmer_vote_total_values USING btree (value);
CREATE INDEX "0xa0e359a56914557a" ON leaderboard.account_extrinsic_failed_total_count_histories USING gist (block_height, _block_range);
CREATE INDEX "0xa6e9645812acf3c5" ON leaderboard.operator_withdrawals_total_counts USING btree (updated_at);
CREATE INDEX "0xa8876002594fb3d9" ON leaderboard.account_transfer_sender_total_value_histories USING gist (account_id, _block_range);
CREATE INDEX "0xa8fab7e0a0c35981" ON leaderboard.account_transfer_receiver_total_count_histories USING gist (block_height, _block_range);
CREATE INDEX "0xab244f4097d5b7de" ON leaderboard.account_transfer_receiver_total_counts USING btree (value);
CREATE INDEX "0xab389403bd29540d" ON leaderboard.operator_total_rewards_collecteds USING btree (rank);
CREATE INDEX "0xab879a58ac57bb2e" ON leaderboard.account_remark_count_histories USING btree (id);
CREATE INDEX "0xac1bf85d692ba008" ON leaderboard.account_transfer_sender_total_values USING btree (rank);
CREATE INDEX "0xac5a3d6fd52e2eba" ON leaderboard.farmer_vote_and_block_total_values USING btree (rank);
CREATE INDEX "0xacea6ba8b4475b52" ON leaderboard.operator_total_tax_collected_histories USING gist (value, _block_range);
CREATE INDEX "0xb025aed07cf0497b" ON leaderboard.account_extrinsic_success_total_count_histories USING gist (account_id, _block_range);
CREATE INDEX "0xb06359b1f82d8bc4" ON leaderboard.farmer_block_total_count_histories USING gist (block_height, _block_range);
CREATE INDEX "0xb169b4f6e59a38fb" ON leaderboard.account_transfer_sender_total_count_histories USING gist (account_id, _block_range);
CREATE INDEX "0xb1b17d21f13d1630" ON leaderboard.account_extrinsic_failed_total_count_histories USING gist (account_id, _block_range);
CREATE INDEX "0xb1d45dae81251f24" ON leaderboard.account_transfer_receiver_total_count_histories USING gist (value, _block_range);
CREATE INDEX "0xb65383ff3975f7d0" ON leaderboard.nominator_withdrawals_total_counts USING btree (rank);
CREATE INDEX "0xb657787497a56866" ON leaderboard.operator_bundle_total_count_histories USING gist (account_id, _block_range);
CREATE INDEX "0xb685fea77550c4ba" ON leaderboard.account_transaction_fee_paid_total_value_histories USING gist (block_height, _block_range);
CREATE INDEX "0xb8c311b80e4878cf" ON leaderboard.operator_total_tax_collecteds USING btree (value);
CREATE INDEX "0xb8c3a00bbda58dd1" ON leaderboard.operator_deposits_total_count_histories USING gist (account_id, _block_range);
CREATE INDEX "0xb9c1f66664e1525c" ON leaderboard.account_extrinsic_success_total_counts USING btree (rank);
CREATE INDEX "0xba6d7a768cf0f48a" ON leaderboard.account_extrinsic_success_total_counts USING btree (value);
CREATE INDEX "0xba8274c63f512a6c" ON leaderboard.operator_withdrawals_total_count_histories USING gist (block_height, _block_range);
CREATE INDEX "0xbb772bc16a6f55fa" ON leaderboard.account_extrinsic_total_counts USING btree (rank);
CREATE INDEX "0xbd7d3688774132d9" ON leaderboard.account_extrinsic_total_count_histories USING gist (block_height, _block_range);
CREATE INDEX "0xbd9aadf5a0a985b6" ON leaderboard.farmer_block_total_count_histories USING gist (value, _block_range);
CREATE INDEX "0xc18397609d2e50fc" ON leaderboard.nominator_withdrawals_total_count_histories USING btree (id);
CREATE INDEX "0xc26c8c9093762044" ON leaderboard.nominator_deposits_total_value_histories USING btree (id);
CREATE INDEX "0xc2d1db0e1993ab6d" ON leaderboard.farmer_vote_total_value_histories USING gist (block_height, _block_range);
CREATE INDEX "0xc2d78cc1bc2d4d1d" ON leaderboard.operator_bundle_total_counts USING btree (created_at);
CREATE INDEX "0xc39dcd4a26cdd42d" ON leaderboard.operator_total_tax_collected_histories USING gist (block_height, _block_range);
CREATE INDEX "0xc62ca597010fa42d" ON leaderboard.operator_deposits_total_counts USING btree (rank);
CREATE INDEX "0xc660a8aa2ffa9c5a" ON leaderboard.farmer_vote_and_block_total_value_histories USING btree (id);
CREATE INDEX "0xc777a0fed62b8863" ON leaderboard.account_extrinsic_success_total_counts USING btree (updated_at);
CREATE INDEX "0xc859dbf1a9895777" ON leaderboard.nominator_deposits_total_counts USING btree (created_at);
CREATE INDEX "0xc88f7e95a1a80085" ON leaderboard.farmer_vote_and_block_total_counts USING btree (value);
CREATE INDEX "0xc9823b43f2d5fc8e" ON leaderboard.operator_bundle_total_count_histories USING btree (id);
CREATE INDEX "0xc9ad4369f9204059" ON leaderboard.account_extrinsic_success_total_counts USING btree (created_at);
CREATE INDEX "0xcae5a2492334afca" ON leaderboard.farmer_vote_total_count_histories USING gist (block_height, _block_range);
CREATE INDEX "0xcb0aa6b763df69f6" ON leaderboard.operator_deposits_total_values USING btree (updated_at);
CREATE INDEX "0xcb5285231d73e9cc" ON leaderboard.nominator_withdrawals_total_count_histories USING gist (block_height, _block_range);
CREATE INDEX "0xcc867b5b6030777d" ON leaderboard.account_transfer_sender_total_count_histories USING gist (block_height, _block_range);
CREATE INDEX "0xd1ed11b719eccd00" ON leaderboard.farmer_vote_total_values USING btree (updated_at);
CREATE INDEX "0xd2beaf5abcec6d67" ON leaderboard.operator_deposits_total_values USING btree (rank);
CREATE INDEX "0xd33f0389b2788b66" ON leaderboard.farmer_vote_and_block_total_value_histories USING gist (account_id, _block_range);
CREATE INDEX "0xd74476f68a157f82" ON leaderboard.account_transaction_fee_paid_total_values USING btree (rank);
CREATE INDEX "0xd8e7a933c1384413" ON leaderboard.account_extrinsic_failed_total_counts USING btree (value);
CREATE INDEX "0xda2d0c5abd8f415c" ON leaderboard.operator_total_tax_collected_histories USING btree (id);
CREATE INDEX "0xdb955231fab08930" ON leaderboard.account_extrinsic_total_counts USING btree (value);
CREATE INDEX "0xdbb2243b8d9f31b1" ON leaderboard.account_extrinsic_failed_total_counts USING btree (updated_at);
CREATE INDEX "0xdc3838f306829259" ON leaderboard.account_extrinsic_success_total_count_histories USING btree (id);
CREATE INDEX "0xde3fa7f872aada9f" ON leaderboard.account_transfer_sender_total_value_histories USING btree (id);
CREATE INDEX "0xe15c940bb687f7d3" ON leaderboard.nominator_deposits_total_count_histories USING gist (value, _block_range);
CREATE INDEX "0xe1c823abc112d3fb" ON leaderboard.farmer_vote_total_count_histories USING gist (account_id, _block_range);
CREATE INDEX "0xe3fc37f3b8d89c8d" ON leaderboard.operator_total_rewards_collecteds USING btree (created_at);
CREATE INDEX "0xe7b4f365c3b44d42" ON leaderboard.operator_deposits_total_value_histories USING gist (account_id, _block_range);
CREATE INDEX "0xe8f087b3187060f5" ON leaderboard.farmer_vote_total_counts USING btree (created_at);
CREATE INDEX "0xea4fb11415169d44" ON leaderboard.farmer_block_total_counts USING btree (updated_at);
CREATE INDEX "0xed196db1fdf8e1ba" ON leaderboard.nominator_deposits_total_counts USING btree (updated_at);
CREATE INDEX "0xed89d2ba5685cb9f" ON leaderboard.account_transfer_sender_total_counts USING btree (rank);
CREATE INDEX "0xefc871c495be2e8b" ON leaderboard.nominator_withdrawals_total_counts USING btree (updated_at);
CREATE INDEX "0xf08c870c8311438f" ON leaderboard.operator_withdrawals_total_counts USING btree (created_at);
CREATE INDEX "0xf37e3b354eac5a6e" ON leaderboard.operator_withdrawals_total_counts USING btree (value);
CREATE INDEX "0xf3b812b4322af338" ON leaderboard.farmer_block_total_values USING btree (updated_at);
CREATE INDEX "0xf3ee1a0c9ddee938" ON leaderboard.account_transfer_receiver_total_counts USING btree (rank);
CREATE INDEX "0xf44d2de87975dc53" ON leaderboard.operator_deposits_total_value_histories USING gist (block_height, _block_range);
CREATE INDEX "0xf458f461b30a6b5e" ON leaderboard.account_extrinsic_failed_total_count_histories USING btree (id);
CREATE INDEX "0xf59765eb34448af2" ON leaderboard.account_transaction_fee_paid_total_values USING btree (updated_at);
CREATE INDEX "0xf69f639e813865ed" ON leaderboard.nominator_withdrawals_total_count_histories USING gist (value, _block_range);
CREATE INDEX "0xf8a25fbf0822721a" ON leaderboard.account_remark_counts USING btree (rank);
CREATE INDEX "0xf8b032ae97b931bd" ON leaderboard.operator_deposits_total_counts USING btree (updated_at);
CREATE INDEX "0xf8f1f913b372d0d0" ON leaderboard.operator_bundle_total_count_histories USING gist (block_height, _block_range);
CREATE INDEX "0xfb5c0413cc0c1767" ON leaderboard.account_transaction_fee_paid_total_value_histories USING gist (value, _block_range);
CREATE INDEX "0xfe4c85f6ab059ff1" ON leaderboard.account_transfer_sender_total_values USING btree (updated_at);


CREATE INDEX "0x00f6efe66d5d9d4b" ON files.folder_cids USING gist (parent_cid, _block_range);
CREATE INDEX "0x1186578888875727" ON files.folders USING btree (id);
CREATE INDEX "0x185e07c7841a6dec" ON files.cids USING gist (index_in_block, _block_range);
CREATE INDEX "0x26cca3ab330636d4" ON files.errors USING gist (extrinsic_id, _block_range);
CREATE INDEX "0x2fa5ea8997a9cfbb" ON files.folders USING gist (size, _block_range);
CREATE INDEX "0x4147f581f3ac3528" ON files.errors USING gist (block_height, _block_range);
CREATE INDEX "0x502ec8806f8b7919" ON files.metadata_cids USING gist (child_cid, _block_range);
CREATE INDEX "0x5b859e4ba2caa1d1" ON files.errors USING gist (block_hash, _block_range);
CREATE INDEX "0x5b8e8c6c7142b6fe" ON files.folders USING gist (name, _block_range);
CREATE INDEX "0x629ecee3da47a1a9" ON files.files USING gist (name, _block_range);
CREATE INDEX "0x6686ba2951b7a1f6" ON files.chunks USING gist (type, _block_range);
CREATE INDEX "0x68de2b24ed2b1879" ON files.errors USING btree (id);
CREATE INDEX "0x819c48bfe0942f4e" ON files.folder_cids USING gist (child_cid, _block_range);
CREATE INDEX "0x83c5e6b85c04a30c" ON files.metadata USING gist (size, _block_range);
CREATE INDEX "0x96d565fe5d3542a2" ON files.files USING gist (size, _block_range);
CREATE INDEX "0x9831414911f0da25" ON files.files USING btree (id);
CREATE INDEX "0x9c61d5e7fb607d2e" ON files.chunks USING gist (link_depth, _block_range);
CREATE INDEX "0xa00ebe7be447c522" ON files.metadata USING btree (id);
CREATE INDEX "0xa3797e4a72bc856b" ON files.errors USING gist (index_in_block, _block_range);
CREATE INDEX "0xb9cc03b31f220c6d" ON files.metadata USING gist (name, _block_range);
CREATE INDEX "0xbc15364ae9a53d9c" ON files.file_cids USING gist (parent_cid, _block_range);
CREATE INDEX "0xbe263939d485aba8" ON files.cids USING gist (extrinsic_hash, _block_range);
CREATE INDEX "0xc48b083269566769" ON files.file_cids USING btree (id);
CREATE INDEX "0xc5d1e5c6e0051575" ON files.cids USING gist (block_hash, _block_range);
CREATE INDEX "0xc822e1f44430d2bc" ON files.metadata_cids USING btree (id);
CREATE INDEX "0xccac01036eaae648" ON files.file_cids USING gist (child_cid, _block_range);
CREATE INDEX "0xd098303e427172ef" ON files.cids USING btree (id);
CREATE INDEX "0xd1b1af4da1d132b6" ON files.cids USING gist (extrinsic_id, _block_range);
CREATE INDEX "0xd3342c3c09c7b166" ON files.cids USING gist ("timestamp", _block_range);
CREATE INDEX "0xd5509466634aea27" ON files.chunks USING btree (id);
CREATE INDEX "0xd9be8718ef6c7984" ON files.folder_cids USING btree (id);
CREATE INDEX "0xe5ab49f2f0feaea4" ON files.metadata_cids USING gist (parent_cid, _block_range);
CREATE INDEX "0xf35ca9af71dbb0c3" ON files.errors USING gist ("timestamp", _block_range);
CREATE INDEX "0xfb3d6c3cc6f62464" ON files.errors USING gist (extrinsic_hash, _block_range);
CREATE INDEX "0xfd58bdf5823b2229" ON files.cids USING gist (block_height, _block_range);


CREATE TRIGGER "0x648269cc35867c16" AFTER UPDATE ON consensus._metadata FOR EACH ROW WHEN (((new.key)::text = 'schemaMigrationCount'::text)) EXECUTE FUNCTION consensus.schema_notification();
CREATE TRIGGER "0xda8a29b0fa478533" AFTER UPDATE ON dictionary._metadata FOR EACH ROW WHEN (((new.key)::text = 'schemaMigrationCount'::text)) EXECUTE FUNCTION dictionary.schema_notification();
CREATE TRIGGER "0xf3241711d3af6c36" AFTER UPDATE ON leaderboard._metadata FOR EACH ROW WHEN (((new.key)::text = 'schemaMigrationCount'::text)) EXECUTE FUNCTION leaderboard.schema_notification();
CREATE TRIGGER "0x22152f0c663c5f9e" AFTER UPDATE ON files._metadata FOR EACH ROW WHEN (((new.key)::text = 'schemaMigrationCount'::text)) EXECUTE FUNCTION files.schema_notification();

CREATE FUNCTION consensus.insert_log_kind() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
  BEGIN
    INSERT INTO consensus.log_kinds (id, kind)
    VALUES (NEW.kind, NEW.kind)
    ON CONFLICT (id) DO NOTHING;
    
    RETURN NEW;
  END;
  $$;
ALTER FUNCTION consensus.insert_log_kind() OWNER TO postgres;

CREATE TRIGGER ensure_log_kind
    BEFORE INSERT ON consensus.logs
    FOR EACH ROW
    EXECUTE FUNCTION consensus.insert_log_kind();

CREATE FUNCTION consensus.insert_event_module() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
  BEGIN
    INSERT INTO consensus.event_modules (id, section, method)
    VALUES (NEW.name, NEW.section, NEW.module)
    ON CONFLICT (id) DO NOTHING;
    
    RETURN NEW;
  END;
  $$;
ALTER FUNCTION consensus.insert_event_module() OWNER TO postgres;

CREATE TRIGGER ensure_event_module
    BEFORE INSERT ON consensus.events
    FOR EACH ROW
    EXECUTE FUNCTION consensus.insert_event_module();

CREATE FUNCTION consensus.insert_extrinsic_module() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
  BEGIN
    INSERT INTO consensus.extrinsic_modules (id, section, method)
    VALUES (NEW.name, NEW.section, NEW.name)
    ON CONFLICT (id) DO NOTHING;
    
    RETURN NEW;
  END;
  $$;
ALTER FUNCTION consensus.insert_extrinsic_module() OWNER TO postgres;

CREATE TRIGGER ensure_extrinsic_module
    BEFORE INSERT ON consensus.extrinsics
    FOR EACH ROW
    EXECUTE FUNCTION consensus.insert_extrinsic_module();

CREATE FUNCTION consensus.insert_section() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
  BEGIN
    INSERT INTO consensus.sections (id, section)
    VALUES (NEW.section, NEW.section)
    ON CONFLICT (id) DO NOTHING;
    
    RETURN NEW;
  END;
  $$;
ALTER FUNCTION consensus.insert_section() OWNER TO postgres;

CREATE TRIGGER ensure_extrinsic_section
    BEFORE INSERT ON consensus.extrinsics
    FOR EACH ROW
    EXECUTE FUNCTION consensus.insert_section();

CREATE TRIGGER ensure_event_section
    BEFORE INSERT ON consensus.events
    FOR EACH ROW
    EXECUTE FUNCTION consensus.insert_section();

CREATE FUNCTION consensus.update_account() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
  BEGIN
    INSERT INTO consensus.accounts (
      id,
      nonce,
      free,
      reserved,
      total,
      created_at,
      updated_at
    )
    VALUES (
      NEW.id,
      NEW.nonce,
      NEW.free,
      NEW.reserved,
      NEW.total,
      NEW.created_at,
      EXTRACT(EPOCH FROM NOW())
    )
    ON CONFLICT (id) DO UPDATE SET
      nonce = EXCLUDED.nonce,
      free = EXCLUDED.free,
      reserved = EXCLUDED.reserved,
      total = EXCLUDED.total,
      updated_at = EXTRACT(EPOCH FROM NOW());
    
    RETURN NEW;
  END;
  $$;
ALTER FUNCTION consensus.update_account() OWNER TO postgres;

CREATE TRIGGER ensure_account_updated
    BEFORE INSERT ON consensus.account_histories
    FOR EACH ROW
    EXECUTE FUNCTION consensus.update_account();

CREATE FUNCTION consensus.update_cumulative_blocks() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
  DECLARE
    prev_cumulative consensus.cumulative_blocks%ROWTYPE;
  BEGIN
    SELECT *
    INTO prev_cumulative
    FROM consensus.cumulative_blocks
    WHERE id = text(NEW.height - 1);

    IF prev_cumulative IS NULL THEN
      prev_cumulative.cumulative_extrinsics_count := 0;
      prev_cumulative.cumulative_events_count := 0;
      prev_cumulative.cumulative_transfers_count := 0;
      prev_cumulative.cumulative_rewards_count := 0;
      prev_cumulative.cumulative_block_rewards_count := 0;
      prev_cumulative.cumulative_vote_rewards_count := 0;
      prev_cumulative.cumulative_transfer_value := 0;
      prev_cumulative.cumulative_reward_value := 0;
      prev_cumulative.cumulative_block_reward_value := 0;
      prev_cumulative.cumulative_vote_reward_value := 0;
    END IF;

    INSERT INTO consensus.cumulative_blocks (
      id,
      cumulative_extrinsics_count,
      cumulative_events_count,
      cumulative_transfers_count,
      cumulative_rewards_count,
      cumulative_block_rewards_count,
      cumulative_vote_rewards_count,
      cumulative_transfer_value,
      cumulative_reward_value,
      cumulative_block_reward_value,
      cumulative_vote_reward_value
    )
    VALUES (
      NEW.id,
      prev_cumulative.cumulative_extrinsics_count + NEW.extrinsics_count,
      prev_cumulative.cumulative_events_count + NEW.events_count,
      prev_cumulative.cumulative_transfers_count + NEW.transfers_count,
      prev_cumulative.cumulative_rewards_count + NEW.rewards_count,
      prev_cumulative.cumulative_block_rewards_count + NEW.block_rewards_count,
      prev_cumulative.cumulative_vote_rewards_count + NEW.vote_rewards_count,
      prev_cumulative.cumulative_transfer_value + NEW.transfer_value,
      prev_cumulative.cumulative_reward_value + NEW.reward_value,
      prev_cumulative.cumulative_block_reward_value + NEW.block_reward_value,
      prev_cumulative.cumulative_vote_reward_value + NEW.vote_reward_value
    )
    ON CONFLICT (id) DO UPDATE SET
      cumulative_extrinsics_count = prev_cumulative.cumulative_extrinsics_count + NEW.extrinsics_count,
      cumulative_events_count = prev_cumulative.cumulative_events_count + NEW.events_count,
      cumulative_transfers_count = prev_cumulative.cumulative_transfers_count + NEW.transfers_count,
      cumulative_rewards_count = prev_cumulative.cumulative_rewards_count + NEW.rewards_count,
      cumulative_block_rewards_count = prev_cumulative.cumulative_block_rewards_count + NEW.block_rewards_count,
      cumulative_vote_rewards_count = prev_cumulative.cumulative_vote_rewards_count + NEW.vote_rewards_count,
      cumulative_transfer_value = prev_cumulative.cumulative_transfer_value + NEW.transfer_value,
      cumulative_reward_value = prev_cumulative.cumulative_reward_value + NEW.reward_value,
      cumulative_block_reward_value = prev_cumulative.cumulative_block_reward_value + NEW.block_reward_value,
      cumulative_vote_reward_value = prev_cumulative.cumulative_vote_reward_value + NEW.vote_reward_value;

    RETURN NEW;
  END;
  $$;
ALTER FUNCTION consensus.update_cumulative_blocks() OWNER TO postgres;

CREATE TRIGGER ensure_cumulative_blocks
    BEFORE INSERT ON consensus.blocks
    FOR EACH ROW
    EXECUTE FUNCTION consensus.update_cumulative_blocks();