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

CREATE SCHEMA staking;
ALTER SCHEMA staking OWNER TO postgres;

CREATE SCHEMA domain_auto_evm;
ALTER SCHEMA domain_auto_evm OWNER TO postgres;

CREATE SCHEMA users;
ALTER SCHEMA users OWNER TO postgres;

CREATE SCHEMA stats;
ALTER SCHEMA stats OWNER TO postgres;

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

CREATE FUNCTION staking.schema_notification() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
  BEGIN
    PERFORM pg_notify(
            '0x0e7ff8012c52fcca',
            'schema_updated');
    RETURN NULL;
  END;
  $$;
ALTER FUNCTION staking.schema_notification() OWNER TO postgres;

CREATE FUNCTION domain_auto_evm.schema_notification() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
  BEGIN
    PERFORM pg_notify(
            '0x49b290e816da6f48',
            'schema_updated');
    RETURN NULL;
  END;
  $$;


ALTER FUNCTION domain_auto_evm.schema_notification() OWNER TO postgres;

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

CREATE TABLE staking._metadata (
    key character varying(255) NOT NULL,
    value jsonb,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
ALTER TABLE staking._metadata OWNER TO postgres;

CREATE TABLE domain_auto_evm._metadata (
    key character varying(255) NOT NULL,
    value jsonb,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
ALTER TABLE domain_auto_evm._metadata OWNER TO postgres;

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
    address TEXT NOT NULL,
    type TEXT NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone
);
ALTER TABLE users.wallets OWNER TO postgres;
ALTER TABLE ONLY users.wallets ADD CONSTRAINT wallets_pkey PRIMARY KEY (id);
ALTER TABLE ONLY users.wallets ADD CONSTRAINT address_key UNIQUE (address);

CREATE TABLE consensus.account_histories (
    id TEXT NOT NULL,
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
    id TEXT NOT NULL,
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
    id TEXT NOT NULL,
    nonce NUMERIC NOT NULL,
    free NUMERIC NOT NULL,
    reserved NUMERIC NOT NULL,
    total NUMERIC,
    created_at NUMERIC NOT NULL,
    updated_at NUMERIC NOT NULL
);
ALTER TABLE consensus.accounts OWNER TO postgres;

CREATE TABLE consensus.blocks (
    id TEXT NOT NULL,
    sort_id TEXT NOT NULL,
    height NUMERIC NOT NULL,
    hash TEXT NOT NULL,
    "timestamp" TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    parent_hash TEXT NOT NULL,
    spec_id TEXT NOT NULL,
    state_root TEXT NOT NULL,
    extrinsics_root TEXT NOT NULL,
    space_pledged NUMERIC NOT NULL,
    blockchain_size NUMERIC NOT NULL,
    extrinsics_count INTEGER NOT NULL,
    events_count INTEGER NOT NULL,
    logs_count INTEGER NOT NULL,
    transfers_count INTEGER NOT NULL,
    rewards_count INTEGER NOT NULL,
    block_rewards_count INTEGER NOT NULL,
    vote_rewards_count INTEGER NOT NULL,
    transfer_value NUMERIC NOT NULL,
    reward_value NUMERIC NOT NULL,
    block_reward_value NUMERIC NOT NULL,
    vote_reward_value NUMERIC NOT NULL,
    author_id TEXT NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE consensus.blocks OWNER TO postgres;

CREATE TABLE consensus.cumulative_blocks (
    id TEXT NOT NULL,
    cumulative_extrinsics_count NUMERIC NOT NULL,
    cumulative_events_count NUMERIC NOT NULL,
    cumulative_logs_count NUMERIC NOT NULL,
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
    id TEXT NOT NULL,
    section TEXT NOT NULL,
    method TEXT NOT NULL
);
ALTER TABLE consensus.event_modules OWNER TO postgres;

CREATE TABLE consensus.events (
    id TEXT NOT NULL,
    sort_id TEXT NOT NULL,
    block_height NUMERIC NOT NULL,
    block_hash TEXT NOT NULL,
    extrinsic_id TEXT NOT NULL,
    extrinsic_hash TEXT NOT NULL,
    section TEXT NOT NULL,
    module TEXT NOT NULL,
    name TEXT NOT NULL,
    index_in_block NUMERIC NOT NULL,
    "timestamp" TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    phase TEXT NOT NULL,
    pos INTEGER NOT NULL,
    args JSONB NOT NULL,
    cid TEXT,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE consensus.events OWNER TO postgres;

CREATE TABLE consensus.extrinsic_modules (
    id TEXT NOT NULL,
    section TEXT NOT NULL,
    method TEXT NOT NULL
);
ALTER TABLE consensus.extrinsic_modules OWNER TO postgres;

CREATE TABLE consensus.extrinsics (
    id TEXT NOT NULL,
    sort_id TEXT NOT NULL,
    hash TEXT NOT NULL,
    block_height numeric NOT NULL,
    block_hash TEXT NOT NULL,
    section TEXT NOT NULL,
    module TEXT NOT NULL,
    name TEXT NOT NULL,
    index_in_block INTEGER NOT NULL,
    success BOOLEAN NOT NULL,
    "timestamp" TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    nonce NUMERIC NOT NULL,
    signer TEXT NOT NULL,
    signature TEXT NOT NULL,
    events_count INTEGER NOT NULL,
    args JSONB NOT NULL,
    error TEXT NOT NULL,
    tip NUMERIC NOT NULL,
    fee NUMERIC NOT NULL,
    pos INTEGER NOT NULL,
    cid TEXT,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE consensus.extrinsics OWNER TO postgres;

CREATE TABLE consensus.log_kinds (
    id TEXT NOT NULL,
    kind TEXT NOT NULL
);
ALTER TABLE consensus.log_kinds OWNER TO postgres;

CREATE TABLE consensus.logs (
    id TEXT NOT NULL,
    sort_id TEXT NOT NULL,
    block_height NUMERIC NOT NULL,
    block_hash TEXT NOT NULL,
    index_in_block INTEGER NOT NULL,
    kind TEXT NOT NULL,
    value JSONB,
    "timestamp" TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE consensus.logs OWNER TO postgres;

CREATE TABLE consensus.rewards (
    id TEXT NOT NULL,
    block_height NUMERIC NOT NULL,
    block_hash TEXT NOT NULL,
    extrinsic_id TEXT NOT NULL,
    event_id TEXT NOT NULL,
    account_id TEXT NOT NULL,
    reward_type TEXT NOT NULL,
    amount NUMERIC NOT NULL,
    "timestamp" TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE consensus.rewards OWNER TO postgres;

CREATE TABLE consensus.sections (
    id TEXT NOT NULL,
    section TEXT NOT NULL
);
ALTER TABLE consensus.sections OWNER TO postgres;

CREATE TABLE consensus.transfers (
    id TEXT NOT NULL,
    block_height NUMERIC NOT NULL,
    block_hash TEXT NOT NULL,
    extrinsic_id TEXT NOT NULL,
    event_id TEXT NOT NULL,
    "from" TEXT NOT NULL,
    from_chain TEXT NOT NULL,
    "to" TEXT NOT NULL,
    to_chain TEXT NOT NULL,
    value NUMERIC NOT NULL,
    fee NUMERIC NOT NULL,
    success BOOLEAN NOT NULL,
    "timestamp" TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE consensus.transfers OWNER TO postgres;

CREATE TABLE dictionary.events (
    id TEXT NOT NULL,
    module TEXT NOT NULL,
    event TEXT NOT NULL,
    block_height NUMERIC NOT NULL
);
ALTER TABLE dictionary.events OWNER TO postgres;

CREATE TABLE dictionary.extrinsics (
    id TEXT NOT NULL,
    tx_hash TEXT NOT NULL,
    module TEXT NOT NULL,
    call TEXT NOT NULL,
    block_height NUMERIC NOT NULL,
    success BOOLEAN NOT NULL,
    is_signed BOOLEAN NOT NULL
);
ALTER TABLE dictionary.extrinsics OWNER TO postgres;

CREATE TABLE dictionary.spec_versions (
    id TEXT NOT NULL,
    block_height NUMERIC NOT NULL
);
ALTER TABLE dictionary.spec_versions OWNER TO postgres;

CREATE TABLE leaderboard.account_extrinsic_failed_total_count_histories (
    id TEXT NOT NULL,
    account_id TEXT NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    block_height NUMERIC NOT NULL,
    extrinsic_id TEXT NOT NULL,
    event_id TEXT NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE leaderboard.account_extrinsic_failed_total_count_histories OWNER TO postgres;

CREATE TABLE leaderboard.account_extrinsic_failed_total_counts (
    id TEXT NOT NULL,
    rank INTEGER NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
);
ALTER TABLE leaderboard.account_extrinsic_failed_total_counts OWNER TO postgres;

CREATE TABLE leaderboard.account_extrinsic_success_total_count_histories (
    id TEXT NOT NULL,
    account_id TEXT NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    block_height NUMERIC NOT NULL,
    extrinsic_id TEXT NOT NULL,
    event_id TEXT NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE leaderboard.account_extrinsic_success_total_count_histories OWNER TO postgres;

CREATE TABLE leaderboard.account_extrinsic_success_total_counts (
    id TEXT NOT NULL,
    rank INTEGER NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
);
ALTER TABLE leaderboard.account_extrinsic_success_total_counts OWNER TO postgres;

CREATE TABLE leaderboard.account_extrinsic_total_count_histories (
    id TEXT NOT NULL,
    account_id TEXT NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    block_height NUMERIC NOT NULL,
    extrinsic_id TEXT NOT NULL,
    event_id TEXT NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE leaderboard.account_extrinsic_total_count_histories OWNER TO postgres;

CREATE TABLE leaderboard.account_extrinsic_total_counts (
    id TEXT NOT NULL,
    rank INTEGER NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
);
ALTER TABLE leaderboard.account_extrinsic_total_counts OWNER TO postgres;

CREATE TABLE leaderboard.account_remark_count_histories (
    id TEXT NOT NULL,
    account_id TEXT NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    block_height NUMERIC NOT NULL,
    extrinsic_id TEXT NOT NULL,
    event_id TEXT NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE leaderboard.account_remark_count_histories OWNER TO postgres;

CREATE TABLE leaderboard.account_remark_counts (
    id TEXT NOT NULL,
    rank INTEGER NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
);
ALTER TABLE leaderboard.account_remark_counts OWNER TO postgres;

CREATE TABLE leaderboard.account_transaction_fee_paid_total_value_histories (
    id TEXT NOT NULL,
    account_id TEXT NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    block_height NUMERIC NOT NULL,
    extrinsic_id TEXT NOT NULL,
    event_id TEXT NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE leaderboard.account_transaction_fee_paid_total_value_histories OWNER TO postgres;

CREATE TABLE leaderboard.account_transaction_fee_paid_total_values (
    id TEXT NOT NULL,
    rank INTEGER NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
);
ALTER TABLE leaderboard.account_transaction_fee_paid_total_values OWNER TO postgres;

CREATE TABLE leaderboard.account_transfer_receiver_total_count_histories (
    id TEXT NOT NULL,
    account_id TEXT NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    block_height NUMERIC NOT NULL,
    extrinsic_id TEXT NOT NULL,
    event_id TEXT NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE leaderboard.account_transfer_receiver_total_count_histories OWNER TO postgres;

CREATE TABLE leaderboard.account_transfer_receiver_total_counts (
    id TEXT NOT NULL,
    rank INTEGER NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
);
ALTER TABLE leaderboard.account_transfer_receiver_total_counts OWNER TO postgres;

CREATE TABLE leaderboard.account_transfer_receiver_total_value_histories (
    id TEXT NOT NULL,
    account_id TEXT NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    block_height NUMERIC NOT NULL,
    extrinsic_id TEXT NOT NULL,
    event_id TEXT NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE leaderboard.account_transfer_receiver_total_value_histories OWNER TO postgres;

CREATE TABLE leaderboard.account_transfer_receiver_total_values (
    id TEXT NOT NULL,
    rank INTEGER NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
);
ALTER TABLE leaderboard.account_transfer_receiver_total_values OWNER TO postgres;

CREATE TABLE leaderboard.account_transfer_sender_total_count_histories (
    id TEXT NOT NULL,
    account_id TEXT NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    block_height NUMERIC NOT NULL,
    extrinsic_id TEXT NOT NULL,
    event_id TEXT NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE leaderboard.account_transfer_sender_total_count_histories OWNER TO postgres;

CREATE TABLE leaderboard.account_transfer_sender_total_counts (
    id TEXT NOT NULL,
    rank INTEGER NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
);
ALTER TABLE leaderboard.account_transfer_sender_total_counts OWNER TO postgres;

CREATE TABLE leaderboard.account_transfer_sender_total_value_histories (
    id TEXT NOT NULL,
    account_id TEXT NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    block_height NUMERIC NOT NULL,
    extrinsic_id TEXT NOT NULL,
    event_id TEXT NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE leaderboard.account_transfer_sender_total_value_histories OWNER TO postgres;

CREATE TABLE leaderboard.account_transfer_sender_total_values (
    id TEXT NOT NULL,
    rank INTEGER NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
);
ALTER TABLE leaderboard.account_transfer_sender_total_values OWNER TO postgres;

CREATE TABLE leaderboard.farmer_block_total_count_histories (
    id TEXT NOT NULL,
    account_id TEXT NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    block_height NUMERIC NOT NULL,
    extrinsic_id TEXT NOT NULL,
    event_id TEXT NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE leaderboard.farmer_block_total_count_histories OWNER TO postgres;

CREATE TABLE leaderboard.farmer_block_total_counts (
    id TEXT NOT NULL,
    rank INTEGER NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
);
ALTER TABLE leaderboard.farmer_block_total_counts OWNER TO postgres;

CREATE TABLE leaderboard.farmer_block_total_value_histories (
    id TEXT NOT NULL,
    account_id TEXT NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    block_height NUMERIC NOT NULL,
    extrinsic_id TEXT NOT NULL,
    event_id TEXT NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE leaderboard.farmer_block_total_value_histories OWNER TO postgres;

CREATE TABLE leaderboard.farmer_block_total_values (
    id TEXT NOT NULL,
    rank INTEGER NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
);
ALTER TABLE leaderboard.farmer_block_total_values OWNER TO postgres;

CREATE TABLE leaderboard.farmer_vote_and_block_total_count_histories (
    id TEXT NOT NULL,
    account_id TEXT NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    block_height NUMERIC NOT NULL,
    extrinsic_id TEXT NOT NULL,
    event_id TEXT NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE leaderboard.farmer_vote_and_block_total_count_histories OWNER TO postgres;

CREATE TABLE leaderboard.farmer_vote_and_block_total_counts (
    id TEXT NOT NULL,
    rank INTEGER NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
);
ALTER TABLE leaderboard.farmer_vote_and_block_total_counts OWNER TO postgres;

CREATE TABLE leaderboard.farmer_vote_and_block_total_value_histories (
    id TEXT NOT NULL,
    account_id TEXT NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    block_height NUMERIC NOT NULL,
    extrinsic_id TEXT NOT NULL,
    event_id TEXT NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE leaderboard.farmer_vote_and_block_total_value_histories OWNER TO postgres;

CREATE TABLE leaderboard.farmer_vote_and_block_total_values (
    id TEXT NOT NULL,
    rank INTEGER NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
);
ALTER TABLE leaderboard.farmer_vote_and_block_total_values OWNER TO postgres;

CREATE TABLE leaderboard.farmer_vote_total_count_histories (
    id TEXT NOT NULL,
    account_id TEXT NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    block_height NUMERIC NOT NULL,
    extrinsic_id TEXT NOT NULL,
    event_id TEXT NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE leaderboard.farmer_vote_total_count_histories OWNER TO postgres;

CREATE TABLE leaderboard.farmer_vote_total_counts (
    id TEXT NOT NULL,
    rank INTEGER NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
);
ALTER TABLE leaderboard.farmer_vote_total_counts OWNER TO postgres;

CREATE TABLE leaderboard.farmer_vote_total_value_histories (
    id TEXT NOT NULL,
    account_id TEXT NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    block_height NUMERIC NOT NULL,
    extrinsic_id TEXT NOT NULL,
    event_id TEXT NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE leaderboard.farmer_vote_total_value_histories OWNER TO postgres;

CREATE TABLE leaderboard.farmer_vote_total_values (
    id TEXT NOT NULL,
    rank INTEGER NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
);
ALTER TABLE leaderboard.farmer_vote_total_values OWNER TO postgres;

CREATE TABLE leaderboard.nominator_deposits_total_count_histories (
    id TEXT NOT NULL,
    account_id TEXT NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    block_height NUMERIC NOT NULL,
    extrinsic_id TEXT NOT NULL,
    event_id TEXT NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE leaderboard.nominator_deposits_total_count_histories OWNER TO postgres;

CREATE TABLE leaderboard.nominator_deposits_total_counts (
    id TEXT NOT NULL,
    rank INTEGER NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
);
ALTER TABLE leaderboard.nominator_deposits_total_counts OWNER TO postgres;

CREATE TABLE leaderboard.nominator_deposits_total_value_histories (
    id TEXT NOT NULL,
    account_id TEXT NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    block_height NUMERIC NOT NULL,
    extrinsic_id TEXT NOT NULL,
    event_id TEXT NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE leaderboard.nominator_deposits_total_value_histories OWNER TO postgres;

CREATE TABLE leaderboard.nominator_deposits_total_values (
    id TEXT NOT NULL,
    rank INTEGER NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
);
ALTER TABLE leaderboard.nominator_deposits_total_values OWNER TO postgres;

CREATE TABLE leaderboard.nominator_withdrawals_total_count_histories (
    id TEXT NOT NULL,
    account_id TEXT NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    block_height NUMERIC NOT NULL,
    extrinsic_id TEXT NOT NULL,
    event_id TEXT NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE leaderboard.nominator_withdrawals_total_count_histories OWNER TO postgres;

CREATE TABLE leaderboard.nominator_withdrawals_total_counts (
    id TEXT NOT NULL,
    rank INTEGER NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
);
ALTER TABLE leaderboard.nominator_withdrawals_total_counts OWNER TO postgres;

CREATE TABLE leaderboard.nominator_withdrawals_total_value_histories (
    id TEXT NOT NULL,
    account_id TEXT NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    block_height NUMERIC NOT NULL,
    extrinsic_id TEXT NOT NULL,
    event_id TEXT NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE leaderboard.nominator_withdrawals_total_value_histories OWNER TO postgres;

CREATE TABLE leaderboard.nominator_withdrawals_total_values (
    id TEXT NOT NULL,
    rank INTEGER NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
);
ALTER TABLE leaderboard.nominator_withdrawals_total_values OWNER TO postgres;

CREATE TABLE leaderboard.operator_bundle_total_count_histories (
    id TEXT NOT NULL,
    account_id TEXT NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    block_height NUMERIC NOT NULL,
    extrinsic_id TEXT NOT NULL,
    event_id TEXT NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE leaderboard.operator_bundle_total_count_histories OWNER TO postgres;

CREATE TABLE leaderboard.operator_bundle_total_counts (
    id TEXT NOT NULL,
    rank INTEGER NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
);
ALTER TABLE leaderboard.operator_bundle_total_counts OWNER TO postgres;

CREATE TABLE leaderboard.operator_deposits_total_count_histories (
    id TEXT NOT NULL,
    account_id TEXT NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    block_height NUMERIC NOT NULL,
    extrinsic_id TEXT NOT NULL,
    event_id TEXT NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE leaderboard.operator_deposits_total_count_histories OWNER TO postgres;

CREATE TABLE leaderboard.operator_deposits_total_counts (
    id TEXT NOT NULL,
    rank INTEGER NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
);
ALTER TABLE leaderboard.operator_deposits_total_counts OWNER TO postgres;

CREATE TABLE leaderboard.operator_deposits_total_value_histories (
    id TEXT NOT NULL,
    account_id TEXT NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    block_height NUMERIC NOT NULL,
    extrinsic_id TEXT NOT NULL,
    event_id TEXT NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE leaderboard.operator_deposits_total_value_histories OWNER TO postgres;

CREATE TABLE leaderboard.operator_deposits_total_values (
    id TEXT NOT NULL,
    rank INTEGER NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
);
ALTER TABLE leaderboard.operator_deposits_total_values OWNER TO postgres;

CREATE TABLE leaderboard.operator_total_rewards_collected_histories (
    id TEXT NOT NULL,
    account_id TEXT NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    block_height NUMERIC NOT NULL,
    extrinsic_id TEXT NOT NULL,
    event_id TEXT NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE leaderboard.operator_total_rewards_collected_histories OWNER TO postgres;

CREATE TABLE leaderboard.operator_total_rewards_collecteds (
    id TEXT NOT NULL,
    rank INTEGER NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
);
ALTER TABLE leaderboard.operator_total_rewards_collecteds OWNER TO postgres;

CREATE TABLE leaderboard.operator_total_tax_collected_histories (
    id TEXT NOT NULL,
    account_id TEXT NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    block_height NUMERIC NOT NULL,
    extrinsic_id TEXT NOT NULL,
    event_id TEXT NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE leaderboard.operator_total_tax_collected_histories OWNER TO postgres;

CREATE TABLE leaderboard.operator_total_tax_collecteds (
    id TEXT NOT NULL,
    rank INTEGER NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
);
ALTER TABLE leaderboard.operator_total_tax_collecteds OWNER TO postgres;

CREATE TABLE leaderboard.operator_withdrawals_total_count_histories (
    id TEXT NOT NULL,
    account_id TEXT NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    block_height NUMERIC NOT NULL,
    extrinsic_id TEXT NOT NULL,
    event_id TEXT NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE leaderboard.operator_withdrawals_total_count_histories OWNER TO postgres;

CREATE TABLE leaderboard.operator_withdrawals_total_counts (
    id TEXT NOT NULL,
    rank INTEGER NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
);
ALTER TABLE leaderboard.operator_withdrawals_total_counts OWNER TO postgres;

CREATE TABLE leaderboard.operator_withdrawals_total_value_histories (
    id TEXT NOT NULL,
    account_id TEXT NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    block_height NUMERIC NOT NULL,
    extrinsic_id TEXT NOT NULL,
    event_id TEXT NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE leaderboard.operator_withdrawals_total_value_histories OWNER TO postgres;

CREATE TABLE leaderboard.operator_withdrawals_total_values (
    id TEXT NOT NULL,
    rank INTEGER NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
);
ALTER TABLE leaderboard.operator_withdrawals_total_values OWNER TO postgres;

CREATE TABLE files.chunks (
    id TEXT NOT NULL,
    type TEXT NOT NULL,
    link_depth INTEGER NOT NULL,
    size NUMERIC,
    name TEXT,
    data TEXT,
    upload_options TEXT,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE files.chunks OWNER TO postgres;

CREATE TABLE files.cids (
    id TEXT NOT NULL,
    block_height NUMERIC NOT NULL,
    block_hash TEXT NOT NULL,
    extrinsic_id TEXT NOT NULL,
    extrinsic_hash TEXT NOT NULL,
    index_in_block INTEGER NOT NULL,
    links JSONB NOT NULL,
    blake3_hash TEXT NOT NULL,
    is_archived BOOLEAN NOT NULL,
    "timestamp" TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE files.cids OWNER TO postgres;

CREATE TABLE files.errors (
    id TEXT NOT NULL,
    block_height NUMERIC NOT NULL,
    block_hash TEXT NOT NULL,
    extrinsic_id TEXT NOT NULL,
    extrinsic_hash TEXT NOT NULL,
    index_in_block INTEGER NOT NULL,
    error TEXT NOT NULL,
    "timestamp" TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE files.errors OWNER TO postgres;

CREATE TABLE files.file_cids (
    id TEXT NOT NULL,
    parent_cid TEXT NOT NULL,
    child_cid TEXT NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE files.file_cids OWNER TO postgres;

CREATE TABLE files.files (
    id TEXT NOT NULL,
    sort_id TEXT NOT NULL,
    size NUMERIC NOT NULL,
    name TEXT,
    block_height NUMERIC NOT NULL,
    extrinsic_id TEXT NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE files.files OWNER TO postgres;

CREATE TABLE files.folder_cids (
    id TEXT NOT NULL,
    parent_cid TEXT NOT NULL,
    child_cid TEXT NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE files.folder_cids OWNER TO postgres;

CREATE TABLE files.folders (
    id TEXT NOT NULL,
    sort_id TEXT NOT NULL,
    size NUMERIC NOT NULL,
    name TEXT,
    block_height NUMERIC NOT NULL,
    extrinsic_id TEXT NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE files.folders OWNER TO postgres;

CREATE TABLE files.metadata (
    id TEXT NOT NULL,
    sort_id TEXT NOT NULL,
    size NUMERIC NOT NULL,
    name TEXT,
    block_height NUMERIC NOT NULL,
    extrinsic_id TEXT NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE files.metadata OWNER TO postgres;

CREATE TABLE staking.accounts (
    id text NOT NULL,
    total_deposits numeric NOT NULL,
    total_estimated_withdrawals numeric NOT NULL,
    total_withdrawals numeric NOT NULL,
    total_deposits_count numeric NOT NULL,
    total_withdrawals_count numeric NOT NULL,
    total_tax_collected numeric NOT NULL,
    total_tax_collected_count numeric NOT NULL,
    total_rewards_collected numeric NOT NULL,
    total_rewards_collected_count numeric NOT NULL,
    current_total_stake numeric NOT NULL,
    current_storage_fee_deposit numeric NOT NULL,
    current_total_shares numeric NOT NULL,
    current_share_price numeric NOT NULL,
    accumulated_epoch_stake numeric NOT NULL,
    accumulated_epoch_storage_fee_deposit numeric NOT NULL,
    accumulated_epoch_shares numeric NOT NULL,
    created_at numeric NOT NULL,
    updated_at numeric NOT NULL
);
ALTER TABLE staking.accounts OWNER TO postgres;

CREATE TABLE staking.bundle_submissions (
    id text NOT NULL,
    account_id text NOT NULL,
    bundle_id text NOT NULL,
    domain_id text NOT NULL,
    domain_block_id text NOT NULL,
    operator_id text NOT NULL,
    domain_block_number numeric NOT NULL,
    domain_block_hash text NOT NULL,
    domain_block_extrinsic_root text NOT NULL,
    epoch numeric NOT NULL,
    consensus_block_number numeric NOT NULL,
    consensus_block_hash text NOT NULL,
    total_transfers_in numeric NOT NULL,
    transfers_in_count numeric NOT NULL,
    total_transfers_out numeric NOT NULL,
    transfers_out_count numeric NOT NULL,
    total_rejected_transfers_claimed numeric NOT NULL,
    rejected_transfers_claimed_count numeric NOT NULL,
    total_transfers_rejected numeric NOT NULL,
    transfers_rejected_count numeric NOT NULL,
    total_volume numeric NOT NULL,
    consensus_storage_fee numeric NOT NULL,
    domain_execution_fee numeric NOT NULL,
    burned_balance numeric NOT NULL,
    block_height numeric NOT NULL,
    extrinsic_id text NOT NULL,
    event_id text NOT NULL,
    _id uuid NOT NULL,
    _block_range int8range NOT NULL
);
ALTER TABLE staking.bundle_submissions OWNER TO postgres;

CREATE TABLE staking.deposit_events (
    id text NOT NULL,
    sort_id text NOT NULL,
    account_id text NOT NULL,
    domain_id text NOT NULL,
    operator_id text NOT NULL,
    nominator_id text NOT NULL,
    amount numeric NOT NULL,
    storage_fee_deposit numeric NOT NULL,
    total_amount numeric NOT NULL,
    estimated_shares numeric NOT NULL,
    "timestamp" timestamp with time zone NOT NULL,
    block_height numeric NOT NULL,
    extrinsic_id text NOT NULL,
    event_id text NOT NULL,
    _id uuid NOT NULL,
    _block_range int8range NOT NULL
);
ALTER TABLE staking.deposit_events OWNER TO postgres;

CREATE TABLE staking.deposits (
    id text NOT NULL,
    account_id text NOT NULL,
    domain_id text NOT NULL,
    operator_id text NOT NULL,
    nominator_id text NOT NULL,
    amount numeric NOT NULL,
    storage_fee_deposit numeric NOT NULL,
    total_amount numeric NOT NULL,
    estimated_shares numeric NOT NULL,
    total_withdrawn numeric NOT NULL,
    status text NOT NULL,
    "timestamp" timestamp with time zone NOT NULL,
    extrinsic_id text NOT NULL,
    created_at numeric NOT NULL,
    updated_at numeric NOT NULL
);
ALTER TABLE staking.deposits OWNER TO postgres;

CREATE TABLE staking.domain_block_histories (
    id text NOT NULL,
    domain_id text NOT NULL,
    domain_block_number numeric NOT NULL,
    timestamp timestamp with time zone NOT NULL,
    block_height numeric NOT NULL,
    _id uuid NOT NULL,
    _block_range int8range NOT NULL
);
ALTER TABLE staking.domain_block_histories OWNER TO postgres;

CREATE TABLE staking.domain_epochs (
    id text NOT NULL,
    domain_id text NOT NULL,
    epoch numeric NOT NULL,
    domain_block_number_start numeric NOT NULL,
    domain_block_number_end numeric NOT NULL,
    domain_block_count numeric NOT NULL,
    timestamp_start timestamp without time zone NOT NULL,
    timestamp_end timestamp without time zone NOT NULL,
    epoch_duration numeric NOT NULL,
    consensus_block_number_start numeric NOT NULL,
    consensus_block_number_end numeric NOT NULL,
    consensus_block_count numeric NOT NULL,
    created_at numeric NOT NULL,
    updated_at numeric NOT NULL
);
ALTER TABLE staking.domain_epochs OWNER TO postgres;

CREATE TABLE staking.domain_instantiations (
    id text NOT NULL,
    sort_id text NOT NULL,
    name text NOT NULL,
    runtime_id integer NOT NULL,
    runtime text NOT NULL,
    runtime_info text NOT NULL,
    created_by text NOT NULL,
    block_height numeric NOT NULL,
    extrinsic_id text NOT NULL,
    event_id text NOT NULL,
    _id uuid NOT NULL,
    _block_range int8range NOT NULL
);
ALTER TABLE staking.domain_instantiations OWNER TO postgres;

CREATE TABLE staking.domain_staking_histories (
    id text NOT NULL,
    domain_id text NOT NULL,
    current_epoch_index integer NOT NULL,
    current_total_stake numeric NOT NULL,
    current_total_shares numeric NOT NULL,
    share_price numeric NOT NULL,
    timestamp timestamp with time zone NOT NULL,
    block_height numeric NOT NULL,
    _id uuid NOT NULL,
    _block_range int8range NOT NULL
);
ALTER TABLE staking.domain_staking_histories OWNER TO postgres;

CREATE TABLE staking.domains (
    id text NOT NULL,
    sort_id text NOT NULL,
    account_id text NOT NULL,
    name text NOT NULL,
    runtime_id text NOT NULL,
    runtime text NOT NULL,
    runtime_info text NOT NULL,
    completed_epoch numeric NOT NULL,
    last_domain_block_number numeric NOT NULL,
    total_deposits numeric NOT NULL,
    total_estimated_withdrawals numeric NOT NULL,
    total_withdrawals numeric NOT NULL,
    total_deposits_count numeric NOT NULL,
    total_withdrawals_count numeric NOT NULL,
    total_tax_collected numeric NOT NULL,
    total_rewards_collected numeric NOT NULL,
    total_transfers_in numeric NOT NULL,
    transfers_in_count numeric NOT NULL,
    total_transfers_out numeric NOT NULL,
    transfers_out_count numeric NOT NULL,
    total_rejected_transfers_claimed numeric NOT NULL,
    rejected_transfers_claimed_count numeric NOT NULL,
    total_transfers_rejected numeric NOT NULL,
    transfers_rejected_count numeric NOT NULL,
    total_volume numeric NOT NULL,
    total_consensus_storage_fee numeric NOT NULL,
    total_domain_execution_fee numeric NOT NULL,
    total_burned_balance numeric NOT NULL,
    current_total_stake numeric NOT NULL,
    current_storage_fee_deposit numeric NOT NULL,
    current_total_shares numeric NOT NULL,
    current_share_price numeric NOT NULL,
    current_1d_yield numeric NOT NULL,
    current_7d_yield numeric NOT NULL,
    current_30d_yield numeric NOT NULL,
    current_1d_apy numeric NOT NULL,
    current_7d_apy numeric NOT NULL,
    current_30d_apy numeric NOT NULL,
    accumulated_epoch_stake numeric NOT NULL,
    accumulated_epoch_storage_fee_deposit numeric NOT NULL,
    accumulated_epoch_rewards numeric NOT NULL,
    accumulated_epoch_shares numeric NOT NULL,
    bundle_count numeric NOT NULL,
    reward_count numeric NOT NULL,
    tax_collected_count numeric NOT NULL,
    current_epoch_duration numeric NOT NULL,
    last_epoch_duration numeric NOT NULL,
    last6_epochs_duration numeric NOT NULL,
    last144_epoch_duration numeric NOT NULL,
    last1k_epoch_duration numeric NOT NULL,
    last_bundle_at numeric NOT NULL,
    extrinsic_id text NOT NULL,
    created_at numeric NOT NULL,
    updated_at numeric NOT NULL
);
ALTER TABLE staking.domains OWNER TO postgres;

CREATE TABLE staking.nominators (
    id text NOT NULL,
    account_id text NOT NULL,
    domain_id text NOT NULL,
    operator_id text NOT NULL,
    known_shares numeric NOT NULL,
    known_storage_fee_deposit numeric NOT NULL,
    pending_amount numeric NOT NULL,
    pending_storage_fee_deposit numeric NOT NULL,
    pending_effective_domain_epoch numeric NOT NULL,
    total_withdrawal_amounts numeric NOT NULL,
    total_storage_fee_refund numeric NOT NULL,
    unlock_at_confirmed_domain_block_number jsonb NOT NULL,
    pending_shares numeric NOT NULL,
    pending_storage_fee_refund numeric NOT NULL,
    total_deposits numeric NOT NULL,
    total_estimated_withdrawals numeric NOT NULL,
    total_withdrawals numeric NOT NULL,
    total_deposits_count numeric NOT NULL,
    total_withdrawals_count numeric NOT NULL,
    current_total_stake numeric NOT NULL,
    current_storage_fee_deposit numeric NOT NULL,
    current_total_shares numeric NOT NULL,
    current_share_price numeric NOT NULL,
    accumulated_epoch_stake numeric NOT NULL,
    accumulated_epoch_storage_fee_deposit numeric NOT NULL,
    accumulated_epoch_shares numeric NOT NULL,
    active_epoch_count numeric NOT NULL,
    status text NOT NULL,
    created_at numeric NOT NULL,
    updated_at numeric NOT NULL
);
ALTER TABLE staking.nominators OWNER TO postgres;

CREATE TABLE staking.operator_deregistrations (
    id text NOT NULL,
    owner text NOT NULL,
    domain_id text NOT NULL,
    block_height numeric NOT NULL,
    extrinsic_id text NOT NULL,
    event_id text NOT NULL,
    _id uuid NOT NULL,
    _block_range int8range NOT NULL
);
ALTER TABLE staking.operator_deregistrations OWNER TO postgres;

CREATE TABLE staking.operator_registrations (
    id text NOT NULL,
    sort_id text NOT NULL,
    owner text NOT NULL,
    domain_id text NOT NULL,
    signing_key text NOT NULL,
    minimum_nominator_stake numeric NOT NULL,
    nomination_tax integer NOT NULL,
    block_height numeric NOT NULL,
    extrinsic_id text NOT NULL,
    event_id text NOT NULL,
    _id uuid NOT NULL,
    _block_range int8range NOT NULL
);
ALTER TABLE staking.operator_registrations OWNER TO postgres;

CREATE TABLE staking.operator_rewards (
    id text NOT NULL,
    domain_id text NOT NULL,
    operator_id text NOT NULL,
    amount numeric NOT NULL,
    at_block_number numeric NOT NULL,
    block_height numeric NOT NULL,
    extrinsic_id text NOT NULL,
    event_id text NOT NULL,
    _id uuid NOT NULL,
    _block_range int8range NOT NULL
);
ALTER TABLE staking.operator_rewards OWNER TO postgres;

CREATE TABLE staking.operator_staking_histories (
    id text NOT NULL,
    operator_id text NOT NULL,
    operator_owner text NOT NULL,
    signing_key text NOT NULL,
    current_domain_id text NOT NULL,
    current_total_stake numeric NOT NULL,
    current_total_shares numeric NOT NULL,
    deposits_in_epoch numeric NOT NULL,
    withdrawals_in_epoch numeric NOT NULL,
    total_storage_fee_deposit numeric NOT NULL,
    share_price numeric NOT NULL,
    partial_status text NOT NULL,
    timestamp timestamp with time zone NOT NULL,
    block_height numeric NOT NULL,
    _id uuid NOT NULL,
    _block_range int8range NOT NULL
);
ALTER TABLE staking.operator_staking_histories OWNER TO postgres;

CREATE TABLE staking.operator_tax_collections (
    id text NOT NULL,
    domain_id text NOT NULL,
    operator_id text NOT NULL,
    amount numeric NOT NULL,
    block_height numeric NOT NULL,
    extrinsic_id text NOT NULL,
    event_id text NOT NULL,
    _id uuid NOT NULL,
    _block_range int8range NOT NULL
);
ALTER TABLE staking.operator_tax_collections OWNER TO postgres;

CREATE TABLE staking.operators (
    id text NOT NULL,
    sort_id text NOT NULL,
    account_id text NOT NULL,
    domain_id text NOT NULL,
    signing_key text NOT NULL,
    minimum_nominator_stake numeric NOT NULL,
    nomination_tax integer NOT NULL,
    current_total_stake numeric NOT NULL,
    current_storage_fee_deposit numeric NOT NULL,
    current_epoch_rewards numeric NOT NULL,
    current_total_shares numeric NOT NULL,
    current_share_price numeric NOT NULL,
    raw_status text NOT NULL,
    total_deposits numeric NOT NULL,
    total_estimated_withdrawals numeric NOT NULL,
    total_withdrawals numeric NOT NULL,
    total_deposits_count numeric NOT NULL,
    total_withdrawals_count numeric NOT NULL,
    total_tax_collected numeric NOT NULL,
    total_rewards_collected numeric NOT NULL,
    accumulated_epoch_stake numeric NOT NULL,
    accumulated_epoch_storage_fee_deposit numeric NOT NULL,
    accumulated_epoch_rewards numeric NOT NULL,
    accumulated_epoch_shares numeric NOT NULL,
    active_epoch_count numeric NOT NULL,
    bundle_count numeric NOT NULL,
    reward_count numeric NOT NULL,
    tax_collected_count numeric NOT NULL,
    current_1d_yield numeric NOT NULL,
    current_7d_yield numeric NOT NULL,
    current_30d_yield numeric NOT NULL,
    current_1d_apy numeric NOT NULL,
    current_7d_apy numeric NOT NULL,
    current_30d_apy numeric NOT NULL,
    status text NOT NULL,
    last_bundle_at numeric NOT NULL,
    extrinsic_id text NOT NULL,
    created_at numeric NOT NULL,
    updated_at numeric NOT NULL
);
ALTER TABLE staking.operators OWNER TO postgres;

CREATE TABLE staking.runtime_creations (
    id text NOT NULL,
    sort_id text NOT NULL,
    name text NOT NULL,
    type text NOT NULL,
    created_by text NOT NULL,
    block_height numeric NOT NULL,
    extrinsic_id text NOT NULL,
    event_id text NOT NULL,
    _id uuid NOT NULL,
    _block_range int8range NOT NULL
);
ALTER TABLE staking.runtime_creations OWNER TO postgres;

CREATE TABLE staking.unlocked_events (
    id text NOT NULL,
    domain_id text NOT NULL,
    operator_id text NOT NULL,
    account_id text NOT NULL,
    nominator_id text NOT NULL,
    amount numeric NOT NULL,
    storage_fee numeric NOT NULL,
    "timestamp" timestamp with time zone NOT NULL,
    block_height numeric NOT NULL,
    extrinsic_id text NOT NULL,
    event_id text NOT NULL,
    _id uuid NOT NULL,
    _block_range int8range NOT NULL
);
ALTER TABLE staking.unlocked_events OWNER TO postgres;

CREATE TABLE staking.nominators_unlocked_events (
    id text NOT NULL,
    domain_id text NOT NULL,
    operator_id text NOT NULL,
    block_height numeric NOT NULL,
    extrinsic_id text NOT NULL,
    event_id text NOT NULL,
    _id uuid NOT NULL,
    _block_range int8range NOT NULL
);
ALTER TABLE staking.nominators_unlocked_events OWNER TO postgres;

CREATE TABLE staking.withdraw_events (
    id text NOT NULL,
    sort_id text NOT NULL,
    account_id text NOT NULL,
    domain_id text NOT NULL,
    operator_id text NOT NULL,
    nominator_id text NOT NULL,
    to_withdraw text NOT NULL,
    shares numeric NOT NULL,
    storage_fee_refund numeric NOT NULL,
    estimated_amount numeric NOT NULL,
    "timestamp" timestamp with time zone NOT NULL,
    block_height numeric NOT NULL,
    extrinsic_id text NOT NULL,
    event_id text NOT NULL,
    _id uuid NOT NULL,
    _block_range int8range NOT NULL
);
ALTER TABLE staking.withdraw_events OWNER TO postgres;

CREATE TABLE staking.withdrawals (
    id text NOT NULL,
    account_id text NOT NULL,
    domain_id text NOT NULL,
    operator_id text NOT NULL,
    nominator_id text NOT NULL,
    shares numeric NOT NULL,
    storage_fee_refund numeric NOT NULL,
    estimated_amount numeric NOT NULL,
    unlocked_amount numeric NOT NULL,
    unlocked_storage_fee numeric NOT NULL,
    total_amount numeric NOT NULL,
    status text NOT NULL,
    "timestamp" timestamp with time zone NOT NULL,
    withdraw_extrinsic_id text NOT NULL,
    unlock_extrinsic_id text NOT NULL,
    epoch_withdrawal_requested_at numeric NOT NULL,
    domain_block_number_withdrawal_requested_at numeric NOT NULL,
    created_at numeric NOT NULL,
    domain_block_number_ready_at numeric NOT NULL,
    unlocked_at numeric NOT NULL,
    updated_at numeric NOT NULL
);
ALTER TABLE staking.withdrawals OWNER TO postgres;

CREATE TABLE files.metadata_cids (
    id TEXT NOT NULL,
    parent_cid TEXT NOT NULL,
    child_cid TEXT NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE files.metadata_cids OWNER TO postgres;

CREATE TABLE domain_auto_evm.account_histories (
    id text NOT NULL,
    nonce numeric NOT NULL,
    free numeric NOT NULL,
    reserved numeric NOT NULL,
    total numeric,
    created_at numeric NOT NULL,
    _id uuid NOT NULL,
    _block_range int8range NOT NULL
);
ALTER TABLE domain_auto_evm.account_histories OWNER TO postgres;

CREATE TABLE domain_auto_evm.accounts (
    id text NOT NULL,
    nonce numeric NOT NULL,
    free numeric NOT NULL,
    reserved numeric NOT NULL,
    total numeric,
    created_at numeric NOT NULL,
    updated_at numeric NOT NULL
);
ALTER TABLE domain_auto_evm.accounts OWNER TO postgres;

CREATE TABLE domain_auto_evm.blocks (
    id text NOT NULL,
    sort_id text NOT NULL,
    height numeric NOT NULL,
    hash text NOT NULL,
    "timestamp" timestamp without time zone NOT NULL,
    parent_hash text NOT NULL,
    spec_id text NOT NULL,
    state_root text NOT NULL,
    extrinsics_root text NOT NULL,
    extrinsics_count integer NOT NULL,
    events_count integer NOT NULL,
    logs_count integer NOT NULL,
    transfers_count integer NOT NULL,
    transfer_value numeric NOT NULL,
    author_id text NOT NULL,
    _id uuid NOT NULL,
    _block_range int8range NOT NULL
);
ALTER TABLE domain_auto_evm.blocks OWNER TO postgres;

CREATE TABLE domain_auto_evm.cumulative_blocks (
    id text NOT NULL,
    cumulative_extrinsics_count numeric NOT NULL,
    cumulative_events_count numeric NOT NULL,
    cumulative_logs_count numeric NOT NULL,
    cumulative_transfers_count numeric NOT NULL,
    cumulative_transfer_value numeric NOT NULL
);
ALTER TABLE domain_auto_evm.cumulative_blocks OWNER TO postgres;

CREATE TABLE domain_auto_evm.event_modules (
    id text NOT NULL,
    section text NOT NULL,
    method text NOT NULL
);
ALTER TABLE domain_auto_evm.event_modules OWNER TO postgres;

CREATE TABLE domain_auto_evm.events (
    id text NOT NULL,
    sort_id text NOT NULL,
    block_height numeric NOT NULL,
    block_hash text NOT NULL,
    extrinsic_id text NOT NULL,
    extrinsic_hash text NOT NULL,
    section text NOT NULL,
    module text NOT NULL,
    name text NOT NULL,
    index_in_block numeric NOT NULL,
    "timestamp" timestamp without time zone NOT NULL,
    phase text NOT NULL,
    pos integer NOT NULL,
    args text NOT NULL,
    _id uuid NOT NULL,
    _block_range int8range NOT NULL
);
ALTER TABLE domain_auto_evm.events OWNER TO postgres;

CREATE TABLE domain_auto_evm.evm_blocks (
    id text NOT NULL,
    sort_id text NOT NULL,
    height numeric NOT NULL,
    hash text NOT NULL,
    "timestamp" timestamp without time zone NOT NULL,
    block_timestamp integer NOT NULL,
    parent_hash text NOT NULL,
    state_root text NOT NULL,
    transactions_root text NOT NULL,
    receipts_root text NOT NULL,
    transactions_count integer NOT NULL,
    transfer_value numeric NOT NULL,
    author_id text NOT NULL,
    gas_used numeric NOT NULL,
    gas_limit numeric NOT NULL,
    extra_data text NOT NULL,
    difficulty numeric NOT NULL,
    total_difficulty numeric NOT NULL,
    size numeric NOT NULL,
    _id uuid NOT NULL,
    _block_range int8range NOT NULL
);
ALTER TABLE domain_auto_evm.evm_blocks OWNER TO postgres;

CREATE TABLE domain_auto_evm.evm_code_selectors (
    id text NOT NULL,
    address text NOT NULL,
    selector text NOT NULL,
    name text NOT NULL,
    signature text NOT NULL,
    _id uuid NOT NULL,
    _block_range int8range NOT NULL
);
ALTER TABLE domain_auto_evm.evm_code_selectors OWNER TO postgres;

CREATE TABLE domain_auto_evm.evm_codes (
    id text NOT NULL,
    address text NOT NULL,
    code text NOT NULL,
    abi text NOT NULL,
    _id uuid NOT NULL,
    _block_range int8range NOT NULL
);
ALTER TABLE domain_auto_evm.evm_codes OWNER TO postgres;

CREATE TABLE domain_auto_evm.evm_transactions (
    id text NOT NULL,
    sort_id text NOT NULL,
    hash text NOT NULL,
    nonce numeric NOT NULL,
    block_hash text NOT NULL,
    block_number numeric NOT NULL,
    "timestamp" timestamp without time zone NOT NULL,
    block_timestamp integer NOT NULL,
    transaction_index integer NOT NULL,
    "from" text NOT NULL,
    "to" text NOT NULL,
    value numeric NOT NULL,
    gas_price numeric NOT NULL,
    max_fee_per_gas numeric NOT NULL,
    max_priority_fee_per_gas numeric NOT NULL,
    gas numeric NOT NULL,
    input text NOT NULL,
    creates text NOT NULL,
    raw text NOT NULL,
    public_key text NOT NULL,
    chain_id numeric NOT NULL,
    standard_v numeric NOT NULL,
    v text NOT NULL,
    r text NOT NULL,
    s text NOT NULL,
    access_list text NOT NULL,
    transaction_type numeric NOT NULL,
    _id uuid NOT NULL,
    _block_range int8range NOT NULL
);
ALTER TABLE domain_auto_evm.evm_transactions OWNER TO postgres;

CREATE TABLE domain_auto_evm.extrinsic_modules (
    id text NOT NULL,
    section text NOT NULL,
    method text NOT NULL
);
ALTER TABLE domain_auto_evm.extrinsic_modules OWNER TO postgres;

CREATE TABLE domain_auto_evm.extrinsics (
    id text NOT NULL,
    sort_id text NOT NULL,
    hash text NOT NULL,
    block_height numeric NOT NULL,
    block_hash text NOT NULL,
    section text NOT NULL,
    module text NOT NULL,
    name text NOT NULL,
    index_in_block integer NOT NULL,
    success boolean NOT NULL,
    "timestamp" timestamp without time zone NOT NULL,
    nonce numeric NOT NULL,
    signer text NOT NULL,
    signature text NOT NULL,
    events_count integer NOT NULL,
    args text NOT NULL,
    error text NOT NULL,
    tip numeric NOT NULL,
    fee numeric NOT NULL,
    pos integer NOT NULL,
    _id uuid NOT NULL,
    _block_range int8range NOT NULL
);
ALTER TABLE domain_auto_evm.extrinsics OWNER TO postgres;

CREATE TABLE domain_auto_evm.log_kinds (
    id text NOT NULL,
    kind text NOT NULL
);
ALTER TABLE domain_auto_evm.log_kinds OWNER TO postgres;

CREATE TABLE domain_auto_evm.logs (
    id text NOT NULL,
    sort_id text NOT NULL,
    block_height numeric NOT NULL,
    block_hash text NOT NULL,
    index_in_block integer NOT NULL,
    kind text NOT NULL,
    value text,
    "timestamp" timestamp without time zone NOT NULL,
    _id uuid NOT NULL,
    _block_range int8range NOT NULL
);
ALTER TABLE domain_auto_evm.logs OWNER TO postgres;

CREATE TABLE domain_auto_evm.sections (
    id text NOT NULL,
    section text NOT NULL
);
ALTER TABLE domain_auto_evm.sections OWNER TO postgres;

CREATE TABLE domain_auto_evm.transfers (
    id text NOT NULL,
    block_height numeric NOT NULL,
    block_hash text NOT NULL,
    extrinsic_id text NOT NULL,
    event_id text NOT NULL,
    "from" text NOT NULL,
    from_chain text NOT NULL,
    "to" text NOT NULL,
    to_chain text NOT NULL,
    value numeric NOT NULL,
    fee numeric NOT NULL,
    success boolean NOT NULL,
    "timestamp" timestamp without time zone NOT NULL,
    _id uuid NOT NULL,
    _block_range int8range NOT NULL
);
ALTER TABLE domain_auto_evm.transfers OWNER TO postgres;


CREATE TABLE stats.hourly (
    id TEXT NOT NULL,
    cumulated_history_size numeric NOT NULL,
    delta_history_size numeric NOT NULL,
    start_date timestamp without time zone NOT NULL,
    start_block numeric NOT NULL,
    end_date timestamp without time zone NOT NULL,
    end_block numeric NOT NULL,
    updated_at timestamp without time zone NOT NULL
);
ALTER TABLE stats.hourly OWNER TO postgres;

CREATE TABLE stats.daily (
    id TEXT NOT NULL,
    cumulated_history_size numeric NOT NULL,
    delta_history_size numeric NOT NULL,
    start_date timestamp without time zone NOT NULL,
    start_block numeric NOT NULL,
    end_date timestamp without time zone NOT NULL,
    end_block numeric NOT NULL,
    updated_at timestamp without time zone NOT NULL
);
ALTER TABLE stats.daily OWNER TO postgres;

CREATE TABLE stats.weekly (
    id TEXT NOT NULL,
    cumulated_history_size numeric NOT NULL,
    delta_history_size numeric NOT NULL,
    start_date timestamp without time zone NOT NULL,
    start_block numeric NOT NULL,
    end_date timestamp without time zone NOT NULL,
    end_block numeric NOT NULL,
    updated_at timestamp without time zone NOT NULL
);
ALTER TABLE stats.weekly OWNER TO postgres;

CREATE TABLE stats.monthly (
    id TEXT NOT NULL,
    cumulated_history_size numeric NOT NULL,
    delta_history_size numeric NOT NULL,
    start_date timestamp without time zone NOT NULL,
    start_block numeric NOT NULL,
    end_date timestamp without time zone NOT NULL,
    end_block numeric NOT NULL,
    updated_at timestamp without time zone NOT NULL
);
ALTER TABLE stats.monthly OWNER TO postgres;

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

ALTER TABLE ONLY leaderboard.nominator_withdrawals_total_value_histories
    ADD CONSTRAINT nominator_withdrawals_total_value_histories_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY leaderboard.nominator_withdrawals_total_values
    ADD CONSTRAINT nominator_withdrawals_total_values_pkey PRIMARY KEY (id);

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

ALTER TABLE ONLY leaderboard.operator_withdrawals_total_value_histories
    ADD CONSTRAINT operator_withdrawals_total_value_histories_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY leaderboard.operator_withdrawals_total_values
    ADD CONSTRAINT operator_withdrawals_total_values_pkey PRIMARY KEY (id);

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

ALTER TABLE ONLY staking._metadata
    ADD CONSTRAINT _metadata_pkey PRIMARY KEY (key);

ALTER TABLE ONLY staking.accounts
    ADD CONSTRAINT accounts_pkey PRIMARY KEY (id);

ALTER TABLE ONLY staking.bundle_submissions
    ADD CONSTRAINT bundle_submissions_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY staking.deposit_events
    ADD CONSTRAINT deposit_events_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY staking.deposits
    ADD CONSTRAINT deposits_pkey PRIMARY KEY (id);

ALTER TABLE ONLY staking.domain_epochs
    ADD CONSTRAINT domain_epochs_pkey PRIMARY KEY (id);
    
ALTER TABLE ONLY staking.domain_instantiations
    ADD CONSTRAINT domain_instantiations_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY staking.domain_staking_histories
    ADD CONSTRAINT domain_staking_histories_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY staking.domains
    ADD CONSTRAINT domains_pkey PRIMARY KEY (id);

ALTER TABLE ONLY staking.nominators
    ADD CONSTRAINT nominators_pkey PRIMARY KEY (id);

ALTER TABLE ONLY staking.operator_deregistrations
    ADD CONSTRAINT operator_deregistrations_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY staking.operator_registrations
    ADD CONSTRAINT operator_registrations_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY staking.operator_rewards
    ADD CONSTRAINT operator_rewards_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY staking.operator_staking_histories
    ADD CONSTRAINT operator_staking_histories_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY staking.operator_tax_collections
    ADD CONSTRAINT operator_tax_collections_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY staking.operators
    ADD CONSTRAINT operators_pkey PRIMARY KEY (id);

ALTER TABLE ONLY staking.runtime_creations
    ADD CONSTRAINT runtime_creations_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY staking.unlocked_events
    ADD CONSTRAINT unlocked_events_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY staking.nominators_unlocked_events
    ADD CONSTRAINT nominators_unlocked_events_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY staking.withdraw_events
    ADD CONSTRAINT withdraw_events_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY staking.withdrawals
    ADD CONSTRAINT withdrawals_pkey PRIMARY KEY (id);
    
ALTER TABLE ONLY domain_auto_evm._metadata
    ADD CONSTRAINT _metadata_pkey PRIMARY KEY (key);

ALTER TABLE ONLY domain_auto_evm.account_histories
    ADD CONSTRAINT account_histories_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY domain_auto_evm.accounts
    ADD CONSTRAINT accounts_id_key PRIMARY KEY (id);

ALTER TABLE ONLY domain_auto_evm.blocks
    ADD CONSTRAINT blocks_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY domain_auto_evm.cumulative_blocks
    ADD CONSTRAINT cumulative_blocks_pkey PRIMARY KEY (id);

ALTER TABLE ONLY domain_auto_evm.event_modules
    ADD CONSTRAINT event_modules_id_key PRIMARY KEY (id);

ALTER TABLE ONLY domain_auto_evm.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY domain_auto_evm.evm_blocks
    ADD CONSTRAINT evm_blocks_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY domain_auto_evm.evm_code_selectors
    ADD CONSTRAINT evm_code_selectors_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY domain_auto_evm.evm_codes
    ADD CONSTRAINT evm_codes_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY domain_auto_evm.evm_transactions
    ADD CONSTRAINT evm_transactions_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY domain_auto_evm.extrinsic_modules
    ADD CONSTRAINT extrinsic_modules_id_key PRIMARY KEY (id);

ALTER TABLE ONLY domain_auto_evm.extrinsics
    ADD CONSTRAINT extrinsics_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY domain_auto_evm.log_kinds
    ADD CONSTRAINT log_kinds_id_key PRIMARY KEY (id);

ALTER TABLE ONLY domain_auto_evm.logs
    ADD CONSTRAINT logs_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY domain_auto_evm.sections
    ADD CONSTRAINT sections_id_key PRIMARY KEY (id);

ALTER TABLE ONLY domain_auto_evm.transfers
    ADD CONSTRAINT transfers_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY stats.hourly
    ADD CONSTRAINT hourly_pkey PRIMARY KEY (id);

ALTER TABLE ONLY stats.daily
    ADD CONSTRAINT daily_pkey PRIMARY KEY (id);

ALTER TABLE ONLY stats.weekly
    ADD CONSTRAINT weekly_pkey PRIMARY KEY (id);

ALTER TABLE ONLY stats.monthly
    ADD CONSTRAINT monthly_pkey PRIMARY KEY (id);

CREATE INDEX "0xccedb032815757ed" ON consensus.blocks USING btree (id);
CREATE INDEX "consensus_blocks_sort_id" ON consensus.blocks USING btree (sort_id DESC);
CREATE INDEX "consensus_blocks_hash" ON consensus.blocks USING btree (hash);
CREATE INDEX "consensus_blocks_id_hash" ON consensus.blocks (id, hash);
CREATE INDEX "consensus_cumulative_blocks_id" ON consensus.cumulative_blocks USING btree (id);
CREATE INDEX "0xd8db4c8313621519" ON consensus.extrinsics USING btree (id);
CREATE INDEX "consensus_extrinsics_sort_id" ON consensus.extrinsics USING btree (sort_id DESC);
CREATE INDEX "consensus_extrinsics_hash" ON consensus.extrinsics USING btree (hash);
CREATE INDEX "consensus_extrinsics_block_height" ON consensus.extrinsics USING btree (block_height);
CREATE INDEX "consensus_extrinsics_signer" ON consensus.extrinsics USING btree (signer);
CREATE INDEX "consensus_extrinsics_section" ON consensus.extrinsics USING btree (section);
CREATE INDEX "consensus_extrinsics_module" ON consensus.extrinsics USING btree (module);
CREATE INDEX "0xe5bf5858bd35a276" ON consensus.events USING btree (id);
CREATE INDEX "consensus_events_sort_id" ON consensus.events USING btree (sort_id DESC);
CREATE INDEX "consensus_events_extrinsic_id" ON consensus.events USING btree (extrinsic_id);
CREATE INDEX "consensus_events_block_height" ON consensus.events USING btree (block_height);
CREATE INDEX "consensus_events_section" ON consensus.events USING btree (section);
CREATE INDEX "consensus_events_module" ON consensus.events USING btree (module);
CREATE INDEX "0x4cb388e53e3e30f3" ON consensus.accounts USING btree (id);
CREATE INDEX "consensus_accounts_free" ON consensus.accounts USING btree (free DESC);
CREATE INDEX "consensus_accounts_reserved" ON consensus.accounts USING btree (reserved DESC);
CREATE INDEX "consensus_accounts_total" ON consensus.accounts USING btree (total DESC);
CREATE INDEX "0xd21b20c334f80c2e" ON consensus.account_histories USING btree (id);
CREATE INDEX "0xb91efc8ed4021e6e" ON consensus.transfers USING btree (id);
CREATE INDEX "consensus_transfers_from" ON consensus.transfers USING btree ("from");
CREATE INDEX "consensus_transfers_to" ON consensus.transfers USING btree ("to");
CREATE INDEX "0x26e9de0ee335659c" ON consensus.extrinsic_modules USING btree (id);
CREATE INDEX "0x55286926221be2e7" ON consensus.event_modules USING btree (id);
CREATE INDEX "0x64128774d8de590c" ON consensus.log_kinds USING btree (id);
CREATE INDEX "0x3d8ee08d232943ea" ON consensus.sections USING btree (id);
CREATE INDEX "0x1e967733a0d5db15" ON consensus.rewards USING btree (id);
CREATE INDEX "consensus_rewards_account_id" ON consensus.rewards USING btree (account_id);
CREATE INDEX "0x09a98aa53fa2c2e3" ON consensus.logs USING btree (id);
CREATE INDEX "consensus_logs_sort_id" ON consensus.logs USING btree (sort_id DESC);
CREATE INDEX "consensus_logs_block_height" ON consensus.logs USING btree (block_height);

CREATE INDEX "0x288575ef7a7aaf75" ON dictionary.extrinsics USING btree (module);
CREATE INDEX "0x46e7a495bb4c21d1" ON dictionary.events USING btree (event);
CREATE INDEX "0x57c58da22539b57d" ON dictionary.extrinsics USING btree (block_height);
CREATE INDEX "0x5b57ecd94445ad2e" ON dictionary.extrinsics USING btree (call);
CREATE INDEX "0x62b8f3181611d490" ON dictionary.events USING btree (module);
CREATE INDEX "0xc0c9768d1987b60f" ON dictionary.events USING btree (block_height);

CREATE INDEX "0x03f87f972ff639fb" ON leaderboard.nominator_deposits_total_counts USING btree (rank);
CREATE INDEX "0x0a914dd2bb308160" ON leaderboard.farmer_block_total_value_histories USING btree (id);
CREATE INDEX "leaderboard_farmer_block_total_value_histories_account_id" ON leaderboard.farmer_block_total_value_histories USING btree (account_id);
CREATE INDEX "0x15178b2615ecb334" ON leaderboard.farmer_vote_total_counts USING btree (value);
CREATE INDEX "0x1dc9d229fc046a77" ON leaderboard.farmer_block_total_counts USING btree (value);
CREATE INDEX "0x1ed6c532b99ee178" ON leaderboard.nominator_deposits_total_values USING btree (rank);
CREATE INDEX "0x1fd4ad1795e237a1" ON leaderboard.farmer_vote_total_value_histories USING btree (id);
CREATE INDEX "leaderboard_farmer_vote_total_value_histories_account_id" ON leaderboard.farmer_vote_total_value_histories USING btree (account_id);
CREATE INDEX "0x203a197257ce12a5" ON leaderboard.farmer_vote_total_counts USING btree (rank);
CREATE INDEX "0x273d80def02d3758" ON leaderboard.operator_withdrawals_total_value_histories USING btree (id);
CREATE INDEX "leaderboard_operator_withdrawals_total_value_histories_account_id" ON leaderboard.operator_withdrawals_total_value_histories USING btree (account_id);
CREATE INDEX "leaderboard_operator_withdrawals_total_values_id" ON leaderboard.operator_withdrawals_total_values USING btree (id);
CREATE INDEX "leaderboard_operator_withdrawals_total_values_rank" ON leaderboard.operator_withdrawals_total_values USING btree (rank);
CREATE INDEX "leaderboard_operator_withdrawals_total_values_value" ON leaderboard.operator_withdrawals_total_values USING btree (value);
CREATE INDEX "0x3082545cf9f8ade6" ON leaderboard.operator_total_rewards_collected_histories USING btree (id);
CREATE INDEX "leaderboard_operator_total_rewards_collected_histories_account_id" ON leaderboard.operator_total_rewards_collected_histories USING btree (account_id);
CREATE INDEX "0x36fad076b7b609c8" ON leaderboard.operator_total_tax_collecteds USING btree (rank);
CREATE INDEX "0x37cd3b31685e6b8a" ON leaderboard.operator_deposits_total_count_histories USING btree (id);
CREATE INDEX "leaderboard_operator_deposits_total_count_histories_account_id" ON leaderboard.operator_deposits_total_count_histories USING btree (account_id);
CREATE INDEX "0x39a8bb601e543aac" ON leaderboard.nominator_withdrawals_total_value_histories USING btree (id);
CREATE INDEX "leaderboard_nominator_withdrawals_total_value_histories_account_id" ON leaderboard.nominator_withdrawals_total_value_histories USING btree (account_id);
CREATE INDEX "leaderboard_nominator_withdrawals_total_values_id" ON leaderboard.nominator_withdrawals_total_values USING btree (id);
CREATE INDEX "leaderboard_nominator_withdrawals_total_values_rank" ON leaderboard.nominator_withdrawals_total_values USING btree (rank);
CREATE INDEX "leaderboard_nominator_withdrawals_total_values_value" ON leaderboard.nominator_withdrawals_total_values USING btree (value);
CREATE INDEX "0x3c11ae5e03742fc1" ON leaderboard.farmer_vote_total_count_histories USING btree (id);
CREATE INDEX "leaderboard_farmer_vote_total_count_histories_account_id" ON leaderboard.farmer_vote_total_count_histories USING btree (account_id);
CREATE INDEX "0x3c8d59be33cc30fd" ON leaderboard.account_transaction_fee_paid_total_values USING btree (value);
CREATE INDEX "0x3fb3bf4c3648e89f" ON leaderboard.operator_bundle_total_counts USING btree (value);
CREATE INDEX "0x414cf5a248371b9e" ON leaderboard.operator_total_rewards_collecteds USING btree (value);
CREATE INDEX "0x45b6baa60f76afe5" ON leaderboard.farmer_block_total_counts USING btree (rank);
CREATE INDEX "0x5162c85596c9338e" ON leaderboard.operator_deposits_total_values USING btree (value);
CREATE INDEX "0x52d6270f1cc3c4dd" ON leaderboard.operator_bundle_total_counts USING btree (rank);
CREATE INDEX "0x554eb4e5ac77f3eb" ON leaderboard.operator_withdrawals_total_count_histories USING btree (id);
CREATE INDEX "leaderboard_operator_withdrawals_total_count_histories_account_id" ON leaderboard.operator_withdrawals_total_count_histories USING btree (account_id);
CREATE INDEX "0x6446d391095803fe" ON leaderboard.account_transfer_receiver_total_values USING btree (rank);
CREATE INDEX "0x648d3308d6c4914f" ON leaderboard.operator_deposits_total_counts USING btree (value);
CREATE INDEX "0x6625bd986dfdd912" ON leaderboard.farmer_vote_total_values USING btree (rank);
CREATE INDEX "0x6e3c8d300e206644" ON leaderboard.account_transfer_sender_total_values USING btree (value);
CREATE INDEX "0x6e7ba35bab79dae5" ON leaderboard.account_remark_counts USING btree (value);
CREATE INDEX "0x73606d69a16a51ed" ON leaderboard.farmer_vote_and_block_total_counts USING btree (rank);
CREATE INDEX "0x74444c6cbb827fed" ON leaderboard.account_extrinsic_failed_total_counts USING btree (rank);
CREATE INDEX "0x7c584a4083105781" ON leaderboard.farmer_block_total_values USING btree (value);
CREATE INDEX "0x7cdbfa16661f71ee" ON leaderboard.nominator_withdrawals_total_counts USING btree (value);
CREATE INDEX "0x7ef3b9aa555b5a05" ON leaderboard.account_transfer_receiver_total_values USING btree (value);
CREATE INDEX "0x82f033a6c175eddd" ON leaderboard.farmer_vote_and_block_total_values USING btree (value);
CREATE INDEX "0x865a7a78cd9957e1" ON leaderboard.account_transaction_fee_paid_total_value_histories USING btree (id);
CREATE INDEX "leaderboard_account_transaction_fee_paid_total_value_histories_account_id" ON leaderboard.account_transaction_fee_paid_total_value_histories USING btree (account_id);
CREATE INDEX "0x8b7c68617ff4e62b" ON leaderboard.operator_deposits_total_value_histories USING btree (id);
CREATE INDEX "leaderboard_operator_deposits_total_value_histories_account_id" ON leaderboard.operator_deposits_total_value_histories USING btree (account_id);
CREATE INDEX "0x8c12fe09c9fbcd4f" ON leaderboard.farmer_block_total_count_histories USING btree (id);
CREATE INDEX "leaderboard_farmer_block_total_count_histories_account_id" ON leaderboard.farmer_block_total_count_histories USING btree (account_id);
CREATE INDEX "0x8d7008ea364cf94c" ON leaderboard.account_transfer_sender_total_count_histories USING btree (id);
CREATE INDEX "leaderboard_account_transfer_sender_total_count_histories_account_id" ON leaderboard.account_transfer_sender_total_count_histories USING btree (account_id);
CREATE INDEX "0x8fa61e629a2dcd38" ON leaderboard.account_transfer_receiver_total_value_histories USING btree (id);
CREATE INDEX "leaderboard_account_transfer_receiver_total_value_histories_account_id" ON leaderboard.account_transfer_receiver_total_value_histories USING btree (account_id);
CREATE INDEX "0x957df7861716b7e5" ON leaderboard.nominator_deposits_total_count_histories USING btree (id);
CREATE INDEX "leaderboard_nominator_deposits_total_count_histories_account_id" ON leaderboard.nominator_deposits_total_count_histories USING btree (account_id);
CREATE INDEX "0x97d32cd19e3802db" ON leaderboard.farmer_block_total_values USING btree (rank);
CREATE INDEX "0x99d0f21c8605c41c" ON leaderboard.account_transfer_sender_total_counts USING btree (value);
CREATE INDEX "0xf37e3b354eac5a6e" ON leaderboard.operator_withdrawals_total_counts USING btree (value);
CREATE INDEX "0x9b42c9f7087cc0dd" ON leaderboard.account_transfer_receiver_total_count_histories USING btree (id);
CREATE INDEX "leaderboard_account_transfer_receiver_total_count_histories_account_id" ON leaderboard.account_transfer_receiver_total_count_histories USING btree (account_id);
CREATE INDEX "0x9cd9957f6e6b9cf4" ON leaderboard.account_extrinsic_total_count_histories USING btree (id);
CREATE INDEX "leaderboard_account_extrinsic_total_count_histories_account_id" ON leaderboard.account_extrinsic_total_count_histories USING btree (account_id);
CREATE INDEX "0x9f3af39f22aac290" ON leaderboard.farmer_vote_and_block_total_count_histories USING btree (id);
CREATE INDEX "leaderboard_farmer_vote_and_block_total_count_histories_account_id" ON leaderboard.farmer_vote_and_block_total_count_histories USING btree (account_id);
CREATE INDEX "0x9fc7939319b88d37" ON leaderboard.nominator_deposits_total_counts USING btree (value);
CREATE INDEX "0xa035d5be2ef2e7ff" ON leaderboard.nominator_deposits_total_values USING btree (value);
CREATE INDEX "0xa03f24a9dfd38cdc" ON leaderboard.farmer_vote_total_values USING btree (value);
CREATE INDEX "0xab244f4097d5b7de" ON leaderboard.account_transfer_receiver_total_counts USING btree (value);
CREATE INDEX "0xab389403bd29540d" ON leaderboard.operator_total_rewards_collecteds USING btree (rank);
CREATE INDEX "0xab879a58ac57bb2e" ON leaderboard.account_remark_count_histories USING btree (id);
CREATE INDEX "leaderboard_account_remark_count_histories_account_id" ON leaderboard.account_remark_count_histories USING btree (account_id);
CREATE INDEX "0xac1bf85d692ba008" ON leaderboard.account_transfer_sender_total_values USING btree (rank);
CREATE INDEX "0xac5a3d6fd52e2eba" ON leaderboard.farmer_vote_and_block_total_values USING btree (rank);
CREATE INDEX "0xb65383ff3975f7d0" ON leaderboard.nominator_withdrawals_total_counts USING btree (rank);
CREATE INDEX "0xb8c311b80e4878cf" ON leaderboard.operator_total_tax_collecteds USING btree (value);
CREATE INDEX "0xb9c1f66664e1525c" ON leaderboard.account_extrinsic_success_total_counts USING btree (rank);
CREATE INDEX "0xba6d7a768cf0f48a" ON leaderboard.account_extrinsic_success_total_counts USING btree (value);
CREATE INDEX "0xbb772bc16a6f55fa" ON leaderboard.account_extrinsic_total_counts USING btree (rank);
CREATE INDEX "0xc18397609d2e50fc" ON leaderboard.nominator_withdrawals_total_count_histories USING btree (id);
CREATE INDEX "leaderboard_nominator_withdrawals_total_count_histories_account_id" ON leaderboard.nominator_withdrawals_total_count_histories USING btree (account_id);
CREATE INDEX "0xc26c8c9093762044" ON leaderboard.nominator_deposits_total_value_histories USING btree (id);
CREATE INDEX "leaderboard_nominator_deposits_total_value_histories_account_id" ON leaderboard.nominator_deposits_total_value_histories USING btree (account_id);
CREATE INDEX "0xc62ca597010fa42d" ON leaderboard.operator_deposits_total_counts USING btree (rank);
CREATE INDEX "0xc660a8aa2ffa9c5a" ON leaderboard.farmer_vote_and_block_total_value_histories USING btree (id);
CREATE INDEX "leaderboard_farmer_vote_and_block_total_value_histories_account_id" ON leaderboard.farmer_vote_and_block_total_value_histories USING btree (account_id);
CREATE INDEX "0xc88f7e95a1a80085" ON leaderboard.farmer_vote_and_block_total_counts USING btree (value);
CREATE INDEX "0xc9823b43f2d5fc8e" ON leaderboard.operator_bundle_total_count_histories USING btree (id);
CREATE INDEX "leaderboard_operator_bundle_total_count_histories_account_id" ON leaderboard.operator_bundle_total_count_histories USING btree (account_id);
CREATE INDEX "0xd2beaf5abcec6d67" ON leaderboard.operator_deposits_total_values USING btree (rank);
CREATE INDEX "0xd74476f68a157f82" ON leaderboard.account_transaction_fee_paid_total_values USING btree (rank);
CREATE INDEX "0xd8e7a933c1384413" ON leaderboard.account_extrinsic_failed_total_counts USING btree (value);
CREATE INDEX "0xda2d0c5abd8f415c" ON leaderboard.operator_total_tax_collected_histories USING btree (id);
CREATE INDEX "leaderboard_operator_total_tax_collected_histories_account_id" ON leaderboard.operator_total_tax_collected_histories USING btree (account_id);
CREATE INDEX "0xdb955231fab08930" ON leaderboard.account_extrinsic_total_counts USING btree (value);
CREATE INDEX "0xdc3838f306829259" ON leaderboard.account_extrinsic_success_total_count_histories USING btree (id);
CREATE INDEX "leaderboard_account_extrinsic_success_total_count_histories_account_id" ON leaderboard.account_extrinsic_success_total_count_histories USING btree (account_id);
CREATE INDEX "0xde3fa7f872aada9f" ON leaderboard.account_transfer_sender_total_value_histories USING btree (id);
CREATE INDEX "leaderboard_account_transfer_sender_total_value_histories_account_id" ON leaderboard.account_transfer_sender_total_value_histories USING btree (account_id);
CREATE INDEX "0xed89d2ba5685cb9f" ON leaderboard.account_transfer_sender_total_counts USING btree (rank);
CREATE INDEX "0xf3ee1a0c9ddee938" ON leaderboard.account_transfer_receiver_total_counts USING btree (rank);
CREATE INDEX "0xf458f461b30a6b5e" ON leaderboard.account_extrinsic_failed_total_count_histories USING btree (id);
CREATE INDEX "leaderboard_account_extrinsic_failed_total_count_histories_account_id" ON leaderboard.account_extrinsic_failed_total_count_histories USING btree (account_id);
CREATE INDEX "0xf8a25fbf0822721a" ON leaderboard.account_remark_counts USING btree (rank);

CREATE INDEX "0x1186578888875727" ON files.folders USING btree (id);
CREATE INDEX "files_folders_block_height" ON files.folders USING btree (block_height);
CREATE INDEX "files_folders_sort_id" ON files.folders USING btree (sort_id DESC);
CREATE INDEX "0x68de2b24ed2b1879" ON files.errors USING btree (id);
CREATE INDEX "0x9831414911f0da25" ON files.files USING btree (id);
CREATE INDEX "files_files_block_height" ON files.files USING btree (block_height);
CREATE INDEX "files_files_sort_id" ON files.files USING btree (sort_id DESC);
CREATE INDEX "0xa00ebe7be447c522" ON files.metadata USING btree (id);
CREATE INDEX "files_metadata_block_height" ON files.metadata USING btree (block_height);
CREATE INDEX "files_metadata_sort_id" ON files.metadata USING btree (sort_id DESC);
CREATE INDEX "0xc48b083269566769" ON files.file_cids USING btree (id);
CREATE INDEX "files_file_cids_parent_cid" ON files.file_cids USING btree (parent_cid);
CREATE INDEX "0xc822e1f44430d2bc" ON files.metadata_cids USING btree (id);
CREATE INDEX "files_metadata_cids_parent_cid" ON files.metadata_cids USING btree (parent_cid);
CREATE INDEX "0xd098303e427172ef" ON files.cids USING btree (id);
CREATE INDEX "files_cids_timestamp" ON files.cids USING btree ("timestamp" DESC);
CREATE INDEX "0xd5509466634aea27" ON files.chunks USING btree (id);
CREATE INDEX "0xd9be8718ef6c7984" ON files.folder_cids USING btree (id);
CREATE INDEX "files_folder_cids_parent_cid" ON files.folder_cids USING btree (parent_cid);

CREATE INDEX "0x095f76af1e0896c7" ON staking.unlocked_events USING btree (id);
CREATE INDEX "0x17ee75861ab4beba" ON staking.operator_deregistrations USING btree (id);
CREATE INDEX "0x386761c4d1c44502" ON staking.operator_rewards USING btree (id);
CREATE INDEX "0x3a7ed99d2776ff11" ON staking.operator_tax_collections USING btree (id);
CREATE INDEX "0x59e52a1d9c35dee5" ON staking.domain_block_histories USING btree (id);
CREATE INDEX "staking_domain_block_histories_domain_id" ON staking.domain_block_histories USING btree (domain_id);
CREATE INDEX "staking_domain_block_histories_domain_block_height" ON staking.domain_block_histories USING btree (domain_id, block_height DESC);
CREATE INDEX "0x6414082d1dcaa951" ON staking.domain_instantiations USING btree (id);
CREATE INDEX "0x72774937664e8211" ON staking.withdraw_events USING btree (id);
CREATE INDEX "staking_withdraw_events_domain_id" ON staking.withdraw_events USING btree (domain_id);
CREATE INDEX "staking_withdraw_events_operator_id" ON staking.withdraw_events USING btree (operator_id);
CREATE INDEX "staking_withdraw_events_nominator_id" ON staking.withdraw_events USING btree (nominator_id);
CREATE INDEX "0x9addf36a4bded44f" ON staking.deposit_events USING btree (id);
CREATE INDEX "staking_deposit_events_domain_id" ON staking.deposit_events USING btree (domain_id);
CREATE INDEX "staking_deposit_events_operator_id" ON staking.deposit_events USING btree (operator_id);
CREATE INDEX "staking_deposit_events_nominator_id" ON staking.deposit_events USING btree (nominator_id);
CREATE INDEX "0xa3309c82ddfd9389" ON staking.operator_registrations USING btree (id);
CREATE INDEX "0xb23efd2ff4b502c0" ON staking.operator_staking_histories USING btree (id);
CREATE INDEX "0xb4799973a65fa29b" ON staking.bundle_submissions USING btree (id);
CREATE INDEX "0xb67017dc1891f52d" ON staking.domain_staking_histories USING btree (id);
CREATE INDEX "0xd831d19987080dd5" ON staking.runtime_creations USING btree (id);
CREATE INDEX "staking_accounts_id" ON staking.accounts USING btree (id);
CREATE INDEX "staking_deposits_id" ON staking.deposits USING btree (id);
CREATE INDEX "staking_deposits_domain_id" ON staking.deposits USING btree (domain_id);
CREATE INDEX "staking_deposits_operator_id" ON staking.deposits USING btree (operator_id);
CREATE INDEX "staking_deposits_nominator_id" ON staking.deposits USING btree (nominator_id);
CREATE INDEX "staking_deposits_status" ON staking.deposits USING btree ("status");
CREATE INDEX "staking_domain_epochs_id" ON staking.domain_epochs USING btree (id);
CREATE INDEX "staking_domains_id" ON staking.domains USING btree (id);
CREATE INDEX "staking_domains_id_last_domain_block_number" ON staking.domains (id, last_domain_block_number);
CREATE INDEX "staking_nominators_id" ON staking.nominators USING btree (id);
CREATE INDEX "staking_nominators_domain_id" ON staking.nominators USING btree (domain_id);
CREATE INDEX "staking_nominators_operator_id" ON staking.nominators USING btree (operator_id);
CREATE INDEX "staking_nominators_status" ON staking.nominators USING btree ("status");
CREATE INDEX "staking_operators_id" ON staking.operators USING btree (id);
CREATE INDEX "staking_operators_domain_id" ON staking.operators USING btree (domain_id);
CREATE INDEX "staking_operators_status" ON staking.operators USING btree ("status");
CREATE INDEX "staking_withdrawals_id" ON staking.withdrawals USING btree (id);
CREATE INDEX "staking_withdrawals_domain_id" ON staking.withdrawals USING btree (domain_id);
CREATE INDEX "staking_withdrawals_operator_id" ON staking.withdrawals USING btree (operator_id);
CREATE INDEX "staking_withdrawals_nominator_id" ON staking.withdrawals USING btree (nominator_id);
CREATE INDEX "staking_withdrawals_status" ON staking.withdrawals USING btree ("status");
CREATE INDEX "staking_withdrawals_status_domain_block_number_withdrawal_requested_at" ON staking.withdrawals (status, domain_block_number_withdrawal_requested_at);

CREATE INDEX "0xccedb032815757ed" ON domain_auto_evm.blocks USING btree (id);
CREATE INDEX "domain_auto_evm_blocks_sort_id" ON domain_auto_evm.blocks USING btree (sort_id DESC);
CREATE INDEX "domain_auto_evm_blocks_hash" ON domain_auto_evm.blocks USING btree (hash);
CREATE INDEX "domain_auto_evm_blocks_id_hash" ON domain_auto_evm.blocks (id, hash);
CREATE INDEX "domain_auto_evm_cumulative_blocks_id" ON domain_auto_evm.cumulative_blocks USING btree (id);
CREATE INDEX "0xd8db4c8313621519" ON domain_auto_evm.extrinsics USING btree (id);
CREATE INDEX "domain_auto_evm_extrinsics_sort_id" ON domain_auto_evm.extrinsics USING btree (sort_id DESC);
CREATE INDEX "domain_auto_evm_extrinsics_hash" ON domain_auto_evm.extrinsics USING btree (hash);
CREATE INDEX "domain_auto_evm_extrinsics_block_height" ON domain_auto_evm.extrinsics USING btree (block_height);
CREATE INDEX "domain_auto_evm_extrinsics_signer" ON domain_auto_evm.extrinsics USING btree (signer);
CREATE INDEX "domain_auto_evm_extrinsics_section" ON domain_auto_evm.extrinsics USING btree (section);
CREATE INDEX "domain_auto_evm_extrinsics_module" ON domain_auto_evm.extrinsics USING btree (module);
CREATE INDEX "0xe5bf5858bd35a276" ON domain_auto_evm.events USING btree (id);
CREATE INDEX "domain_auto_evm_events_sort_id" ON domain_auto_evm.events USING btree (sort_id DESC);
CREATE INDEX "domain_auto_evm_events_extrinsic_id" ON domain_auto_evm.events USING btree (extrinsic_id);
CREATE INDEX "domain_auto_evm_events_block_height" ON domain_auto_evm.events USING btree (block_height);
CREATE INDEX "domain_auto_evm_events_section" ON domain_auto_evm.events USING btree (section);
CREATE INDEX "domain_auto_evm_events_module" ON domain_auto_evm.events USING btree (module);
CREATE INDEX "domain_auto_evm_accounts_id" ON domain_auto_evm.accounts USING btree (id);
CREATE INDEX "domain_auto_evm_accounts_free" ON domain_auto_evm.accounts USING btree (free DESC);
CREATE INDEX "domain_auto_evm_accounts_reserved" ON domain_auto_evm.accounts USING btree (reserved DESC);
CREATE INDEX "domain_auto_evm_accounts_total" ON domain_auto_evm.accounts USING btree (total DESC);
CREATE INDEX "0xd21b20c334f80c2e" ON domain_auto_evm.account_histories USING btree (id);
CREATE INDEX "0xb91efc8ed4021e6e" ON domain_auto_evm.transfers USING btree (id);
CREATE INDEX "domain_auto_evm_transfers_from" ON domain_auto_evm.transfers USING btree ("from");
CREATE INDEX "domain_auto_evm_transfers_to" ON domain_auto_evm.transfers USING btree ("to");
CREATE INDEX "domain_auto_evm_extrinsic_modules_id" ON domain_auto_evm.extrinsic_modules USING btree (id);
CREATE INDEX "domain_auto_evm_event_modules_id" ON domain_auto_evm.event_modules USING btree (id);
CREATE INDEX "domain_auto_evm_log_kinds_id" ON domain_auto_evm.log_kinds USING btree (id);
CREATE INDEX "domain_auto_evm_sections_id" ON domain_auto_evm.sections USING btree (id);
CREATE INDEX "0x09a98aa53fa2c2e3" ON domain_auto_evm.logs USING btree (id);
CREATE INDEX "domain_auto_evm_logs_sort_id" ON domain_auto_evm.logs USING btree (sort_id DESC);
CREATE INDEX "domain_auto_evm_logs_block_height" ON domain_auto_evm.logs USING btree (block_height);
CREATE INDEX "0x3067863a57084527" ON domain_auto_evm.evm_code_selectors USING btree (id);
CREATE INDEX "0x94656e42e9e36728" ON domain_auto_evm.evm_blocks USING btree (id);
CREATE INDEX "0xee1355606a0eb5b7" ON domain_auto_evm.evm_transactions USING btree (id);
CREATE INDEX "0xf54a20ed40ef7dea" ON domain_auto_evm.evm_codes USING btree (id);

CREATE INDEX "stats_hourly_end_date" ON stats.hourly USING btree ("end_date" DESC);
CREATE INDEX "stats_daily_end_date" ON stats.daily USING btree ("end_date" DESC);
CREATE INDEX "stats_weekly_end_date" ON stats.weekly USING btree ("end_date" DESC);
CREATE INDEX "stats_monthly_end_date" ON stats.monthly USING btree ("end_date" DESC);

CREATE TRIGGER "0x648269cc35867c16" AFTER UPDATE ON consensus._metadata FOR EACH ROW WHEN (((new.key)::text = 'schemaMigrationCount'::text)) EXECUTE FUNCTION consensus.schema_notification();
CREATE TRIGGER "0xda8a29b0fa478533" AFTER UPDATE ON dictionary._metadata FOR EACH ROW WHEN (((new.key)::text = 'schemaMigrationCount'::text)) EXECUTE FUNCTION dictionary.schema_notification();
CREATE TRIGGER "0xf3241711d3af6c36" AFTER UPDATE ON leaderboard._metadata FOR EACH ROW WHEN (((new.key)::text = 'schemaMigrationCount'::text)) EXECUTE FUNCTION leaderboard.schema_notification();
CREATE TRIGGER "0x22152f0c663c5f9e" AFTER UPDATE ON files._metadata FOR EACH ROW WHEN (((new.key)::text = 'schemaMigrationCount'::text)) EXECUTE FUNCTION files.schema_notification();
CREATE TRIGGER "0x36531371aced88b2" AFTER UPDATE ON staking._metadata FOR EACH ROW WHEN (((new.key)::text = 'schemaMigrationCount'::text)) EXECUTE FUNCTION staking.schema_notification();
CREATE TRIGGER "0x8741811e70475b76" AFTER UPDATE ON domain_auto_evm._metadata FOR EACH ROW WHEN (((new.key)::text = 'schemaMigrationCount'::text)) EXECUTE FUNCTION domain_auto_evm.schema_notification();

-- Consensus triggers

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

CREATE TRIGGER ensure_consensus_log_kind
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

    INSERT INTO consensus.sections (id, section)
    VALUES (NEW.section, NEW.section)
    ON CONFLICT (id) DO NOTHING;
    
    RETURN NEW;
  END;
  $$;
ALTER FUNCTION consensus.insert_event_module() OWNER TO postgres;

CREATE TRIGGER ensure_consensus_event_module
    BEFORE INSERT ON consensus.events
    FOR EACH ROW
    EXECUTE FUNCTION consensus.insert_event_module();

CREATE FUNCTION consensus.insert_extrinsic_module() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
  BEGIN
    INSERT INTO consensus.extrinsic_modules (id, section, method)
    VALUES (NEW.name, NEW.section, NEW.module)
    ON CONFLICT (id) DO NOTHING;

    INSERT INTO consensus.sections (id, section)
    VALUES (NEW.section, NEW.section)
    ON CONFLICT (id) DO NOTHING;
    
    RETURN NEW;
  END;
  $$;
ALTER FUNCTION consensus.insert_extrinsic_module() OWNER TO postgres;

CREATE TRIGGER ensure_consensus_extrinsic_module
    BEFORE INSERT ON consensus.extrinsics
    FOR EACH ROW
    EXECUTE FUNCTION consensus.insert_extrinsic_module();

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

CREATE TRIGGER ensure_consensus_account_updated
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
      prev_cumulative.cumulative_logs_count := 0;
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
      cumulative_logs_count,
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
      prev_cumulative.cumulative_logs_count + NEW.logs_count,
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
      cumulative_logs_count = prev_cumulative.cumulative_logs_count + NEW.logs_count,
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

CREATE TRIGGER ensure_consensus_cumulative_blocks
    BEFORE INSERT ON consensus.blocks
    FOR EACH ROW
    EXECUTE FUNCTION consensus.update_cumulative_blocks();

-- Staking triggers

CREATE OR REPLACE FUNCTION staking.prevent_domain_block_histories_duplicate() RETURNS TRIGGER
    LANGUAGE plpgsql
    AS $$
  BEGIN
    IF EXISTS (
        SELECT 1 
        FROM staking.domain_block_histories 
        WHERE id = NEW.id
    ) THEN
        RETURN NULL;
    END IF;

    UPDATE staking.domains
    SET 
        last_domain_block_number = NEW.domain_block_number
    WHERE id = NEW.domain_id;
    
    RETURN NEW;
  END;
  $$;
ALTER FUNCTION staking.prevent_domain_block_histories_duplicate() OWNER TO postgres;

CREATE TRIGGER prevent_domain_block_histories_duplicate
BEFORE INSERT ON staking.domain_block_histories
FOR EACH ROW
EXECUTE FUNCTION staking.prevent_domain_block_histories_duplicate();

CREATE OR REPLACE FUNCTION staking.prevent_domain_staking_histories_duplicate() RETURNS TRIGGER
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF EXISTS (
        SELECT 1 
        FROM staking.domain_staking_histories 
        WHERE id = NEW.id
    ) THEN
        RETURN NULL;
    END IF;

    RETURN NEW;
END;
$$;
ALTER FUNCTION staking.prevent_domain_staking_histories_duplicate() OWNER TO postgres;

CREATE TRIGGER prevent_domain_staking_histories_duplicate
BEFORE INSERT ON staking.domain_staking_histories
FOR EACH ROW
EXECUTE FUNCTION staking.prevent_domain_staking_histories_duplicate();

CREATE OR REPLACE FUNCTION staking.prevent_operator_staking_histories_duplicate() RETURNS TRIGGER
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF EXISTS (
        SELECT 1 
        FROM staking.operator_staking_histories 
        WHERE id = NEW.id
    ) THEN
        RETURN NULL;
    END IF;
    
    RETURN NEW;
END;
$$;
ALTER FUNCTION staking.prevent_operator_staking_histories_duplicate() OWNER TO postgres;

CREATE TRIGGER prevent_operator_staking_histories_duplicate
BEFORE INSERT ON staking.operator_staking_histories
FOR EACH ROW
EXECUTE FUNCTION staking.prevent_operator_staking_histories_duplicate();

CREATE OR REPLACE FUNCTION staking.insert_new_domain() RETURNS TRIGGER
    LANGUAGE plpgsql
    AS $$
BEGIN
    INSERT INTO staking.domains (
        id,
        sort_id,
        account_id,
        name,
        runtime_id,
        runtime,
        runtime_info,
        completed_epoch,
        last_domain_block_number,
        total_deposits,
        total_estimated_withdrawals,
        total_withdrawals,
        total_deposits_count,
        total_withdrawals_count,
        total_tax_collected,
        total_rewards_collected,
        total_transfers_in,
        transfers_in_count,
        total_transfers_out,
        transfers_out_count,
        total_rejected_transfers_claimed,
        rejected_transfers_claimed_count,
        total_transfers_rejected,
        transfers_rejected_count,
        total_volume,
        total_consensus_storage_fee,
        total_domain_execution_fee,
        total_burned_balance,
        current_total_stake,
        current_storage_fee_deposit,
        current_total_shares,
        current_share_price,
        current_1d_yield,
        current_7d_yield,
        current_30d_yield,
        current_1d_apy,
        current_7d_apy,
        current_30d_apy,
        accumulated_epoch_stake,
        accumulated_epoch_storage_fee_deposit,
        accumulated_epoch_rewards,
        accumulated_epoch_shares,
        bundle_count,
        reward_count,
        tax_collected_count,
        current_epoch_duration,
        last_epoch_duration,
        last6_epochs_duration,
        last144_epoch_duration,
        last1k_epoch_duration,
        last_bundle_at,
        extrinsic_id,
        created_at,
        updated_at
    ) VALUES (
        NEW.id,                    -- id from domain_instantiations
        NEW.sort_id,               -- sort_id
        NEW.created_by,            -- account_id from created_by
        NEW.name,                  -- name
        NEW.runtime_id,            -- runtime_id
        NEW.runtime,               -- runtime
        NEW.runtime_info,          -- runtime_info
        0,                         -- completed_epoch
        0,                         -- last_domain_block_number
        0,                         -- total_deposits
        0,                         -- total_estimated_withdrawals
        0,                         -- total_withdrawals
        0,                         -- total_deposits_count
        0,                         -- total_withdrawals_count
        0,                         -- total_tax_collected
        0,                         -- total_rewards_collected
        0,                         -- total_transfers_in
        0,                         -- transfers_in_count
        0,                         -- total_transfers_out
        0,                         -- transfers_out_count
        0,                         -- total_rejected_transfers_claimed
        0,                         -- rejected_transfers_claimed_count
        0,                         -- total_transfers_rejected
        0,                         -- transfers_rejected_count
        0,                         -- total_volume
        0,                         -- total_consensus_storage_fee
        0,                         -- total_domain_execution_fee
        0,                         -- total_burned_balance
        0,                         -- current_total_stake
        0,                         -- current_storage_fee_deposit
        0,                         -- current_total_shares
        0,                         -- current_share_price
        0,                         -- current_1d_yield
        0,                         -- current_7d_yield
        0,                         -- current_30d_yield
        0,                         -- current_1d_apy
        0,                         -- current_7d_apy
        0,                         -- current_30d_apy
        0,                         -- accumulated_epoch_stake
        0,                         -- accumulated_epoch_storage_fee_deposit
        0,                         -- accumulated_epoch_rewards
        0,                         -- accumulated_epoch_shares
        0,                         -- bundle_count
        0,                         -- reward_count
        0,                         -- tax_collected_count
        0,                         -- current_epoch_duration
        0,                         -- last_epoch_duration
        0,                         -- last6_epochs_duration
        0,                         -- last144_epoch_duration
        0,                         -- last1k_epoch_duration
        0,                         -- last_bundle_at
        NEW.extrinsic_id,          -- extrinsic_id
        NEW.block_height,          -- created_at
        NEW.block_height           -- updated_at
    );
    
    RETURN NEW;
END;
$$;
ALTER FUNCTION staking.insert_new_domain() OWNER TO postgres;

CREATE TRIGGER insert_new_domain
AFTER INSERT ON staking.domain_instantiations
FOR EACH ROW
EXECUTE FUNCTION staking.insert_new_domain();

CREATE OR REPLACE FUNCTION staking.insert_new_operator() RETURNS TRIGGER
    LANGUAGE plpgsql
    AS $$
BEGIN
    INSERT INTO staking.operators (
        id,
        sort_id,
        account_id,
        domain_id,
        signing_key,
        minimum_nominator_stake,
        nomination_tax,
        current_total_stake,
        current_storage_fee_deposit,
        current_epoch_rewards,
        current_total_shares,
        current_share_price,
        raw_status,
        total_deposits,
        total_estimated_withdrawals,
        total_withdrawals,
        total_deposits_count,
        total_withdrawals_count,
        total_tax_collected,
        total_rewards_collected,
        accumulated_epoch_stake,
        accumulated_epoch_storage_fee_deposit,
        accumulated_epoch_rewards,
        accumulated_epoch_shares,
        active_epoch_count,
        bundle_count,
        reward_count,
        tax_collected_count,
        current_1d_yield,
        current_7d_yield,
        current_30d_yield,
        current_1d_apy,
        current_7d_apy,
        current_30d_apy,
        status,
        last_bundle_at,
        extrinsic_id,
        created_at,
        updated_at
    ) VALUES (
        NEW.id,                                  -- id
        NEW.sort_id,                             -- sort_id
        NEW.owner,                               -- account_id
        NEW.domain_id,                           -- domain_id
        NEW.signing_key,                         -- signing_key
        NEW.minimum_nominator_stake,             -- minimum_nominator_stake
        NEW.nomination_tax,                      -- nomination_tax
        0,                                       -- current_total_stake
        0,                                       -- current_storage_fee_deposit
        0,                                       -- current_epoch_rewards
        0,                                       -- current_total_shares
        0,                                       -- current_share_price
        '{"registered":null}',                   -- raw_status
        0,                                       -- total_deposits
        0,                                       -- total_estimated_withdrawals
        0,                                       -- total_withdrawals
        0,                                       -- total_deposits_count
        0,                                       -- total_withdrawals_count
        0,                                       -- total_tax_collected
        0,                                       -- total_rewards_collected
        0,                                       -- accumulated_epoch_stake
        0,                                       -- accumulated_epoch_storage_fee_deposit
        0,                                       -- accumulated_epoch_rewards
        0,                                       -- accumulated_epoch_shares
        0,                                       -- active_epoch_count
        0,                                       -- bundle_count
        0,                                       -- reward_count
        0,                                       -- tax_collected_count
        0,                                       -- current_1d_yield
        0,                                       -- current_7d_yield
        0,                                       -- current_30d_yield
        0,                                       -- current_1d_apy
        0,                                       -- current_7d_apy
        0,                                       -- current_30d_apy
        'PENDING_NEXT_EPOCH',                    -- status
        0,                                       -- last_bundle_at
        NEW.extrinsic_id,                        -- extrinsic_id
        NEW.block_height,                        -- created_at
        NEW.block_height                         -- updated_at
    );
    
    RETURN NEW;
END;
$$;
ALTER FUNCTION staking.insert_new_operator() OWNER TO postgres;

CREATE TRIGGER insert_new_operator
AFTER INSERT ON staking.operator_registrations
FOR EACH ROW
EXECUTE FUNCTION staking.insert_new_operator();

CREATE OR REPLACE FUNCTION staking.handle_deposit_events() RETURNS TRIGGER
    LANGUAGE plpgsql
    AS $$
BEGIN
    UPDATE staking.domains
    SET 
        total_deposits = staking.domains.total_deposits + NEW.amount,
        total_deposits_count = staking.domains.total_deposits_count + 1,
        updated_at = NEW.block_height
    WHERE id = NEW.domain_id;

    UPDATE staking.operators
    SET 
        total_deposits = staking.operators.total_deposits + NEW.amount,
        total_deposits_count = staking.operators.total_deposits_count + 1,
        updated_at = NEW.block_height
    WHERE id = NEW.operator_id;

    IF NOT EXISTS (
        SELECT 1 
        FROM staking.nominators 
        WHERE id = NEW.nominator_id
    ) THEN
        INSERT INTO staking.nominators (
            id,
            account_id,
            domain_id,
            operator_id,
            known_shares,
            known_storage_fee_deposit,
            pending_amount,
            pending_storage_fee_deposit,
            pending_effective_domain_epoch,
            total_withdrawal_amounts,
            total_storage_fee_refund,
            unlock_at_confirmed_domain_block_number,
            pending_shares,
            pending_storage_fee_refund,
            total_deposits,
            total_estimated_withdrawals,
            total_withdrawals,
            total_deposits_count,
            total_withdrawals_count,
            current_total_stake,
            current_storage_fee_deposit,
            current_total_shares,
            current_share_price,
            accumulated_epoch_stake,
            accumulated_epoch_storage_fee_deposit,
            accumulated_epoch_shares,
            active_epoch_count,
            status,
            created_at,
            updated_at
        ) VALUES (
            NEW.nominator_id,                -- id
            NEW.account_id,                  -- account_id
            NEW.domain_id,                   -- domain_id
            NEW.operator_id,                 -- operator_id
            0,                               -- known_shares
            0,                               -- known_storage_fee_deposit
            0,                               -- pending_amount
            0,                               -- pending_storage_fee_deposit
            0,                               -- pending_effective_domain_epoch
            0,                               -- total_withdrawal_amounts
            0,                               -- total_storage_fee_refund
            '{}',                            -- unlock_at_confirmed_domain_block_number (empty JSONB)
            0,                               -- pending_shares
            0,                               -- pending_storage_fee_refund
            NEW.amount,                      -- total_deposits (initialize with first deposit)
            0,                               -- total_estimated_withdrawals
            0,                               -- total_withdrawals
            1,                               -- total_deposits_count (start at 1)
            0,                               -- total_withdrawals_count
            NEW.amount,                      -- current_total_stake (initialize with first deposit)
            NEW.storage_fee_deposit,         -- current_storage_fee_deposit
            0,                               -- current_total_shares
            0,                               -- current_share_price
            0,                               -- accumulated_epoch_stake
            0,                               -- accumulated_epoch_storage_fee_deposit
            0,                               -- accumulated_epoch_shares
            0,                               -- active_epoch_count
            'PENDING_NEXT_EPOCH',            -- status
            NEW.block_height,                -- created_at
            NEW.block_height                 -- updated_at
        );
    ELSE
        UPDATE staking.nominators
        SET
            total_deposits = staking.nominators.total_deposits + NEW.amount,
            total_deposits_count = staking.nominators.total_deposits_count + 1,
            updated_at = NEW.block_height
        WHERE id = NEW.nominator_id;
    END IF;

    INSERT INTO staking.deposits (
        id,
        account_id,
        domain_id,
        operator_id,
        nominator_id,
        amount,
        storage_fee_deposit,
        total_amount,
        estimated_shares,
        total_withdrawn,
        status,
        "timestamp",
        extrinsic_id,
        created_at,
        updated_at
    ) VALUES (
        NEW.id,                      -- id
        NEW.account_id,              -- account_id
        NEW.domain_id,               -- domain_id
        NEW.operator_id,             -- operator_id
        NEW.nominator_id,            -- nominator_id
        NEW.amount,                  -- amount
        NEW.storage_fee_deposit,     -- storage_fee_deposit
        NEW.total_amount,            -- total_amount
        NEW.estimated_shares,        -- estimated_shares
        0,                           -- total_withdrawn (starts at 0)
        'PENDING_NEXT_EPOCH',        -- status
        NEW."timestamp",             -- timestamp
        NEW.extrinsic_id,            -- extrinsic_id
        NEW.block_height,            -- created_at
        NEW.block_height             -- updated_at
    );

    INSERT INTO staking.accounts (
        id,
        total_deposits,
        total_estimated_withdrawals,
        total_withdrawals,
        total_deposits_count,
        total_withdrawals_count,
        total_tax_collected,
        total_tax_collected_count,
        total_rewards_collected,
        total_rewards_collected_count,
        current_total_stake,
        current_storage_fee_deposit,
        current_total_shares,
        current_share_price,
        accumulated_epoch_stake,
        accumulated_epoch_storage_fee_deposit,
        accumulated_epoch_shares,
        created_at,
        updated_at
    ) VALUES (
        NEW.account_id,            -- id
        NEW.total_amount,          -- total_deposits (start with the new deposit amount)
        0,                         -- total_estimated_withdrawals
        0,                         -- total_withdrawals
        0,                         -- total_deposits_count
        0,                         -- total_withdrawals_count
        0,                         -- total_tax_collected
        0,                         -- total_tax_collected_count
        0,                         -- total_rewards_collected
        0,                         -- total_rewards_collected_count
        NEW.amount,                -- current_total_stake
        NEW.storage_fee_deposit,   -- current_storage_fee_deposit
        0,                         -- current_total_shares
        0,                         -- current_share_price
        0,                         -- accumulated_epoch_stake
        0,                         -- accumulated_epoch_storage_fee_deposit
        0,                         -- accumulated_epoch_shares
        NEW.block_height,            -- created_at
        NEW.block_height             -- updated_at
    )
    ON CONFLICT (id) DO UPDATE SET
        total_deposits = staking.accounts.total_deposits + NEW.total_amount,
        total_deposits_count = staking.accounts.total_deposits_count + 1,
        current_total_stake = staking.accounts.current_total_stake + NEW.amount,
        current_storage_fee_deposit = staking.accounts.current_storage_fee_deposit + NEW.storage_fee_deposit,
        updated_at = NEW.block_height;
    
    RETURN NEW;
END;
$$;
ALTER FUNCTION staking.handle_deposit_events() OWNER TO postgres;

CREATE TRIGGER handle_deposit_events
AFTER INSERT ON staking.deposit_events
FOR EACH ROW
EXECUTE FUNCTION staking.handle_deposit_events();

CREATE OR REPLACE FUNCTION staking.handle_withdraw_events() RETURNS TRIGGER
    LANGUAGE plpgsql
    AS $$
  DECLARE
    last_domain_block_number staking.domain_block_histories.domain_block_number%TYPE;
    last_domain_epoch staking.domain_epochs.epoch%TYPE;
  BEGIN
    SELECT domain_block_number
    INTO last_domain_block_number
    FROM staking.domain_block_histories
    WHERE domain_id = NEW.domain_id
    ORDER BY domain_block_number DESC
    LIMIT 1;

    SELECT epoch
    INTO last_domain_epoch
    FROM staking.domain_epochs
    WHERE domain_id = NEW.domain_id
    ORDER BY epoch DESC
    LIMIT 1;

    INSERT INTO staking.withdrawals (
        id,
        account_id,
        domain_id,
        operator_id,
        nominator_id,
        shares,
        storage_fee_refund,
        estimated_amount,
        unlocked_amount,
        unlocked_storage_fee,
        total_amount,
        status,
        "timestamp",
        withdraw_extrinsic_id,
        unlock_extrinsic_id,
        epoch_withdrawal_requested_at,
        domain_block_number_withdrawal_requested_at,
        created_at,
        domain_block_number_ready_at,
        unlocked_at,
        updated_at
    ) VALUES (
        NEW.id,                      -- id
        NEW.account_id,              -- account_id
        NEW.domain_id,               -- domain_id
        NEW.operator_id,             -- operator_id
        NEW.nominator_id,            -- nominator_id
        NEW.shares,                  -- shares
        NEW.storage_fee_refund,      -- storage_fee_refund
        NEW.estimated_amount,        -- estimated_amount
        0,                           -- unlocked_amount
        0,                           -- unlocked_storage_fee
        0,                           -- total_amount
        'PENDING_NEXT_EPOCH',        -- status
        NEW."timestamp",             -- timestamp
        NEW.extrinsic_id,            -- withdraw_extrinsic_id
        0,                           -- unlock_extrinsic_id
        last_domain_epoch,           -- epoch_withdrawal_requested_at
        last_domain_block_number,    -- domain_block_number_withdrawal_requested_at
        NEW.block_height,            -- created_at
        last_domain_block_number + 14400, -- domain_block_number_ready_at
        0,                           -- unlocked_at
        NEW.block_height             -- updated_at
    );
    
    RETURN NEW;
  END;
$$;
ALTER FUNCTION staking.handle_withdraw_events() OWNER TO postgres;

CREATE TRIGGER handle_withdraw_events
AFTER INSERT ON staking.withdraw_events
FOR EACH ROW
EXECUTE FUNCTION staking.handle_withdraw_events();

CREATE OR REPLACE FUNCTION staking.handle_operator_tax_collections_events() RETURNS TRIGGER
    LANGUAGE plpgsql
    AS $$
DECLARE
    operator_account_id TEXT;
BEGIN
    SELECT account_id INTO operator_account_id
    FROM staking.operators
    WHERE id = NEW.operator_id;

    UPDATE staking.domains
    SET 
        total_tax_collected = staking.domains.total_tax_collected + NEW.amount,
        tax_collected_count = staking.domains.tax_collected_count + 1,
        updated_at = NEW.block_height
    WHERE id = NEW.domain_id;

    UPDATE staking.operators
    SET 
        total_tax_collected = staking.operators.total_tax_collected + NEW.amount,
        tax_collected_count = staking.operators.tax_collected_count + 1,
        updated_at = NEW.block_height
    WHERE id = NEW.operator_id;

    UPDATE staking.accounts
    SET 
        total_tax_collected = staking.accounts.total_tax_collected + NEW.amount,
        total_tax_collected_count = staking.accounts.total_tax_collected_count + 1,
        updated_at = NEW.block_height
    WHERE id = operator_account_id;
    
    RETURN NEW;
END;
$$;
ALTER FUNCTION staking.handle_operator_tax_collections_events() OWNER TO postgres;

CREATE TRIGGER handle_operator_tax_collections_events
AFTER INSERT ON staking.operator_tax_collections
FOR EACH ROW
EXECUTE FUNCTION staking.handle_operator_tax_collections_events();

CREATE OR REPLACE FUNCTION staking.handle_operator_rewards_events() RETURNS TRIGGER
    LANGUAGE plpgsql
    AS $$
DECLARE
    operator_account_id TEXT;
BEGIN
    SELECT account_id INTO operator_account_id
    FROM staking.operators
    WHERE id = NEW.operator_id;

    UPDATE staking.domains
    SET 
        total_rewards_collected = staking.domains.total_rewards_collected + NEW.amount,
        reward_count = staking.domains.reward_count + 1,
        updated_at = NEW.block_height
    WHERE id = NEW.domain_id;

    UPDATE staking.operators
    SET 
        total_rewards_collected = staking.operators.total_rewards_collected + NEW.amount,
        reward_count = staking.operators.reward_count + 1,
        updated_at = NEW.block_height
    WHERE id = NEW.operator_id;

    UPDATE staking.accounts
    SET 
        total_rewards_collected = staking.accounts.total_rewards_collected + NEW.amount,
        total_rewards_collected_count = staking.accounts.total_rewards_collected_count + 1,
        updated_at = NEW.block_height
    WHERE id = operator_account_id;
    
    RETURN NEW;
END;
$$;
ALTER FUNCTION staking.handle_operator_rewards_events() OWNER TO postgres;

CREATE TRIGGER handle_operator_rewards_events
AFTER INSERT ON staking.operator_rewards
FOR EACH ROW
EXECUTE FUNCTION staking.handle_operator_rewards_events();

CREATE OR REPLACE FUNCTION staking.handle_bundle_submissions_events() RETURNS TRIGGER
    LANGUAGE plpgsql
    AS $$
BEGIN
    UPDATE staking.domains
    SET 
        total_transfers_in = staking.domains.total_transfers_in + NEW.total_transfers_in,
        transfers_in_count = staking.domains.transfers_in_count + NEW.transfers_in_count,
        total_transfers_out = staking.domains.total_transfers_out + NEW.total_transfers_out,
        transfers_out_count = staking.domains.transfers_out_count + NEW.transfers_out_count,
        total_rejected_transfers_claimed = staking.domains.total_rejected_transfers_claimed + NEW.total_rejected_transfers_claimed,
        rejected_transfers_claimed_count = staking.domains.rejected_transfers_claimed_count + NEW.rejected_transfers_claimed_count,
        total_transfers_rejected = staking.domains.total_transfers_rejected + NEW.total_transfers_rejected,
        transfers_rejected_count = staking.domains.transfers_rejected_count + NEW.transfers_rejected_count,
        total_volume = staking.domains.total_volume + NEW.total_volume,
        total_consensus_storage_fee = staking.domains.total_consensus_storage_fee + NEW.consensus_storage_fee,
        total_domain_execution_fee = staking.domains.total_domain_execution_fee + NEW.domain_execution_fee,
        total_burned_balance = staking.domains.total_burned_balance + NEW.burned_balance,
        bundle_count = staking.domains.bundle_count + 1,
        last_bundle_at = NEW.consensus_block_number,
        updated_at = NEW.block_height
    WHERE id = NEW.domain_id;

    UPDATE staking.operators
    SET 
        bundle_count = staking.operators.bundle_count + 1,
        last_bundle_at = NEW.consensus_block_number,
        updated_at = NEW.block_height
    WHERE id = NEW.operator_id;
    
    RETURN NEW;
END;
$$;
ALTER FUNCTION staking.handle_bundle_submissions_events() OWNER TO postgres;

CREATE TRIGGER handle_bundle_submissions_events
AFTER INSERT ON staking.bundle_submissions
FOR EACH ROW
EXECUTE FUNCTION staking.handle_bundle_submissions_events();

CREATE OR REPLACE FUNCTION staking.update_operator_stakes() RETURNS TRIGGER
    LANGUAGE plpgsql
    AS $$
  DECLARE
    share_price_1d_old staking.operator_staking_histories.share_price%TYPE := '1000000000000000000';
    share_price_7d_old staking.operator_staking_histories.share_price%TYPE := '1000000000000000000';
    share_price_30d_old staking.operator_staking_histories.share_price%TYPE := '1000000000000000000';
    calc_1d_yield NUMERIC;
    calc_7d_yield NUMERIC;
    calc_30d_yield NUMERIC;
    calc_1d_apy NUMERIC;
    calc_7d_apy NUMERIC;
    calc_30d_apy NUMERIC;
    divisor NUMERIC := 1000000000000000000;
  BEGIN
    SELECT share_price
    INTO share_price_1d_old
    FROM staking.operator_staking_histories
    WHERE operator_id = NEW.operator_id
    ORDER BY ABS(EXTRACT(EPOCH FROM (timestamp - (NEW.timestamp - INTERVAL '1 day'))))
    LIMIT 1;

    SELECT share_price
    INTO share_price_7d_old
    FROM staking.operator_staking_histories
    WHERE operator_id = NEW.operator_id
    ORDER BY ABS(EXTRACT(EPOCH FROM (timestamp - (NEW.timestamp - INTERVAL '7 days'))))
    LIMIT 1;

    SELECT share_price
    INTO share_price_30d_old
    FROM staking.operator_staking_histories
    WHERE operator_id = NEW.operator_id
    ORDER BY ABS(EXTRACT(EPOCH FROM (timestamp - (NEW.timestamp - INTERVAL '30 days'))))
    LIMIT 1;

    -- Calculate yields with explicit NUMERIC casts to avoid overflow
    -- For 1-day: (NEW.share_price / share_price_1d_old - 1)
    calc_1d_yield := CASE 
      WHEN CAST(share_price_1d_old AS NUMERIC) > 0 THEN 
        ((CAST(NEW.share_price AS NUMERIC) / CAST(share_price_1d_old AS NUMERIC)) - 1.0)
      ELSE 0
    END;

    -- For 7-day: (NEW.share_price / share_price_7d_old - 1)
    calc_7d_yield := CASE 
      WHEN CAST(share_price_7d_old AS NUMERIC) > 0 THEN 
        ((CAST(NEW.share_price AS NUMERIC) / CAST(share_price_7d_old AS NUMERIC)) - 1.0)
      ELSE 0
    END;

    -- For 30-day: (NEW.share_price / share_price_30d_old - 1)
    calc_30d_yield := CASE 
      WHEN CAST(share_price_30d_old AS NUMERIC) > 0 THEN 
        ((CAST(NEW.share_price AS NUMERIC) / CAST(share_price_30d_old AS NUMERIC)) - 1.0)
      ELSE 0
    END;

    -- Calculate APYs with explicit NUMERIC casts to avoid overflow
    -- For 1-day: (1 + 1d_yield_calc) ^ 365 - 1
    calc_1d_apy := CASE 
      WHEN calc_1d_yield >= 0 THEN 
        ((1.0 + calc_1d_yield) ^ 365.0) - 1.0
      ELSE 0
    END;

    -- For 7-day: (1 + 7d_yield_calc) ^ 365 - 1
    calc_7d_apy := CASE 
      WHEN calc_7d_yield >= 0 THEN 
        ((1.0 + calc_7d_yield) ^ (365.0 / 7.0)) - 1.0
      ELSE 0
    END;

    -- For 30-day: (1 + 30d_yield_calc) ^ 365 - 1
    calc_30d_apy := CASE 
      WHEN calc_30d_yield >= 0 THEN 
        ((1.0 + calc_30d_yield) ^ (365.0 / 30.0)) - 1.0
      ELSE 0
    END;

    UPDATE staking.operators
    SET 
        current_total_stake = NEW.current_total_stake,
        current_storage_fee_deposit = NEW.total_storage_fee_deposit,
        current_total_shares = NEW.current_total_shares,
        current_share_price = NEW.share_price,
        raw_status = NEW.partial_status,
        current_1d_yield = calc_1d_yield,
        current_7d_yield = calc_7d_yield,
        current_30d_yield = calc_30d_yield,
        current_1d_apy = calc_1d_apy,
        current_7d_apy = calc_7d_apy,
        current_30d_apy = calc_30d_apy,
        updated_at = NEW.block_height
    WHERE id = NEW.operator_id;
    
    RETURN NEW;
  END;
$$;
ALTER FUNCTION staking.update_operator_stakes() OWNER TO postgres;

CREATE TRIGGER update_operator_stakes_trigger
AFTER INSERT ON staking.operator_staking_histories
FOR EACH ROW
EXECUTE FUNCTION staking.update_operator_stakes();

CREATE OR REPLACE FUNCTION staking.update_domain_stakes() RETURNS TRIGGER
    LANGUAGE plpgsql
    AS $$
  DECLARE
    last_domain_block_number staking.domain_block_histories.domain_block_number%TYPE;
    share_price_1d_old staking.operator_staking_histories.share_price%TYPE := '1000000000000000000';
    share_price_7d_old staking.operator_staking_histories.share_price%TYPE := '1000000000000000000';
    share_price_30d_old staking.operator_staking_histories.share_price%TYPE := '1000000000000000000';
    calc_1d_yield NUMERIC;
    calc_7d_yield NUMERIC;
    calc_30d_yield NUMERIC;
    calc_1d_apy NUMERIC;
    calc_7d_apy NUMERIC;
    calc_30d_apy NUMERIC;
  BEGIN
    SELECT domain_block_number
    INTO last_domain_block_number
    FROM staking.domain_block_histories
    WHERE domain_id = NEW.domain_id
    ORDER BY block_height DESC
    LIMIT 1;

    IF NOT FOUND THEN
        last_domain_block_number := 0;
    END IF;

    SELECT share_price
    INTO share_price_1d_old
    FROM staking.domain_staking_histories
    WHERE domain_id = NEW.domain_id
    ORDER BY ABS(EXTRACT(EPOCH FROM (timestamp - (NEW.timestamp - INTERVAL '1 day'))))
    LIMIT 1;

    SELECT share_price
    INTO share_price_7d_old
    FROM staking.domain_staking_histories
    WHERE domain_id = NEW.domain_id
    ORDER BY ABS(EXTRACT(EPOCH FROM (timestamp - (NEW.timestamp - INTERVAL '7 days'))))
    LIMIT 1;

    SELECT share_price
    INTO share_price_30d_old
    FROM staking.domain_staking_histories
    WHERE domain_id = NEW.domain_id
    ORDER BY ABS(EXTRACT(EPOCH FROM (timestamp - (NEW.timestamp - INTERVAL '30 days'))))
    LIMIT 1;

    -- Calculate yields with explicit NUMERIC casts to avoid overflow
    -- For 1-day: (NEW.share_price / share_price_1d_old - 1)
    calc_1d_yield := CASE 
      WHEN CAST(share_price_1d_old AS NUMERIC) > 0 THEN 
        ((CAST(NEW.share_price AS NUMERIC) / CAST(share_price_1d_old AS NUMERIC)) - 1.0)
      ELSE 0
    END;

    -- For 7-day: (NEW.share_price / share_price_7d_old - 1)
    calc_7d_yield := CASE 
      WHEN CAST(share_price_7d_old AS NUMERIC) > 0 THEN 
        ((CAST(NEW.share_price AS NUMERIC) / CAST(share_price_7d_old AS NUMERIC)) - 1.0)
      ELSE 0
    END;

    -- For 30-day: (NEW.share_price / share_price_30d_old - 1)
    calc_30d_yield := CASE 
      WHEN CAST(share_price_30d_old AS NUMERIC) > 0 THEN 
        ((CAST(NEW.share_price AS NUMERIC) / CAST(share_price_30d_old AS NUMERIC)) - 1.0)
      ELSE 0
    END;

    -- Calculate APYs with explicit NUMERIC casts to avoid overflow
    -- For 1-day: (1 + 1d_yield_calc) ^ 365 - 1
    calc_1d_apy := CASE 
      WHEN calc_1d_yield >= 0 THEN 
        ((1.0 + calc_1d_yield) ^ 365.0) - 1.0
      ELSE 0
    END;

    -- For 7-day: (1 + 7d_yield_calc) ^ 365 - 1
    calc_7d_apy := CASE 
      WHEN calc_7d_yield >= 0 THEN 
        ((1.0 + calc_7d_yield) ^ (365.0 / 7.0)) - 1.0
      ELSE 0
    END;

    -- For 30-day: (1 + 30d_yield_calc) ^ 365 - 1
    calc_30d_apy := CASE 
      WHEN calc_30d_yield >= 0 THEN 
        ((1.0 + calc_30d_yield) ^ (365.0 / 30.0)) - 1.0
      ELSE 0
    END;

    UPDATE staking.domains
    SET 
        current_total_stake = NEW.current_total_stake,
        completed_epoch = NEW.current_epoch_index,
        current_total_shares = NEW.current_total_shares,
        current_share_price = NEW.share_price,
        current_1d_yield = calc_1d_yield,
        current_7d_yield = calc_7d_yield,
        current_30d_yield = calc_30d_yield,
        current_1d_apy = calc_1d_apy,
        current_7d_apy = calc_7d_apy,
        current_30d_apy = calc_30d_apy,
        updated_at = NEW.block_height
    WHERE id = NEW.domain_id;

    INSERT INTO staking.domain_epochs (
        id,
        domain_id,
        epoch,
        domain_block_number_start,
        domain_block_number_end,
        domain_block_count,
        timestamp_start,
        timestamp_end,
        epoch_duration,
        consensus_block_number_start,
        consensus_block_number_end,
        consensus_block_count,
        created_at,
        updated_at
    ) VALUES (
        NEW.domain_id || '-' || NEW.current_epoch_index,
        NEW.domain_id,
        NEW.current_epoch_index,
        last_domain_block_number,
        last_domain_block_number,
        1,
        NEW.timestamp,
        NEW.timestamp,
        0,
        NEW.block_height,
        NEW.block_height,
        1,
        NEW.block_height,
        NEW.block_height
    ) ON CONFLICT (id) DO UPDATE SET
        domain_block_number_start = CASE 
            WHEN staking.domain_epochs.domain_block_number_start = 0 
            THEN last_domain_block_number 
            ELSE staking.domain_epochs.domain_block_number_start 
        END,
        domain_block_number_end = last_domain_block_number,
        domain_block_count = staking.domain_epochs.domain_block_count + 1,
        timestamp_end = NEW.timestamp,
        epoch_duration = EXTRACT(EPOCH FROM (NEW.timestamp - staking.domain_epochs.timestamp_start)),
        consensus_block_number_end = NEW.block_height,
        consensus_block_count = staking.domain_epochs.consensus_block_count + 1,
        updated_at = NEW.block_height;

    UPDATE staking.withdrawals
    SET 
        status = 'PENDING_UNLOCK_FUNDS',
        updated_at = NEW.block_height
    WHERE status = 'PENDING_CHALLENGE_PERIOD' AND domain_block_number_withdrawal_requested_at <= last_domain_block_number;
    
    RETURN NEW;
  END;
$$;
ALTER FUNCTION staking.update_domain_stakes() OWNER TO postgres;

CREATE TRIGGER update_domain_stakes_trigger
AFTER INSERT ON staking.domain_staking_histories
FOR EACH ROW
EXECUTE FUNCTION staking.update_domain_stakes();

CREATE OR REPLACE FUNCTION staking.handle_domain_epochs() RETURNS TRIGGER
    LANGUAGE plpgsql
    AS $$
  BEGIN
    UPDATE staking.operators
    SET 
        status = 'ACTIVE',
        updated_at = NEW.created_at
    WHERE status = 'PENDING_NEXT_EPOCH';

    UPDATE staking.nominators
    SET 
        status = 'ACTIVE',
        updated_at = NEW.created_at
    WHERE status = 'PENDING_NEXT_EPOCH';

    UPDATE staking.deposits
    SET 
        status = 'ACTIVE',
        updated_at = NEW.created_at
    WHERE status = 'PENDING_NEXT_EPOCH';

    UPDATE staking.withdrawals
    SET 
        status = 'PENDING_CHALLENGE_PERIOD',
        updated_at = NEW.created_at
    WHERE status = 'PENDING_NEXT_EPOCH';
    
    RETURN NEW;
  END;
$$;
ALTER FUNCTION staking.handle_domain_epochs() OWNER TO postgres;

CREATE TRIGGER handle_domain_epochs_trigger
AFTER INSERT ON staking.domain_epochs
FOR EACH ROW
EXECUTE FUNCTION staking.handle_domain_epochs();

CREATE OR REPLACE FUNCTION staking.update_operator_on_deregistration() RETURNS TRIGGER
    LANGUAGE plpgsql
    AS $$
BEGIN
    UPDATE staking.operators
    SET 
        status = 'DEREGISTERED',
        updated_at = NEW.block_height
    WHERE id = NEW.id;

    RETURN NEW;
END;
$$;
ALTER FUNCTION staking.update_operator_on_deregistration() OWNER TO postgres;

CREATE TRIGGER update_operator_on_deregistration_trigger
AFTER INSERT ON staking.operator_deregistrations
FOR EACH ROW
EXECUTE FUNCTION staking.update_operator_on_deregistration();

CREATE OR REPLACE FUNCTION staking.handle_unlocked_events() RETURNS TRIGGER
    LANGUAGE plpgsql
    AS $$
DECLARE
    remaining_amount numeric;
    current_deposit RECORD;
    found_eligible_deposits boolean;
    deposit_cursor CURSOR FOR 
        SELECT id, amount, storage_fee_deposit, total_amount, total_withdrawn, status
        FROM staking.deposits
        WHERE (status = 'ACTIVE' OR status = 'PARTIALLY_WITHDRAWN') 
        AND account_id = NEW.account_id
        ORDER BY created_at ASC;
    withdrawal_id text;
    last_domain_block_number staking.domain_block_histories.domain_block_number%TYPE;
    last_domain_epoch staking.domain_epochs.epoch%TYPE;
BEGIN
    SELECT id INTO withdrawal_id
    FROM staking.withdrawals
    WHERE status = 'PENDING_UNLOCK_FUNDS' AND account_id = NEW.account_id
    ORDER BY created_at ASC
    LIMIT 1;

    SELECT domain_block_number
    INTO last_domain_block_number
    FROM staking.domain_block_histories
    WHERE domain_id = NEW.domain_id
    ORDER BY domain_block_number DESC
    LIMIT 1;

    SELECT epoch
    INTO last_domain_epoch
    FROM staking.domain_epochs
    WHERE domain_id = NEW.domain_id
    ORDER BY epoch DESC
    LIMIT 1;

    UPDATE staking.domains
    SET 
        total_withdrawals = staking.domains.total_withdrawals + NEW.amount,
        total_withdrawals_count = staking.domains.total_withdrawals_count + 1,
        updated_at = NEW.block_height
    WHERE id = NEW.domain_id;

    UPDATE staking.operators
    SET 
        total_withdrawals = staking.operators.total_withdrawals + NEW.amount,
        total_withdrawals_count = staking.operators.total_withdrawals_count + 1,
        updated_at = NEW.block_height
    WHERE id = NEW.operator_id;

    UPDATE staking.nominators
    SET
        total_withdrawal_amounts = staking.nominators.total_withdrawal_amounts + NEW.amount,
        total_storage_fee_refund = staking.nominators.total_storage_fee_refund + NEW.storage_fee,
        total_withdrawals = staking.nominators.total_withdrawals + NEW.amount,
        total_withdrawals_count = staking.nominators.total_withdrawals_count + 1,
        updated_at = NEW.block_height
    WHERE id = NEW.nominator_id;

    UPDATE staking.accounts
    SET
        total_withdrawals = staking.accounts.total_withdrawals + NEW.amount,
        total_withdrawals_count = staking.accounts.total_withdrawals_count + 1,
        updated_at = NEW.block_height
    WHERE id = NEW.account_id;

    IF withdrawal_id IS NOT NULL THEN
        UPDATE staking.withdrawals
        SET
            unlocked_amount = NEW.amount,
            unlocked_storage_fee = NEW.storage_fee,
            total_amount = NEW.amount + NEW.storage_fee,
            unlock_extrinsic_id = NEW.extrinsic_id,
            status = 'FUNDS_UNLOCKED',
            unlocked_at = NEW.block_height,
            updated_at = NEW.block_height
        WHERE id = withdrawal_id;
    ELSE
        INSERT INTO staking.withdrawals (
            id, 
            account_id, 
            domain_id, 
            operator_id, 
            nominator_id, 
            shares, 
            storage_fee_refund, 
            estimated_amount, 
            unlocked_amount, 
            unlocked_storage_fee, 
            total_amount, 
            status, 
            timestamp,
            withdraw_extrinsic_id,
            unlock_extrinsic_id,
            epoch_withdrawal_requested_at,
            domain_block_number_withdrawal_requested_at,
            created_at,
            domain_block_number_ready_at,
            unlocked_at,
            updated_at
        ) VALUES (
            NEW.extrinsic_id || '-' || NEW.account_id,      -- id
            NEW.account_id,                                 -- account_id
            NEW.domain_id,                                  -- domain_id
            NEW.operator_id,                                -- operator_id
            NEW.nominator_id,                               -- nominator_id
            0, -- To-Fix                                    -- shares
            NEW.storage_fee,                                -- storage_fee_refund
            NEW.amount + NEW.storage_fee,                   -- estimated_amount
            NEW.amount,                                     -- unlocked_amount
            NEW.storage_fee,                                -- unlocked_storage_fee
            NEW.amount + NEW.storage_fee,                   -- total_amount
            'FUNDS_UNLOCKED',                               -- status
            NEW.timestamp,                                  -- timestamp
            NEW.extrinsic_id,                               -- withdraw_extrinsic_id
            NEW.extrinsic_id,                               -- unlock_extrinsic_id
            last_domain_epoch,                              -- epoch_withdrawal_requested_at
            last_domain_block_number                        -- domain_block_number_withdrawal_requested_at
            NEW.block_height,                               -- created_at
            last_domain_block_number,                       -- domain_block_number_ready_at
            NEW.block_height,                               -- unlocked_at
            NEW.block_height                                -- updated_at
        );
    END IF;

    remaining_amount := NEW.amount + NEW.storage_fee;
    found_eligible_deposits := FALSE;

    OPEN deposit_cursor;
    LOOP
        FETCH deposit_cursor INTO current_deposit;
        EXIT WHEN NOT FOUND;
        
        IF (current_deposit.total_amount - current_deposit.total_withdrawn) >= remaining_amount THEN
            UPDATE staking.deposits
            SET
                total_withdrawn = total_withdrawn + remaining_amount,
                status = CASE 
                        WHEN (total_withdrawn + remaining_amount) >= total_amount THEN 'FULLY_WITHDRAWN'
                        ELSE 'PARTIALLY_WITHDRAWN'
                    END,
                updated_at = NEW.block_height
            WHERE id = current_deposit.id;
            
            remaining_amount := 0;
            found_eligible_deposits := TRUE;
            EXIT;
        ELSE
            UPDATE staking.deposits
            SET
                total_withdrawn = total_amount,
                status = 'FULLY_WITHDRAWN',
                updated_at = NEW.block_height
            WHERE id = current_deposit.id;
            
            remaining_amount := remaining_amount - (current_deposit.total_amount - current_deposit.total_withdrawn);
            found_eligible_deposits := TRUE;
        END IF;
    END LOOP;
    
    CLOSE deposit_cursor;
    
    IF remaining_amount > 0 AND found_eligible_deposits = TRUE THEN
        SELECT id INTO deposit_to_update_id
        FROM staking.deposits
        WHERE account_id = NEW.account_id AND status = 'FULLY_WITHDRAWN'
        ORDER BY created_at DESC
        LIMIT 1;
        
        IF deposit_to_update_id IS NOT NULL THEN
            UPDATE staking.deposits
            SET
                total_withdrawn = total_withdrawn + remaining_amount,
                updated_at = NEW.block_height
            WHERE id = deposit_to_update_id;
        END IF;
    ELSIF remaining_amount > 0 AND found_eligible_deposits = FALSE THEN
        RAISE NOTICE 'No active or partially withdrawn deposits found for account %. Withdrawing amount: %', 
            NEW.account_id, remaining_amount;
    END IF;

    RETURN NEW;
END;
$$;
ALTER FUNCTION staking.handle_unlocked_events() OWNER TO postgres;

CREATE TRIGGER handle_unlocked_events
AFTER INSERT ON staking.unlocked_events
FOR EACH ROW
EXECUTE FUNCTION staking.handle_unlocked_events();


CREATE OR REPLACE FUNCTION staking.handle_nominators_unlocked_events() RETURNS TRIGGER
    LANGUAGE plpgsql
    AS $$
BEGIN
    UPDATE staking.operators
    SET 
        status = 'NOMINATORS_UNLOCKED',
        updated_at = NEW.block_height
    WHERE id = NEW.operator_id;

    RETURN NEW;
END;
$$;
ALTER FUNCTION staking.handle_nominators_unlocked_events() OWNER TO postgres;

CREATE TRIGGER handle_nominators_unlocked_events
AFTER INSERT ON staking.nominators_unlocked_events
FOR EACH ROW
EXECUTE FUNCTION staking.handle_nominators_unlocked_events();


CREATE FUNCTION domain_auto_evm.insert_log_kind() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
  BEGIN
    INSERT INTO domain_auto_evm.log_kinds (id, kind)
    VALUES (NEW.kind, NEW.kind)
    ON CONFLICT (id) DO NOTHING;
    
    RETURN NEW;
  END;
  $$;
ALTER FUNCTION domain_auto_evm.insert_log_kind() OWNER TO postgres;

CREATE TRIGGER ensure_domain_auto_evm_log_kind
    BEFORE INSERT ON domain_auto_evm.logs
    FOR EACH ROW
    EXECUTE FUNCTION domain_auto_evm.insert_log_kind();

CREATE FUNCTION domain_auto_evm.insert_event_module() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
  BEGIN
    INSERT INTO domain_auto_evm.event_modules (id, section, method)
    VALUES (NEW.name, NEW.section, NEW.module)
    ON CONFLICT (id) DO NOTHING;

    INSERT INTO domain_auto_evm.sections (id, section)
    VALUES (NEW.section, NEW.section)
    ON CONFLICT (id) DO NOTHING;
    
    RETURN NEW;
  END;
  $$;
ALTER FUNCTION domain_auto_evm.insert_event_module() OWNER TO postgres;

CREATE TRIGGER ensure_domain_auto_evm_event_module
    BEFORE INSERT ON domain_auto_evm.events
    FOR EACH ROW
    EXECUTE FUNCTION domain_auto_evm.insert_event_module();

CREATE FUNCTION domain_auto_evm.insert_extrinsic_module() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
  BEGIN
    INSERT INTO domain_auto_evm.extrinsic_modules (id, section, method)
    VALUES (NEW.name, NEW.section, NEW.module)
    ON CONFLICT (id) DO NOTHING;

    INSERT INTO domain_auto_evm.sections (id, section)
    VALUES (NEW.section, NEW.section)
    ON CONFLICT (id) DO NOTHING;
    
    RETURN NEW;
  END;
  $$;
ALTER FUNCTION domain_auto_evm.insert_extrinsic_module() OWNER TO postgres;

CREATE TRIGGER ensure_domain_auto_evm_extrinsic_module
    BEFORE INSERT ON domain_auto_evm.extrinsics
    FOR EACH ROW
    EXECUTE FUNCTION domain_auto_evm.insert_extrinsic_module();

CREATE FUNCTION domain_auto_evm.update_account() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
  BEGIN
    INSERT INTO domain_auto_evm.accounts (
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
ALTER FUNCTION domain_auto_evm.update_account() OWNER TO postgres;

CREATE TRIGGER ensure_domain_auto_evm_account_updated
    BEFORE INSERT ON domain_auto_evm.account_histories
    FOR EACH ROW
    EXECUTE FUNCTION domain_auto_evm.update_account();

CREATE FUNCTION domain_auto_evm.update_cumulative_blocks() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
  DECLARE
    prev_cumulative domain_auto_evm.cumulative_blocks%ROWTYPE;
  BEGIN
    SELECT *
    INTO prev_cumulative
    FROM domain_auto_evm.cumulative_blocks
    WHERE id = text(NEW.height - 1);

    IF prev_cumulative IS NULL THEN
      prev_cumulative.cumulative_extrinsics_count := 0;
      prev_cumulative.cumulative_events_count := 0;
      prev_cumulative.cumulative_logs_count := 0;
      prev_cumulative.cumulative_transfers_count := 0;
      prev_cumulative.cumulative_transfer_value := 0;
    END IF;

    INSERT INTO domain_auto_evm.cumulative_blocks (
      id,
      cumulative_extrinsics_count,
      cumulative_events_count,
      cumulative_logs_count,
      cumulative_transfers_count,
      cumulative_transfer_value
    )
    VALUES (
      NEW.id,
      prev_cumulative.cumulative_extrinsics_count + NEW.extrinsics_count,
      prev_cumulative.cumulative_events_count + NEW.events_count,
      prev_cumulative.cumulative_logs_count + NEW.logs_count,
      prev_cumulative.cumulative_transfers_count + NEW.transfers_count,
      prev_cumulative.cumulative_transfer_value + NEW.transfer_value
    )
    ON CONFLICT (id) DO UPDATE SET
      cumulative_extrinsics_count = prev_cumulative.cumulative_extrinsics_count + NEW.extrinsics_count,
      cumulative_events_count = prev_cumulative.cumulative_events_count + NEW.events_count,
      cumulative_logs_count = prev_cumulative.cumulative_logs_count + NEW.logs_count,
      cumulative_transfers_count = prev_cumulative.cumulative_transfers_count + NEW.transfers_count,
      cumulative_transfer_value = prev_cumulative.cumulative_transfer_value + NEW.transfer_value;

    RETURN NEW;
  END;
  $$;
ALTER FUNCTION domain_auto_evm.update_cumulative_blocks() OWNER TO postgres;

CREATE TRIGGER ensure_domain_auto_evm_cumulative_blocks
    BEFORE INSERT ON domain_auto_evm.blocks
    FOR EACH ROW
    EXECUTE FUNCTION domain_auto_evm.update_cumulative_blocks();

CREATE OR REPLACE FUNCTION domain_auto_evm.prevent_evm_code_selectors_duplicate() RETURNS TRIGGER
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF EXISTS (
        SELECT 1 
        FROM domain_auto_evm.evm_code_selectors 
        WHERE id = NEW.id
    ) THEN
        RETURN NULL;
    END IF;
    
    RETURN NEW;
END;
$$;
ALTER FUNCTION domain_auto_evm.prevent_evm_code_selectors_duplicate() OWNER TO postgres;

CREATE TRIGGER prevent_domain_auto_evm_evm_code_selectors_duplicate
BEFORE INSERT ON domain_auto_evm.evm_code_selectors
FOR EACH ROW
EXECUTE FUNCTION domain_auto_evm.prevent_evm_code_selectors_duplicate();