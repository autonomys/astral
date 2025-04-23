CREATE SCHEMA staking;
ALTER SCHEMA staking OWNER TO postgres;

CREATE TABLE staking._metadata (
    key character varying(255) NOT NULL,
    value jsonb,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
ALTER TABLE staking._metadata OWNER TO postgres;

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
    event_id text NOT NULL
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
    event_id text NOT NULL
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
    event_id text NOT NULL
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
    block_height numeric NOT NULL
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
    event_id text NOT NULL
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
    event_id text NOT NULL
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
    event_id text NOT NULL
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
    block_height numeric NOT NULL
);
ALTER TABLE staking.operator_staking_histories OWNER TO postgres;

CREATE TABLE staking.operator_tax_collections (
    id text NOT NULL,
    domain_id text NOT NULL,
    operator_id text NOT NULL,
    amount numeric NOT NULL,
    block_height numeric NOT NULL,
    extrinsic_id text NOT NULL,
    event_id text NOT NULL
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
    event_id text NOT NULL
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
    event_id text NOT NULL
);
ALTER TABLE staking.unlocked_events OWNER TO postgres;

CREATE TABLE staking.nominators_unlocked_events (
    id text NOT NULL,
    domain_id text NOT NULL,
    operator_id text NOT NULL,
    block_height numeric NOT NULL,
    extrinsic_id text NOT NULL,
    event_id text NOT NULL
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
    event_id text NOT NULL
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

ALTER TABLE ONLY staking._metadata
    ADD CONSTRAINT _metadata_pkey PRIMARY KEY (key);

ALTER TABLE ONLY staking.accounts
    ADD CONSTRAINT accounts_pkey PRIMARY KEY (id);

ALTER TABLE ONLY staking.bundle_submissions
    ADD CONSTRAINT bundle_submissions_pkey PRIMARY KEY (id);

ALTER TABLE ONLY staking.deposit_events
    ADD CONSTRAINT deposit_events_pkey PRIMARY KEY (id);

ALTER TABLE ONLY staking.deposits
    ADD CONSTRAINT deposits_pkey PRIMARY KEY (id);

ALTER TABLE ONLY staking.domain_epochs
    ADD CONSTRAINT domain_epochs_pkey PRIMARY KEY (id);
    
ALTER TABLE ONLY staking.domain_instantiations
    ADD CONSTRAINT domain_instantiations_pkey PRIMARY KEY (id);

ALTER TABLE ONLY staking.domain_staking_histories
    ADD CONSTRAINT domain_staking_histories_pkey PRIMARY KEY (id);

ALTER TABLE ONLY staking.domains
    ADD CONSTRAINT domains_pkey PRIMARY KEY (id);

ALTER TABLE ONLY staking.nominators
    ADD CONSTRAINT nominators_pkey PRIMARY KEY (id);

ALTER TABLE ONLY staking.operator_deregistrations
    ADD CONSTRAINT operator_deregistrations_pkey PRIMARY KEY (id);

ALTER TABLE ONLY staking.operator_registrations
    ADD CONSTRAINT operator_registrations_pkey PRIMARY KEY (id);

ALTER TABLE ONLY staking.operator_rewards
    ADD CONSTRAINT operator_rewards_pkey PRIMARY KEY (id);

ALTER TABLE ONLY staking.operator_staking_histories
    ADD CONSTRAINT operator_staking_histories_pkey PRIMARY KEY (id);

ALTER TABLE ONLY staking.operator_tax_collections
    ADD CONSTRAINT operator_tax_collections_pkey PRIMARY KEY (id);

ALTER TABLE ONLY staking.operators
    ADD CONSTRAINT operators_pkey PRIMARY KEY (id);

ALTER TABLE ONLY staking.runtime_creations
    ADD CONSTRAINT runtime_creations_pkey PRIMARY KEY (id);

ALTER TABLE ONLY staking.unlocked_events
    ADD CONSTRAINT unlocked_events_pkey PRIMARY KEY (id);

ALTER TABLE ONLY staking.nominators_unlocked_events
    ADD CONSTRAINT nominators_unlocked_events_pkey PRIMARY KEY (id);

ALTER TABLE ONLY staking.withdraw_events
    ADD CONSTRAINT withdraw_events_pkey PRIMARY KEY (id);

ALTER TABLE ONLY staking.withdrawals
    ADD CONSTRAINT withdrawals_pkey PRIMARY KEY (id);

CREATE INDEX "staking_unlocked_events_id" ON staking.unlocked_events USING btree (id);
CREATE INDEX "staking_operator_deregistrations_id" ON staking.operator_deregistrations USING btree (id);
CREATE INDEX "staking_operator_rewards_id" ON staking.operator_rewards USING btree (id);
CREATE INDEX "staking_operator_tax_collections_id" ON staking.operator_tax_collections USING btree (id);
CREATE INDEX "staking_domain_instantiations_id" ON staking.domain_instantiations USING btree (id);
CREATE INDEX "staking_withdraw_events_id" ON staking.withdraw_events USING btree (id);
CREATE INDEX "staking_withdraw_events_domain_id" ON staking.withdraw_events USING btree (domain_id);
CREATE INDEX "staking_withdraw_events_operator_id" ON staking.withdraw_events USING btree (operator_id);
CREATE INDEX "staking_withdraw_events_nominator_id" ON staking.withdraw_events USING btree (nominator_id);
CREATE INDEX "staking_deposit_events_id" ON staking.deposit_events USING btree (id);
CREATE INDEX "staking_deposit_events_domain_id" ON staking.deposit_events USING btree (domain_id);
CREATE INDEX "staking_deposit_events_operator_id" ON staking.deposit_events USING btree (operator_id);
CREATE INDEX "staking_deposit_events_nominator_id" ON staking.deposit_events USING btree (nominator_id);
CREATE INDEX "staking_operator_registrations_id" ON staking.operator_registrations USING btree (id);
CREATE INDEX "staking_operator_staking_histories_id" ON staking.operator_staking_histories USING btree (id);
CREATE INDEX "staking_bundle_submissions_id" ON staking.bundle_submissions USING btree (id);
CREATE INDEX "staking_domain_staking_histories_id" ON staking.domain_staking_histories USING btree (id);
CREATE INDEX "staking_runtime_creations_id" ON staking.runtime_creations USING btree (id);
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
