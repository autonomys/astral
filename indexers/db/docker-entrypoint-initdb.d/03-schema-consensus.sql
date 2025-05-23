CREATE SCHEMA consensus;
ALTER SCHEMA consensus OWNER TO postgres;

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

CREATE TABLE consensus._metadata (
    key character varying(255) NOT NULL,
    value jsonb,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
ALTER TABLE consensus._metadata OWNER TO postgres;

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
    height NUMERIC NOT NULL,
    hash TEXT NOT NULL,
    "timestamp" TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    parent_hash TEXT NOT NULL,
    spec_id TEXT NOT NULL,
    state_root TEXT NOT NULL,
    extrinsics_root TEXT NOT NULL,
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
    type TEXT NOT NULL,
    success BOOLEAN NOT NULL,
    is_finalized BOOLEAN NOT NULL,
    "timestamp" TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE consensus.transfers OWNER TO postgres;

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

CREATE INDEX "consensus_blocks_id" ON consensus.blocks USING btree (id);
CREATE INDEX "consensus_blocks_height_desc" ON consensus.blocks USING btree (height DESC);
CREATE INDEX "consensus_blocks_timestamp_desc" ON consensus.blocks USING btree ("timestamp" DESC);
CREATE INDEX "consensus_blocks_hash" ON consensus.blocks USING btree (hash);
CREATE INDEX "consensus_blocks_id_hash" ON consensus.blocks (id, hash);
CREATE INDEX "consensus_blocks_author_id" ON consensus.blocks USING btree (author_id);

CREATE INDEX "consensus_cumulative_blocks_id" ON consensus.cumulative_blocks USING btree (id);

CREATE INDEX "consensus_extrinsics_id" ON consensus.extrinsics USING btree (id);
CREATE INDEX "consensus_extrinsics_block_height_desc" ON consensus.extrinsics USING btree (block_height DESC);
CREATE INDEX "consensus_extrinsics_timestamp_desc" ON consensus.extrinsics USING btree ("timestamp" DESC);
CREATE INDEX "consensus_extrinsics_hash" ON consensus.extrinsics USING btree (hash);
CREATE INDEX "consensus_extrinsics_signer" ON consensus.extrinsics USING btree (signer);
CREATE INDEX "consensus_extrinsics_section" ON consensus.extrinsics USING btree (section);
CREATE INDEX "consensus_extrinsics_module" ON consensus.extrinsics USING btree (module);
CREATE INDEX "consensus_extrinsics_success" ON consensus.extrinsics USING btree (success);
CREATE INDEX "consensus_extrinsics_block_ordering" ON consensus.extrinsics USING btree (block_height DESC, index_in_block);

CREATE INDEX "consensus_events_id" ON consensus.events USING btree (id);
CREATE INDEX "consensus_events_block_height_desc" ON consensus.events USING btree (block_height DESC);
CREATE INDEX "consensus_events_timestamp_desc" ON consensus.events USING btree ("timestamp" DESC);
CREATE INDEX "consensus_events_extrinsic_id" ON consensus.events USING btree (extrinsic_id);
CREATE INDEX "consensus_events_section" ON consensus.events USING btree (section);
CREATE INDEX "consensus_events_module" ON consensus.events USING btree (module);
CREATE INDEX "consensus_events_block_ordering" ON consensus.events USING btree (block_height DESC, index_in_block);

CREATE INDEX "consensus_logs_id" ON consensus.logs USING btree (id);
CREATE INDEX "consensus_logs_block_height_desc" ON consensus.logs USING btree (block_height DESC);
CREATE INDEX "consensus_logs_timestamp_desc" ON consensus.logs USING btree ("timestamp" DESC);
CREATE INDEX "consensus_logs_kind" ON consensus.logs USING btree (kind);
CREATE INDEX "consensus_logs_block_ordering" ON consensus.logs USING btree (block_height DESC, index_in_block);

CREATE INDEX "consensus_accounts_id" ON consensus.accounts USING btree (id);
CREATE INDEX "consensus_accounts_free_desc" ON consensus.accounts USING btree (free DESC);
CREATE INDEX "consensus_accounts_reserved_desc" ON consensus.accounts USING btree (reserved DESC);
CREATE INDEX "consensus_accounts_total_desc" ON consensus.accounts USING btree (total DESC);

CREATE INDEX "consensus_account_histories_id" ON consensus.account_histories USING btree (id);
CREATE INDEX "consensus_account_histories_created_at_desc" ON consensus.account_histories USING btree (created_at DESC);

CREATE INDEX "consensus_transfers_id" ON consensus.transfers USING btree (id);
CREATE INDEX "consensus_transfers_block_height_desc" ON consensus.transfers USING btree (block_height DESC);
CREATE INDEX "consensus_transfers_timestamp_desc" ON consensus.transfers USING btree ("timestamp" DESC);
CREATE INDEX "consensus_transfers_from" ON consensus.transfers USING btree ("from");
CREATE INDEX "consensus_transfers_to" ON consensus.transfers USING btree ("to");
CREATE INDEX "consensus_transfers_type" ON consensus.transfers USING btree (type);
CREATE INDEX "consensus_transfers_success" ON consensus.transfers USING btree (success);

CREATE INDEX "consensus_rewards_id" ON consensus.rewards USING btree (id);
CREATE INDEX "consensus_rewards_block_height_desc" ON consensus.rewards USING btree (block_height DESC);
CREATE INDEX "consensus_rewards_timestamp_desc" ON consensus.rewards USING btree ("timestamp" DESC);
CREATE INDEX "consensus_rewards_account_id" ON consensus.rewards USING btree (account_id);
CREATE INDEX "consensus_rewards_reward_type" ON consensus.rewards USING btree (reward_type);

CREATE INDEX "consensus_extrinsic_modules_id" ON consensus.extrinsic_modules USING btree (id);
CREATE INDEX "consensus_event_modules_id" ON consensus.event_modules USING btree (id);
CREATE INDEX "consensus_log_kinds_id" ON consensus.log_kinds USING btree (id);
CREATE INDEX "consensus_sections_id" ON consensus.sections USING btree (id);

CREATE TRIGGER "0x648269cc35867c16" AFTER UPDATE ON consensus._metadata FOR EACH ROW WHEN (((new.key)::text = 'schemaMigrationCount'::text)) EXECUTE FUNCTION consensus.schema_notification();
