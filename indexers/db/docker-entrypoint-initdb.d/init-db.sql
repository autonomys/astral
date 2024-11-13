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

SET default_tablespace = '';

SET default_table_access_method = heap;

CREATE TABLE consensus._metadata (
    key character varying(255) NOT NULL,
    value jsonb,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
ALTER TABLE consensus._metadata OWNER TO postgres;

CREATE TABLE leaderboard._metadata (
    key character varying(255) NOT NULL,
    value jsonb,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
ALTER TABLE leaderboard._metadata OWNER TO postgres;

CREATE TABLE consensus.account_histories (
    id text NOT NULL,
    nonce numeric NOT NULL,
    free numeric NOT NULL,
    reserved numeric NOT NULL,
    total numeric,
    created_at numeric NOT NULL,
    updated_at numeric NOT NULL,
    _id uuid NOT NULL,
    _block_range int8range NOT NULL
);
ALTER TABLE consensus.account_histories OWNER TO postgres;

CREATE TABLE consensus.account_profiles (
    id text NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    icon text NOT NULL,
    banner text NOT NULL,
    website text NOT NULL,
    website_verified boolean NOT NULL,
    email text NOT NULL,
    email_verified boolean NOT NULL,
    discord text NOT NULL,
    github text NOT NULL,
    twitter text NOT NULL,
    proof_message text NOT NULL,
    proof_signature text NOT NULL,
    created_at numeric NOT NULL,
    updated_at numeric NOT NULL,
    _id uuid NOT NULL,
    _block_range int8range NOT NULL
);
ALTER TABLE consensus.account_profiles OWNER TO postgres;

CREATE TABLE consensus.account_rewards (
    id text NOT NULL,
    total_rewards_value numeric,
    total_rewards_counts numeric,
    block_rewards_value numeric,
    block_rewards_counts numeric,
    vote_rewards_value numeric,
    vote_rewards_counts numeric,
    estimated_staking_rewards_value numeric,
    estimated_staking_rewards_counts numeric,
    created_at numeric NOT NULL,
    updated_at numeric NOT NULL,
    _id uuid NOT NULL,
    _block_range int8range NOT NULL
);
ALTER TABLE consensus.account_rewards OWNER TO postgres;

CREATE TABLE consensus.accounts (
    id text NOT NULL,
    nonce numeric NOT NULL,
    free numeric NOT NULL,
    reserved numeric NOT NULL,
    total numeric,
    created_at numeric NOT NULL,
    updated_at numeric NOT NULL,
    _id uuid NOT NULL,
    _block_range int8range NOT NULL
);
ALTER TABLE consensus.accounts OWNER TO postgres;

CREATE TABLE consensus.blocks (
    id text NOT NULL,
    sort_id text NOT NULL,
    height numeric NOT NULL,
    hash text NOT NULL,
    "timestamp" timestamp without time zone NOT NULL,
    parent_hash text NOT NULL,
    spec_id text NOT NULL,
    state_root text NOT NULL,
    extrinsics_root text NOT NULL,
    space_pledged numeric NOT NULL,
    blockchain_size numeric NOT NULL,
    extrinsics_count integer NOT NULL,
    events_count integer NOT NULL,
    author_id text NOT NULL,
    _id uuid NOT NULL,
    _block_range int8range NOT NULL
);
ALTER TABLE consensus.blocks OWNER TO postgres;

CREATE TABLE consensus.event_modules (
    id text NOT NULL,
    section text NOT NULL,
    method text NOT NULL,
    _id uuid NOT NULL,
    _block_range int8range NOT NULL
);
ALTER TABLE consensus.event_modules OWNER TO postgres;

CREATE TABLE consensus.events (
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
ALTER TABLE consensus.events OWNER TO postgres;

CREATE TABLE consensus.extrinsic_modules (
    id text NOT NULL,
    section text NOT NULL,
    method text NOT NULL,
    _id uuid NOT NULL,
    _block_range int8range NOT NULL
);
ALTER TABLE consensus.extrinsic_modules OWNER TO postgres;

CREATE TABLE consensus.extrinsics (
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
    args text NOT NULL,
    error text NOT NULL,
    tip numeric NOT NULL,
    fee numeric NOT NULL,
    pos integer NOT NULL,
    _id uuid NOT NULL,
    _block_range int8range NOT NULL
);
ALTER TABLE consensus.extrinsics OWNER TO postgres;

CREATE TABLE consensus.log_kinds (
    id text NOT NULL,
    _id uuid NOT NULL,
    _block_range int8range NOT NULL
);
ALTER TABLE consensus.log_kinds OWNER TO postgres;

CREATE TABLE consensus.logs (
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
ALTER TABLE consensus.logs OWNER TO postgres;

CREATE TABLE consensus.rewards (
    id text NOT NULL,
    block_height numeric NOT NULL,
    block_hash text NOT NULL,
    account_id text NOT NULL,
    index_in_block numeric NOT NULL,
    reward_type text NOT NULL,
    amount numeric NOT NULL,
    "timestamp" timestamp without time zone NOT NULL,
    _id uuid NOT NULL,
    _block_range int8range NOT NULL
);
ALTER TABLE consensus.rewards OWNER TO postgres;

CREATE TABLE consensus.sections (
    id text NOT NULL,
    _id uuid NOT NULL,
    _block_range int8range NOT NULL
);
ALTER TABLE consensus.sections OWNER TO postgres;

CREATE TABLE consensus.transfers (
    id text NOT NULL,
    extrinsic_id text NOT NULL,
    event_id text NOT NULL,
    "from" text NOT NULL,
    "to" text NOT NULL,
    value numeric NOT NULL,
    fee numeric NOT NULL,
    success boolean NOT NULL,
    "timestamp" numeric NOT NULL,
    date timestamp without time zone NOT NULL,
    created_at numeric NOT NULL,
    _id uuid NOT NULL,
    _block_range int8range NOT NULL
);
ALTER TABLE consensus.transfers OWNER TO postgres;

CREATE TABLE dictionary._metadata (
    key character varying(255) NOT NULL,
    value jsonb,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
ALTER TABLE dictionary._metadata OWNER TO postgres;

CREATE TABLE dictionary.events (
    id text NOT NULL,
    module text NOT NULL,
    event text NOT NULL,
    block_height numeric NOT NULL
);
ALTER TABLE dictionary.events OWNER TO postgres;

CREATE TABLE dictionary.extrinsics (
    id text NOT NULL,
    tx_hash text NOT NULL,
    module text NOT NULL,
    call text NOT NULL,
    block_height numeric NOT NULL,
    success boolean NOT NULL,
    is_signed boolean NOT NULL
);
ALTER TABLE dictionary.extrinsics OWNER TO postgres;

CREATE TABLE dictionary.spec_versions (
    id text NOT NULL,
    block_height numeric NOT NULL
);
ALTER TABLE dictionary.spec_versions OWNER TO postgres;

CREATE TABLE leaderboard.account_extrinsic_failed_total_counts (
    id text NOT NULL,
    rank integer NOT NULL,
    value numeric NOT NULL,
    last_contribution_at timestamp without time zone NOT NULL,
    created_at integer NOT NULL,
    updated_at integer NOT NULL
);
ALTER TABLE leaderboard.account_extrinsic_failed_total_counts OWNER TO postgres;

CREATE TABLE leaderboard.account_extrinsic_success_total_counts (
    id text NOT NULL,
    rank integer NOT NULL,
    value numeric NOT NULL,
    last_contribution_at timestamp without time zone NOT NULL,
    created_at integer NOT NULL,
    updated_at integer NOT NULL
);
ALTER TABLE leaderboard.account_extrinsic_success_total_counts OWNER TO postgres;

CREATE TABLE leaderboard.account_extrinsic_total_counts (
    id text NOT NULL,
    rank integer NOT NULL,
    value numeric NOT NULL,
    last_contribution_at timestamp without time zone NOT NULL,
    created_at integer NOT NULL,
    updated_at integer NOT NULL
);
ALTER TABLE leaderboard.account_extrinsic_total_counts OWNER TO postgres;

CREATE TABLE leaderboard.account_remark_counts (
    id text NOT NULL,
    rank integer NOT NULL,
    value numeric NOT NULL,
    last_contribution_at timestamp without time zone NOT NULL,
    created_at integer NOT NULL,
    updated_at integer NOT NULL
);
ALTER TABLE leaderboard.account_remark_counts OWNER TO postgres;

CREATE TABLE leaderboard.account_transaction_fee_paid_total_values (
    id text NOT NULL,
    rank integer NOT NULL,
    value numeric NOT NULL,
    last_contribution_at timestamp without time zone NOT NULL,
    created_at integer NOT NULL,
    updated_at integer NOT NULL
);
ALTER TABLE leaderboard.account_transaction_fee_paid_total_values OWNER TO postgres;

CREATE TABLE leaderboard.account_transfer_receiver_total_counts (
    id text NOT NULL,
    rank integer NOT NULL,
    value numeric NOT NULL,
    last_contribution_at timestamp without time zone NOT NULL,
    created_at integer NOT NULL,
    updated_at integer NOT NULL
);
ALTER TABLE leaderboard.account_transfer_receiver_total_counts OWNER TO postgres;

CREATE TABLE leaderboard.account_transfer_receiver_total_values (
    id text NOT NULL,
    rank integer NOT NULL,
    value numeric NOT NULL,
    last_contribution_at timestamp without time zone NOT NULL,
    created_at integer NOT NULL,
    updated_at integer NOT NULL
);
ALTER TABLE leaderboard.account_transfer_receiver_total_values OWNER TO postgres;

CREATE TABLE leaderboard.account_transfer_sender_total_counts (
    id text NOT NULL,
    rank integer NOT NULL,
    value numeric NOT NULL,
    last_contribution_at timestamp without time zone NOT NULL,
    created_at integer NOT NULL,
    updated_at integer NOT NULL
);
ALTER TABLE leaderboard.account_transfer_sender_total_counts OWNER TO postgres;

CREATE TABLE leaderboard.account_transfer_sender_total_values (
    id text NOT NULL,
    rank integer NOT NULL,
    value numeric NOT NULL,
    last_contribution_at timestamp without time zone NOT NULL,
    created_at integer NOT NULL,
    updated_at integer NOT NULL
);
ALTER TABLE leaderboard.account_transfer_sender_total_values OWNER TO postgres;

CREATE TABLE leaderboard.farmer_block_total_counts (
    id text NOT NULL,
    rank integer NOT NULL,
    value numeric NOT NULL,
    last_contribution_at timestamp without time zone NOT NULL,
    created_at integer NOT NULL,
    updated_at integer NOT NULL
);
ALTER TABLE leaderboard.farmer_block_total_counts OWNER TO postgres;

CREATE TABLE leaderboard.farmer_block_total_values (
    id text NOT NULL,
    rank integer NOT NULL,
    value numeric NOT NULL,
    last_contribution_at timestamp without time zone NOT NULL,
    created_at integer NOT NULL,
    updated_at integer NOT NULL
);
ALTER TABLE leaderboard.farmer_block_total_values OWNER TO postgres;

CREATE TABLE leaderboard.farmer_vote_and_block_total_counts (
    id text NOT NULL,
    rank integer NOT NULL,
    value numeric NOT NULL,
    last_contribution_at timestamp without time zone NOT NULL,
    created_at integer NOT NULL,
    updated_at integer NOT NULL
);
ALTER TABLE leaderboard.farmer_vote_and_block_total_counts OWNER TO postgres;

CREATE TABLE leaderboard.farmer_vote_and_block_total_values (
    id text NOT NULL,
    rank integer NOT NULL,
    value numeric NOT NULL,
    last_contribution_at timestamp without time zone NOT NULL,
    created_at integer NOT NULL,
    updated_at integer NOT NULL
);
ALTER TABLE leaderboard.farmer_vote_and_block_total_values OWNER TO postgres;

CREATE TABLE leaderboard.farmer_vote_total_counts (
    id text NOT NULL,
    rank integer NOT NULL,
    value numeric NOT NULL,
    last_contribution_at timestamp without time zone NOT NULL,
    created_at integer NOT NULL,
    updated_at integer NOT NULL
);
ALTER TABLE leaderboard.farmer_vote_total_counts OWNER TO postgres;

CREATE TABLE leaderboard.farmer_vote_total_values (
    id text NOT NULL,
    rank integer NOT NULL,
    value numeric NOT NULL,
    last_contribution_at timestamp without time zone NOT NULL,
    created_at integer NOT NULL,
    updated_at integer NOT NULL
);
ALTER TABLE leaderboard.farmer_vote_total_values OWNER TO postgres;

CREATE TABLE leaderboard.nominator_deposits_total_counts (
    id text NOT NULL,
    rank integer NOT NULL,
    value numeric NOT NULL,
    last_contribution_at timestamp without time zone NOT NULL,
    created_at integer NOT NULL,
    updated_at integer NOT NULL
);
ALTER TABLE leaderboard.nominator_deposits_total_counts OWNER TO postgres;

CREATE TABLE leaderboard.nominator_deposits_total_values (
    id text NOT NULL,
    rank integer NOT NULL,
    value numeric NOT NULL,
    last_contribution_at timestamp without time zone NOT NULL,
    created_at integer NOT NULL,
    updated_at integer NOT NULL
);
ALTER TABLE leaderboard.nominator_deposits_total_values OWNER TO postgres;

CREATE TABLE leaderboard.nominator_withdrawals_total_counts (
    id text NOT NULL,
    rank integer NOT NULL,
    value numeric NOT NULL,
    last_contribution_at timestamp without time zone NOT NULL,
    created_at integer NOT NULL,
    updated_at integer NOT NULL
);
ALTER TABLE leaderboard.nominator_withdrawals_total_counts OWNER TO postgres;

CREATE TABLE leaderboard.operator_bundle_total_counts (
    id text NOT NULL,
    rank integer NOT NULL,
    value numeric NOT NULL,
    last_contribution_at timestamp without time zone NOT NULL,
    created_at integer NOT NULL,
    updated_at integer NOT NULL
);
ALTER TABLE leaderboard.operator_bundle_total_counts OWNER TO postgres;

CREATE TABLE leaderboard.operator_deposits_total_counts (
    id text NOT NULL,
    rank integer NOT NULL,
    value numeric NOT NULL,
    last_contribution_at timestamp without time zone NOT NULL,
    created_at integer NOT NULL,
    updated_at integer NOT NULL
);
ALTER TABLE leaderboard.operator_deposits_total_counts OWNER TO postgres;

CREATE TABLE leaderboard.operator_deposits_total_values (
    id text NOT NULL,
    rank integer NOT NULL,
    value numeric NOT NULL,
    last_contribution_at timestamp without time zone NOT NULL,
    created_at integer NOT NULL,
    updated_at integer NOT NULL
);
ALTER TABLE leaderboard.operator_deposits_total_values OWNER TO postgres;

CREATE TABLE leaderboard.operator_total_rewards_collecteds (
    id text NOT NULL,
    rank integer NOT NULL,
    value numeric NOT NULL,
    last_contribution_at timestamp without time zone NOT NULL,
    created_at integer NOT NULL,
    updated_at integer NOT NULL
);
ALTER TABLE leaderboard.operator_total_rewards_collecteds OWNER TO postgres;

CREATE TABLE leaderboard.operator_total_tax_collecteds (
    id text NOT NULL,
    rank integer NOT NULL,
    value numeric NOT NULL,
    last_contribution_at timestamp without time zone NOT NULL,
    created_at integer NOT NULL,
    updated_at integer NOT NULL
);
ALTER TABLE leaderboard.operator_total_tax_collecteds OWNER TO postgres;

CREATE TABLE leaderboard.operator_withdrawals_total_counts (
    id text NOT NULL,
    rank integer NOT NULL,
    value numeric NOT NULL,
    last_contribution_at timestamp without time zone NOT NULL,
    created_at integer NOT NULL,
    updated_at integer NOT NULL
);
ALTER TABLE leaderboard.operator_withdrawals_total_counts OWNER TO postgres;

ALTER TABLE ONLY consensus._metadata
    ADD CONSTRAINT _metadata_pkey PRIMARY KEY (key);

ALTER TABLE ONLY consensus.account_histories
    ADD CONSTRAINT account_histories_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY consensus.account_profiles
    ADD CONSTRAINT account_profiles_id_key UNIQUE (id);

ALTER TABLE ONLY consensus.account_profiles
    ADD CONSTRAINT account_profiles_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY consensus.account_rewards
    ADD CONSTRAINT account_rewards_id_key UNIQUE (id);

ALTER TABLE ONLY consensus.account_rewards
    ADD CONSTRAINT account_rewards_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY consensus.accounts
    ADD CONSTRAINT accounts_id_key UNIQUE (id);

ALTER TABLE ONLY consensus.accounts
    ADD CONSTRAINT accounts_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY consensus.blocks
    ADD CONSTRAINT blocks_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY consensus.event_modules
    ADD CONSTRAINT event_modules_id_key UNIQUE (id);

ALTER TABLE ONLY consensus.event_modules
    ADD CONSTRAINT event_modules_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY consensus.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY consensus.extrinsic_modules
    ADD CONSTRAINT extrinsic_modules_id_key UNIQUE (id);

ALTER TABLE ONLY consensus.extrinsic_modules
    ADD CONSTRAINT extrinsic_modules_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY consensus.extrinsics
    ADD CONSTRAINT extrinsics_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY consensus.log_kinds
    ADD CONSTRAINT log_kinds_id_key UNIQUE (id);

ALTER TABLE ONLY consensus.log_kinds
    ADD CONSTRAINT log_kinds_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY consensus.logs
    ADD CONSTRAINT logs_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY consensus.rewards
    ADD CONSTRAINT rewards_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY consensus.sections
    ADD CONSTRAINT sections_id_key UNIQUE (id);

ALTER TABLE ONLY consensus.sections
    ADD CONSTRAINT sections_pkey PRIMARY KEY (_id);

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

ALTER TABLE ONLY leaderboard.account_extrinsic_failed_total_counts
    ADD CONSTRAINT account_extrinsic_failed_total_counts_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.account_extrinsic_success_total_counts
    ADD CONSTRAINT account_extrinsic_success_total_counts_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.account_extrinsic_total_counts
    ADD CONSTRAINT account_extrinsic_total_counts_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.account_remark_counts
    ADD CONSTRAINT account_remark_counts_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.account_transaction_fee_paid_total_values
    ADD CONSTRAINT account_transaction_fee_paid_total_values_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.account_transfer_receiver_total_counts
    ADD CONSTRAINT account_transfer_receiver_total_counts_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.account_transfer_receiver_total_values
    ADD CONSTRAINT account_transfer_receiver_total_values_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.account_transfer_sender_total_counts
    ADD CONSTRAINT account_transfer_sender_total_counts_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.account_transfer_sender_total_values
    ADD CONSTRAINT account_transfer_sender_total_values_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.farmer_block_total_counts
    ADD CONSTRAINT farmer_block_total_counts_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.farmer_block_total_values
    ADD CONSTRAINT farmer_block_total_values_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.farmer_vote_and_block_total_counts
    ADD CONSTRAINT farmer_vote_and_block_total_counts_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.farmer_vote_and_block_total_values
    ADD CONSTRAINT farmer_vote_and_block_total_values_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.farmer_vote_total_counts
    ADD CONSTRAINT farmer_vote_total_counts_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.farmer_vote_total_values
    ADD CONSTRAINT farmer_vote_total_values_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.nominator_deposits_total_counts
    ADD CONSTRAINT nominator_deposits_total_counts_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.nominator_deposits_total_values
    ADD CONSTRAINT nominator_deposits_total_values_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.nominator_withdrawals_total_counts
    ADD CONSTRAINT nominator_withdrawals_total_counts_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.operator_bundle_total_counts
    ADD CONSTRAINT operator_bundle_total_counts_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.operator_deposits_total_counts
    ADD CONSTRAINT operator_deposits_total_counts_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.operator_deposits_total_values
    ADD CONSTRAINT operator_deposits_total_values_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.operator_total_rewards_collecteds
    ADD CONSTRAINT operator_total_rewards_collecteds_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.operator_total_tax_collecteds
    ADD CONSTRAINT operator_total_tax_collecteds_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.operator_withdrawals_total_counts
    ADD CONSTRAINT operator_withdrawals_total_counts_pkey PRIMARY KEY (id);

CREATE INDEX "0x08aa840e441d13bb" ON consensus.blocks USING gist (height, _block_range);
CREATE INDEX "0x09a98aa53fa2c2e3" ON consensus.logs USING btree (id);
CREATE INDEX "0x0aabe4e2902c545f" ON consensus.account_rewards USING gist (created_at, _block_range);
CREATE INDEX "0x0d1bd9e945ce43a3" ON consensus.event_modules USING gist (method, _block_range);
CREATE INDEX "0x1532f5e4701949a5" ON consensus.extrinsics USING gist (hash, _block_range);
CREATE INDEX "0x1762232b2820e83d" ON consensus.extrinsic_modules USING gist (section, _block_range);
CREATE INDEX "0x1e967733a0d5db15" ON consensus.rewards USING btree (id);
CREATE INDEX "0x2481c1ffa5112599" ON consensus.logs USING gist (block_hash, _block_range);
CREATE INDEX "0x26e9de0ee335659c" ON consensus.extrinsic_modules USING btree (id);
CREATE INDEX "0x2a038c9edc202d38" ON consensus.transfers USING gist (event_id, _block_range);
CREATE INDEX "0x2c6d435d5ab69412" ON consensus.extrinsics USING gist (sort_id, _block_range);
CREATE INDEX "0x2cbe628ebc830c12" ON consensus.logs USING gist (sort_id, _block_range);
CREATE INDEX "0x30b779cc3aeeeec6" ON consensus.events USING gist (extrinsic_id, _block_range);
CREATE INDEX "0x358cafe370ac92ef" ON consensus.accounts USING gist (total, _block_range);
CREATE INDEX "0x3ae5d1670e99e612" ON consensus.transfers USING gist ("timestamp", _block_range);
CREATE INDEX "0x3d8ee08d232943ea" ON consensus.sections USING btree (id);
CREATE INDEX "0x3fa25df2b17c6d2f" ON consensus.extrinsics USING gist (signature, _block_range);
CREATE INDEX "0x4131da2c2ec8b5b7" ON consensus.transfers USING gist (date, _block_range);
CREATE INDEX "0x43615b2452f72359" ON consensus.account_profiles USING btree (id);
CREATE INDEX "0x444de3b3611c1fcd" ON consensus.account_histories USING gist (created_at, _block_range);
CREATE INDEX "0x4a66afa700f00759" ON consensus.events USING gist (block_hash, _block_range);
CREATE INDEX "0x4c738865df5c227d" ON consensus.account_profiles USING gist (created_at, _block_range);
CREATE INDEX "0x4cb388e53e3e30f3" ON consensus.accounts USING btree (id);
CREATE INDEX "0x53fb0cf455c914c8" ON consensus.account_profiles USING gist (updated_at, _block_range);
CREATE INDEX "0x55286926221be2e7" ON consensus.event_modules USING btree (id);
CREATE INDEX "0x57fc196dcc99a091" ON consensus.events USING gist (block_height, _block_range);
CREATE INDEX "0x5921649101eeb57a" ON consensus.transfers USING gist (created_at, _block_range);
CREATE INDEX "0x59386a58438fa05a" ON consensus.extrinsics USING gist (section, _block_range);
CREATE INDEX "0x59f75d2bc1e6a0bc" ON consensus.blocks USING gist ("timestamp", _block_range);
CREATE INDEX "0x5c04eee35ba10ef1" ON consensus.extrinsic_modules USING gist (method, _block_range);
CREATE INDEX "0x6008270492da5713" ON consensus.events USING gist ("timestamp", _block_range);
CREATE INDEX "0x6131d72d57f2a188" ON consensus.blocks USING gist (hash, _block_range);
CREATE INDEX "0x61510445e44f4f2f" ON consensus.logs USING gist (index_in_block, _block_range);
CREATE INDEX "0x64128774d8de590c" ON consensus.log_kinds USING btree (id);
CREATE INDEX "0x6f53f38c566a1b3a" ON consensus.extrinsics USING gist (module, _block_range);
CREATE INDEX "0x6ffa574597ba780e" ON consensus.event_modules USING gist (section, _block_range);
CREATE INDEX "0x73cd163028b0b898" ON consensus.rewards USING gist (account_id, _block_range);
CREATE INDEX "0x774ec1c372b71838" ON consensus.events USING gist (sort_id, _block_range);
CREATE INDEX "0x786f1b7d3a4d3cc2" ON consensus.account_rewards USING btree (id);
CREATE INDEX "0x79131319c12e8920" ON consensus.transfers USING gist ("from", _block_range);
CREATE INDEX "0x79ff6a28c8a013aa" ON consensus.logs USING gist ("timestamp", _block_range);
CREATE INDEX "0x7b661a36dc0847a1" ON consensus.accounts USING gist (updated_at, _block_range);
CREATE INDEX "0x889e9f7e5a64267c" ON consensus.extrinsics USING gist (block_height, _block_range);
CREATE INDEX "0x946898e0d99da99d" ON consensus.blocks USING gist (sort_id, _block_range);
CREATE INDEX "0x9dc19a4dda2286f4" ON consensus.events USING gist (section, _block_range);
CREATE INDEX "0xa1455f2831f03723" ON consensus.rewards USING gist ("timestamp", _block_range);
CREATE INDEX "0xa81afc487642f92c" ON consensus.account_profiles USING gist (name, _block_range);
CREATE INDEX "0xb0f971b6213bd370" ON consensus.events USING gist (module, _block_range);
CREATE INDEX "0xb3d3d7d2b08d4e7e" ON consensus.rewards USING gist (block_hash, _block_range);
CREATE INDEX "0xb7bb46c9ebdd7fe1" ON consensus.transfers USING gist (extrinsic_id, _block_range);
CREATE INDEX "0xb91efc8ed4021e6e" ON consensus.transfers USING btree (id);
CREATE INDEX "0xbbc46ed346025b1f" ON consensus.account_histories USING gist (total, _block_range);
CREATE INDEX "0xbd56d62e78bc4a0d" ON consensus.accounts USING gist (created_at, _block_range);
CREATE INDEX "0xc0683fc6175b395a" ON consensus.events USING gist (extrinsic_hash, _block_range);
CREATE INDEX "0xc7a7467355cf8dbb" ON consensus.extrinsics USING gist ("timestamp", _block_range);
CREATE INDEX "0xccedb032815757ed" ON consensus.blocks USING btree (id);
CREATE INDEX "0xd21b20c334f80c2e" ON consensus.account_histories USING btree (id);
CREATE INDEX "0xd8db4c8313621519" ON consensus.extrinsics USING btree (id);
CREATE INDEX "0xe0b781f836dc2f1a" ON consensus.account_histories USING gist (updated_at, _block_range);
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

CREATE INDEX "0x0237b4bb45c8cd3d" ON leaderboard.farmer_vote_and_block_total_values USING btree (created_at);
CREATE INDEX "0x03f87f972ff639fb" ON leaderboard.nominator_deposits_total_counts USING btree (rank);
CREATE INDEX "0x04c74d64a2ca170d" ON leaderboard.operator_deposits_total_values USING btree (created_at);
CREATE INDEX "0x0a50f1f460ef26ea" ON leaderboard.farmer_vote_and_block_total_counts USING btree (created_at);
CREATE INDEX "0x0a89134e4a3de20e" ON leaderboard.account_transfer_receiver_total_values USING btree (updated_at);
CREATE INDEX "0x109ef24a7bb98d30" ON leaderboard.operator_withdrawals_total_counts USING btree (rank);
CREATE INDEX "0x15178b2615ecb334" ON leaderboard.farmer_vote_total_counts USING btree (value);
CREATE INDEX "0x1dc9d229fc046a77" ON leaderboard.farmer_block_total_counts USING btree (value);
CREATE INDEX "0x1ed6c532b99ee178" ON leaderboard.nominator_deposits_total_values USING btree (rank);
CREATE INDEX "0x203a197257ce12a5" ON leaderboard.farmer_vote_total_counts USING btree (rank);
CREATE INDEX "0x21d9f76ed37bd96e" ON leaderboard.account_transfer_receiver_total_counts USING btree (created_at);
CREATE INDEX "0x2543cf3b9ae14ab8" ON leaderboard.operator_deposits_total_counts USING btree (created_at);
CREATE INDEX "0x25d59bd5befefa21" ON leaderboard.farmer_vote_and_block_total_values USING btree (updated_at);
CREATE INDEX "0x261402fc9f454bf4" ON leaderboard.nominator_deposits_total_values USING btree (updated_at);
CREATE INDEX "0x274bfb55e0692363" ON leaderboard.account_transfer_sender_total_counts USING btree (updated_at);
CREATE INDEX "0x2e81c6470104e40a" ON leaderboard.account_transfer_receiver_total_counts USING btree (updated_at);
CREATE INDEX "0x36fad076b7b609c8" ON leaderboard.operator_total_tax_collecteds USING btree (rank);
CREATE INDEX "0x3bb471ec1101b66a" ON leaderboard.account_transfer_receiver_total_values USING btree (created_at);
CREATE INDEX "0x3c8d59be33cc30fd" ON leaderboard.account_transaction_fee_paid_total_values USING btree (value);
CREATE INDEX "0x3fb3bf4c3648e89f" ON leaderboard.operator_bundle_total_counts USING btree (value);
CREATE INDEX "0x414cf5a248371b9e" ON leaderboard.operator_total_rewards_collecteds USING btree (value);
CREATE INDEX "0x45b6baa60f76afe5" ON leaderboard.farmer_block_total_counts USING btree (rank);
CREATE INDEX "0x45db7717e810fbed" ON leaderboard.account_extrinsic_failed_total_counts USING btree (created_at);
CREATE INDEX "0x48833908a7574703" ON leaderboard.account_transfer_sender_total_counts USING btree (created_at);
CREATE INDEX "0x5162c85596c9338e" ON leaderboard.operator_deposits_total_values USING btree (value);
CREATE INDEX "0x52d6270f1cc3c4dd" ON leaderboard.operator_bundle_total_counts USING btree (rank);
CREATE INDEX "0x547b123af6dcd32a" ON leaderboard.account_extrinsic_total_counts USING btree (updated_at);
CREATE INDEX "0x5738b9b369347bf1" ON leaderboard.account_remark_counts USING btree (created_at);
CREATE INDEX "0x5b1a07a2eacad81c" ON leaderboard.operator_bundle_total_counts USING btree (updated_at);
CREATE INDEX "0x5bd3b2299db13775" ON leaderboard.farmer_vote_and_block_total_counts USING btree (updated_at);
CREATE INDEX "0x5cfd74ecb2e7596e" ON leaderboard.nominator_withdrawals_total_counts USING btree (created_at);
CREATE INDEX "0x6446d391095803fe" ON leaderboard.account_transfer_receiver_total_values USING btree (rank);
CREATE INDEX "0x648d3308d6c4914f" ON leaderboard.operator_deposits_total_counts USING btree (value);
CREATE INDEX "0x6625bd986dfdd912" ON leaderboard.farmer_vote_total_values USING btree (rank);
CREATE INDEX "0x67610203489d7569" ON leaderboard.operator_total_tax_collecteds USING btree (created_at);
CREATE INDEX "0x67876d73c8d1484a" ON leaderboard.nominator_deposits_total_values USING btree (created_at);
CREATE INDEX "0x6e3c8d300e206644" ON leaderboard.account_transfer_sender_total_values USING btree (value);
CREATE INDEX "0x6e7ba35bab79dae5" ON leaderboard.account_remark_counts USING btree (value);
CREATE INDEX "0x6effab7bf55318c0" ON leaderboard.farmer_block_total_values USING btree (created_at);
CREATE INDEX "0x73606d69a16a51ed" ON leaderboard.farmer_vote_and_block_total_counts USING btree (rank);
CREATE INDEX "0x74444c6cbb827fed" ON leaderboard.account_extrinsic_failed_total_counts USING btree (rank);
CREATE INDEX "0x77f1b742d319402c" ON leaderboard.account_transaction_fee_paid_total_values USING btree (created_at);
CREATE INDEX "0x7c0e839f35282376" ON leaderboard.farmer_block_total_counts USING btree (created_at);
CREATE INDEX "0x7c584a4083105781" ON leaderboard.farmer_block_total_values USING btree (value);
CREATE INDEX "0x7cdbfa16661f71ee" ON leaderboard.nominator_withdrawals_total_counts USING btree (value);
CREATE INDEX "0x7ef3b9aa555b5a05" ON leaderboard.account_transfer_receiver_total_values USING btree (value);
CREATE INDEX "0x82f033a6c175eddd" ON leaderboard.farmer_vote_and_block_total_values USING btree (value);
CREATE INDEX "0x82fe14c738066801" ON leaderboard.account_transfer_sender_total_values USING btree (created_at);
CREATE INDEX "0x84d750e3c36ee4ab" ON leaderboard.operator_total_tax_collecteds USING btree (updated_at);
CREATE INDEX "0x87379ebd9abb3c9f" ON leaderboard.account_extrinsic_total_counts USING btree (created_at);
CREATE INDEX "0x8ba1fd011d0120e6" ON leaderboard.account_remark_counts USING btree (updated_at);
CREATE INDEX "0x901aff3934f41bd9" ON leaderboard.farmer_vote_total_counts USING btree (updated_at);
CREATE INDEX "0x958866172e237c5c" ON leaderboard.operator_total_rewards_collecteds USING btree (updated_at);
CREATE INDEX "0x97d32cd19e3802db" ON leaderboard.farmer_block_total_values USING btree (rank);
CREATE INDEX "0x99d0f21c8605c41c" ON leaderboard.account_transfer_sender_total_counts USING btree (value);
CREATE INDEX "0x9fc7939319b88d37" ON leaderboard.nominator_deposits_total_counts USING btree (value);
CREATE INDEX "0xa035d5be2ef2e7ff" ON leaderboard.nominator_deposits_total_values USING btree (value);
CREATE INDEX "0xa0371f05d6ab705d" ON leaderboard.farmer_vote_total_values USING btree (created_at);
CREATE INDEX "0xa03f24a9dfd38cdc" ON leaderboard.farmer_vote_total_values USING btree (value);
CREATE INDEX "0xa6e9645812acf3c5" ON leaderboard.operator_withdrawals_total_counts USING btree (updated_at);
CREATE INDEX "0xab244f4097d5b7de" ON leaderboard.account_transfer_receiver_total_counts USING btree (value);
CREATE INDEX "0xab389403bd29540d" ON leaderboard.operator_total_rewards_collecteds USING btree (rank);
CREATE INDEX "0xac1bf85d692ba008" ON leaderboard.account_transfer_sender_total_values USING btree (rank);
CREATE INDEX "0xac5a3d6fd52e2eba" ON leaderboard.farmer_vote_and_block_total_values USING btree (rank);
CREATE INDEX "0xb65383ff3975f7d0" ON leaderboard.nominator_withdrawals_total_counts USING btree (rank);
CREATE INDEX "0xb8c311b80e4878cf" ON leaderboard.operator_total_tax_collecteds USING btree (value);
CREATE INDEX "0xb9c1f66664e1525c" ON leaderboard.account_extrinsic_success_total_counts USING btree (rank);
CREATE INDEX "0xba6d7a768cf0f48a" ON leaderboard.account_extrinsic_success_total_counts USING btree (value);
CREATE INDEX "0xbb772bc16a6f55fa" ON leaderboard.account_extrinsic_total_counts USING btree (rank);
CREATE INDEX "0xc2d78cc1bc2d4d1d" ON leaderboard.operator_bundle_total_counts USING btree (created_at);
CREATE INDEX "0xc62ca597010fa42d" ON leaderboard.operator_deposits_total_counts USING btree (rank);
CREATE INDEX "0xc777a0fed62b8863" ON leaderboard.account_extrinsic_success_total_counts USING btree (updated_at);
CREATE INDEX "0xc859dbf1a9895777" ON leaderboard.nominator_deposits_total_counts USING btree (created_at);
CREATE INDEX "0xc88f7e95a1a80085" ON leaderboard.farmer_vote_and_block_total_counts USING btree (value);
CREATE INDEX "0xc9ad4369f9204059" ON leaderboard.account_extrinsic_success_total_counts USING btree (created_at);
CREATE INDEX "0xcb0aa6b763df69f6" ON leaderboard.operator_deposits_total_values USING btree (updated_at);
CREATE INDEX "0xd1ed11b719eccd00" ON leaderboard.farmer_vote_total_values USING btree (updated_at);
CREATE INDEX "0xd2beaf5abcec6d67" ON leaderboard.operator_deposits_total_values USING btree (rank);
CREATE INDEX "0xd74476f68a157f82" ON leaderboard.account_transaction_fee_paid_total_values USING btree (rank);
CREATE INDEX "0xd8e7a933c1384413" ON leaderboard.account_extrinsic_failed_total_counts USING btree (value);
CREATE INDEX "0xdb955231fab08930" ON leaderboard.account_extrinsic_total_counts USING btree (value);
CREATE INDEX "0xdbb2243b8d9f31b1" ON leaderboard.account_extrinsic_failed_total_counts USING btree (updated_at);
CREATE INDEX "0xe3fc37f3b8d89c8d" ON leaderboard.operator_total_rewards_collecteds USING btree (created_at);
CREATE INDEX "0xe8f087b3187060f5" ON leaderboard.farmer_vote_total_counts USING btree (created_at);
CREATE INDEX "0xea4fb11415169d44" ON leaderboard.farmer_block_total_counts USING btree (updated_at);
CREATE INDEX "0xed196db1fdf8e1ba" ON leaderboard.nominator_deposits_total_counts USING btree (updated_at);
CREATE INDEX "0xed89d2ba5685cb9f" ON leaderboard.account_transfer_sender_total_counts USING btree (rank);
CREATE INDEX "0xefc871c495be2e8b" ON leaderboard.nominator_withdrawals_total_counts USING btree (updated_at);
CREATE INDEX "0xf08c870c8311438f" ON leaderboard.operator_withdrawals_total_counts USING btree (created_at);
CREATE INDEX "0xf37e3b354eac5a6e" ON leaderboard.operator_withdrawals_total_counts USING btree (value);
CREATE INDEX "0xf3b812b4322af338" ON leaderboard.farmer_block_total_values USING btree (updated_at);
CREATE INDEX "0xf3ee1a0c9ddee938" ON leaderboard.account_transfer_receiver_total_counts USING btree (rank);
CREATE INDEX "0xf59765eb34448af2" ON leaderboard.account_transaction_fee_paid_total_values USING btree (updated_at);
CREATE INDEX "0xf8a25fbf0822721a" ON leaderboard.account_remark_counts USING btree (rank);
CREATE INDEX "0xf8b032ae97b931bd" ON leaderboard.operator_deposits_total_counts USING btree (updated_at);
CREATE INDEX "0xfe4c85f6ab059ff1" ON leaderboard.account_transfer_sender_total_values USING btree (updated_at);
