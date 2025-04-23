CREATE SCHEMA leaderboard;
ALTER SCHEMA leaderboard OWNER TO postgres;

CREATE TABLE leaderboard._metadata (
    key character varying(255) NOT NULL,
    value jsonb,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
ALTER TABLE leaderboard._metadata OWNER TO postgres;

CREATE TABLE leaderboard.account_extrinsic_failed_total_count_histories (
    id TEXT NOT NULL,
    account_id TEXT NOT NULL,
    value NUMERIC NOT NULL,
    last_contribution_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    block_id TEXT NOT NULL,
    block_height NUMERIC NOT NULL,
    extrinsic_id TEXT NOT NULL,
    event_id TEXT NOT NULL
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
    block_id TEXT NOT NULL,
    block_height NUMERIC NOT NULL,
    extrinsic_id TEXT NOT NULL,
    event_id TEXT NOT NULL
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
    block_id TEXT NOT NULL,
    block_height NUMERIC NOT NULL,
    extrinsic_id TEXT NOT NULL,
    event_id TEXT NOT NULL
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
    block_id TEXT NOT NULL,
    block_height NUMERIC NOT NULL,
    extrinsic_id TEXT NOT NULL,
    event_id TEXT NOT NULL
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
    block_id TEXT NOT NULL,
    block_height NUMERIC NOT NULL,
    extrinsic_id TEXT NOT NULL,
    event_id TEXT NOT NULL
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
    block_id TEXT NOT NULL,
    block_height NUMERIC NOT NULL,
    extrinsic_id TEXT NOT NULL,
    event_id TEXT NOT NULL
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
    block_id TEXT NOT NULL,
    block_height NUMERIC NOT NULL,
    extrinsic_id TEXT NOT NULL,
    event_id TEXT NOT NULL
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
    block_id TEXT NOT NULL,
    block_height NUMERIC NOT NULL,
    extrinsic_id TEXT NOT NULL,
    event_id TEXT NOT NULL
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
    block_id TEXT NOT NULL,
    block_height NUMERIC NOT NULL,
    extrinsic_id TEXT NOT NULL,
    event_id TEXT NOT NULL
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
    block_id TEXT NOT NULL,
    block_height NUMERIC NOT NULL,
    extrinsic_id TEXT NOT NULL,
    event_id TEXT NOT NULL
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
    block_id TEXT NOT NULL,
    block_height NUMERIC NOT NULL,
    extrinsic_id TEXT NOT NULL,
    event_id TEXT NOT NULL
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
    block_id TEXT NOT NULL,
    block_height NUMERIC NOT NULL,
    extrinsic_id TEXT NOT NULL,
    event_id TEXT NOT NULL
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
    block_id TEXT NOT NULL,
    block_height NUMERIC NOT NULL,
    extrinsic_id TEXT NOT NULL,
    event_id TEXT NOT NULL
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
    block_id TEXT NOT NULL,
    block_height NUMERIC NOT NULL,
    extrinsic_id TEXT NOT NULL,
    event_id TEXT NOT NULL
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
    block_id TEXT NOT NULL,
    block_height NUMERIC NOT NULL,
    extrinsic_id TEXT NOT NULL,
    event_id TEXT NOT NULL
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
    block_id TEXT NOT NULL,
    block_height NUMERIC NOT NULL,
    extrinsic_id TEXT NOT NULL,
    event_id TEXT NOT NULL
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
    block_id TEXT NOT NULL,
    block_height NUMERIC NOT NULL,
    extrinsic_id TEXT NOT NULL,
    event_id TEXT NOT NULL
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
    block_id TEXT NOT NULL,
    block_height NUMERIC NOT NULL,
    extrinsic_id TEXT NOT NULL,
    event_id TEXT NOT NULL
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
    block_id TEXT NOT NULL,
    block_height NUMERIC NOT NULL,
    extrinsic_id TEXT NOT NULL,
    event_id TEXT NOT NULL
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
    block_id TEXT NOT NULL,
    block_height NUMERIC NOT NULL,
    extrinsic_id TEXT NOT NULL,
    event_id TEXT NOT NULL
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
    block_id TEXT NOT NULL,
    block_height NUMERIC NOT NULL,
    extrinsic_id TEXT NOT NULL,
    event_id TEXT NOT NULL
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
    block_id TEXT NOT NULL,
    block_height NUMERIC NOT NULL,
    extrinsic_id TEXT NOT NULL,
    event_id TEXT NOT NULL
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
    block_id TEXT NOT NULL,
    block_height NUMERIC NOT NULL,
    extrinsic_id TEXT NOT NULL,
    event_id TEXT NOT NULL
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
    block_id TEXT NOT NULL,
    block_height NUMERIC NOT NULL,
    extrinsic_id TEXT NOT NULL,
    event_id TEXT NOT NULL
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
    block_id TEXT NOT NULL,
    block_height NUMERIC NOT NULL,
    extrinsic_id TEXT NOT NULL,
    event_id TEXT NOT NULL
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
    block_id TEXT NOT NULL,
    block_height NUMERIC NOT NULL,
    extrinsic_id TEXT NOT NULL,
    event_id TEXT NOT NULL
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

ALTER TABLE ONLY leaderboard._metadata
    ADD CONSTRAINT _metadata_pkey PRIMARY KEY (key);

ALTER TABLE ONLY leaderboard.account_extrinsic_failed_total_count_histories
    ADD CONSTRAINT account_extrinsic_failed_total_count_histories_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.account_extrinsic_failed_total_counts
    ADD CONSTRAINT account_extrinsic_failed_total_counts_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.account_extrinsic_success_total_count_histories
    ADD CONSTRAINT account_extrinsic_success_total_count_histories_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.account_extrinsic_success_total_counts
    ADD CONSTRAINT account_extrinsic_success_total_counts_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.account_extrinsic_total_count_histories
    ADD CONSTRAINT account_extrinsic_total_count_histories_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.account_extrinsic_total_counts
    ADD CONSTRAINT account_extrinsic_total_counts_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.account_remark_count_histories
    ADD CONSTRAINT account_remark_count_histories_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.account_remark_counts
    ADD CONSTRAINT account_remark_counts_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.account_transaction_fee_paid_total_value_histories
    ADD CONSTRAINT account_transaction_fee_paid_total_value_histories_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.account_transaction_fee_paid_total_values
    ADD CONSTRAINT account_transaction_fee_paid_total_values_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.account_transfer_receiver_total_count_histories
    ADD CONSTRAINT account_transfer_receiver_total_count_histories_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.account_transfer_receiver_total_counts
    ADD CONSTRAINT account_transfer_receiver_total_counts_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.account_transfer_receiver_total_value_histories
    ADD CONSTRAINT account_transfer_receiver_total_value_histories_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.account_transfer_receiver_total_values
    ADD CONSTRAINT account_transfer_receiver_total_values_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.account_transfer_sender_total_count_histories
    ADD CONSTRAINT account_transfer_sender_total_count_histories_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.account_transfer_sender_total_counts
    ADD CONSTRAINT account_transfer_sender_total_counts_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.account_transfer_sender_total_value_histories
    ADD CONSTRAINT account_transfer_sender_total_value_histories_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.account_transfer_sender_total_values
    ADD CONSTRAINT account_transfer_sender_total_values_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.farmer_block_total_count_histories
    ADD CONSTRAINT farmer_block_total_count_histories_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.farmer_block_total_counts
    ADD CONSTRAINT farmer_block_total_counts_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.farmer_block_total_value_histories
    ADD CONSTRAINT farmer_block_total_value_histories_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.farmer_block_total_values
    ADD CONSTRAINT farmer_block_total_values_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.farmer_vote_and_block_total_count_histories
    ADD CONSTRAINT farmer_vote_and_block_total_count_histories_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.farmer_vote_and_block_total_counts
    ADD CONSTRAINT farmer_vote_and_block_total_counts_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.farmer_vote_and_block_total_value_histories
    ADD CONSTRAINT farmer_vote_and_block_total_value_histories_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.farmer_vote_and_block_total_values
    ADD CONSTRAINT farmer_vote_and_block_total_values_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.farmer_vote_total_count_histories
    ADD CONSTRAINT farmer_vote_total_count_histories_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.farmer_vote_total_counts
    ADD CONSTRAINT farmer_vote_total_counts_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.farmer_vote_total_value_histories
    ADD CONSTRAINT farmer_vote_total_value_histories_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.farmer_vote_total_values
    ADD CONSTRAINT farmer_vote_total_values_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.nominator_deposits_total_count_histories
    ADD CONSTRAINT nominator_deposits_total_count_histories_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.nominator_deposits_total_counts
    ADD CONSTRAINT nominator_deposits_total_counts_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.nominator_deposits_total_value_histories
    ADD CONSTRAINT nominator_deposits_total_value_histories_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.nominator_deposits_total_values
    ADD CONSTRAINT nominator_deposits_total_values_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.nominator_withdrawals_total_count_histories
    ADD CONSTRAINT nominator_withdrawals_total_count_histories_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.nominator_withdrawals_total_counts
    ADD CONSTRAINT nominator_withdrawals_total_counts_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.nominator_withdrawals_total_value_histories
    ADD CONSTRAINT nominator_withdrawals_total_value_histories_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.nominator_withdrawals_total_values
    ADD CONSTRAINT nominator_withdrawals_total_values_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.operator_bundle_total_count_histories
    ADD CONSTRAINT operator_bundle_total_count_histories_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.operator_bundle_total_counts
    ADD CONSTRAINT operator_bundle_total_counts_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.operator_deposits_total_count_histories
    ADD CONSTRAINT operator_deposits_total_count_histories_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.operator_deposits_total_counts
    ADD CONSTRAINT operator_deposits_total_counts_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.operator_deposits_total_value_histories
    ADD CONSTRAINT operator_deposits_total_value_histories_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.operator_deposits_total_values
    ADD CONSTRAINT operator_deposits_total_values_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.operator_total_rewards_collected_histories
    ADD CONSTRAINT operator_total_rewards_collected_histories_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.operator_total_rewards_collecteds
    ADD CONSTRAINT operator_total_rewards_collecteds_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.operator_total_tax_collected_histories
    ADD CONSTRAINT operator_total_tax_collected_histories_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.operator_total_tax_collecteds
    ADD CONSTRAINT operator_total_tax_collecteds_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.operator_withdrawals_total_count_histories
    ADD CONSTRAINT operator_withdrawals_total_count_histories_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.operator_withdrawals_total_counts
    ADD CONSTRAINT operator_withdrawals_total_counts_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.operator_withdrawals_total_value_histories
    ADD CONSTRAINT operator_withdrawals_total_value_histories_pkey PRIMARY KEY (id);

ALTER TABLE ONLY leaderboard.operator_withdrawals_total_values
    ADD CONSTRAINT operator_withdrawals_total_values_pkey PRIMARY KEY (id);

CREATE INDEX nominator_deposits_total_counts_rank ON leaderboard.nominator_deposits_total_counts USING btree (rank);
CREATE INDEX farmer_block_total_value_histories_id ON leaderboard.farmer_block_total_value_histories USING btree (id);
CREATE INDEX farmer_block_total_value_histories_account_id ON leaderboard.farmer_block_total_value_histories USING btree (account_id);
CREATE INDEX farmer_vote_total_counts_value ON leaderboard.farmer_vote_total_counts USING btree (value);
CREATE INDEX farmer_block_total_counts_value ON leaderboard.farmer_block_total_counts USING btree (value);
CREATE INDEX nominator_deposits_total_values_rank ON leaderboard.nominator_deposits_total_values USING btree (rank);
CREATE INDEX farmer_vote_total_value_histories_id ON leaderboard.farmer_vote_total_value_histories USING btree (id);
CREATE INDEX farmer_vote_total_value_histories_account_id ON leaderboard.farmer_vote_total_value_histories USING btree (account_id);
CREATE INDEX farmer_vote_total_counts_rank ON leaderboard.farmer_vote_total_counts USING btree (rank);
CREATE INDEX operator_withdrawals_total_value_histories_id ON leaderboard.operator_withdrawals_total_value_histories USING btree (id);
CREATE INDEX operator_withdrawals_total_value_histories_account_id ON leaderboard.operator_withdrawals_total_value_histories USING btree (account_id);
CREATE INDEX operator_withdrawals_total_values_id ON leaderboard.operator_withdrawals_total_values USING btree (id);
CREATE INDEX operator_withdrawals_total_values_rank ON leaderboard.operator_withdrawals_total_values USING btree (rank);
CREATE INDEX operator_withdrawals_total_values_value ON leaderboard.operator_withdrawals_total_values USING btree (value);
CREATE INDEX operator_total_rewards_collected_histories_id ON leaderboard.operator_total_rewards_collected_histories USING btree (id);
CREATE INDEX operator_total_rewards_collected_histories_account_id ON leaderboard.operator_total_rewards_collected_histories USING btree (account_id);
CREATE INDEX operator_total_tax_collecteds_rank ON leaderboard.operator_total_tax_collecteds USING btree (rank);
CREATE INDEX operator_deposits_total_count_histories_id ON leaderboard.operator_deposits_total_count_histories USING btree (id);
CREATE INDEX operator_deposits_total_count_histories_account_id ON leaderboard.operator_deposits_total_count_histories USING btree (account_id);
CREATE INDEX nominator_withdrawals_total_value_histories_id ON leaderboard.nominator_withdrawals_total_value_histories USING btree (id);
CREATE INDEX nominator_withdrawals_total_value_histories_account_id ON leaderboard.nominator_withdrawals_total_value_histories USING btree (account_id);
CREATE INDEX nominator_withdrawals_total_values_id ON leaderboard.nominator_withdrawals_total_values USING btree (id);
CREATE INDEX nominator_withdrawals_total_values_rank ON leaderboard.nominator_withdrawals_total_values USING btree (rank);
CREATE INDEX nominator_withdrawals_total_values_value ON leaderboard.nominator_withdrawals_total_values USING btree (value);
CREATE INDEX farmer_vote_total_count_histories_id ON leaderboard.farmer_vote_total_count_histories USING btree (id);
CREATE INDEX farmer_vote_total_count_histories_account_id ON leaderboard.farmer_vote_total_count_histories USING btree (account_id);
CREATE INDEX account_transaction_fee_paid_total_values_value ON leaderboard.account_transaction_fee_paid_total_values USING btree (value);
CREATE INDEX operator_bundle_total_counts_value ON leaderboard.operator_bundle_total_counts USING btree (value);
CREATE INDEX operator_total_rewards_collecteds_value ON leaderboard.operator_total_rewards_collecteds USING btree (value);
CREATE INDEX farmer_block_total_counts_rank ON leaderboard.farmer_block_total_counts USING btree (rank);
CREATE INDEX operator_deposits_total_values_value ON leaderboard.operator_deposits_total_values USING btree (value);
CREATE INDEX operator_bundle_total_counts_rank ON leaderboard.operator_bundle_total_counts USING btree (rank);
CREATE INDEX operator_withdrawals_total_count_histories_id ON leaderboard.operator_withdrawals_total_count_histories USING btree (id);
CREATE INDEX operator_withdrawals_total_count_histories_account_id ON leaderboard.operator_withdrawals_total_count_histories USING btree (account_id);
CREATE INDEX account_transfer_receiver_total_values_rank ON leaderboard.account_transfer_receiver_total_values USING btree (rank);
CREATE INDEX operator_deposits_total_counts_value ON leaderboard.operator_deposits_total_counts USING btree (value);
CREATE INDEX farmer_vote_total_values_rank ON leaderboard.farmer_vote_total_values USING btree (rank);
CREATE INDEX account_transfer_sender_total_values_value ON leaderboard.account_transfer_sender_total_values USING btree (value);
CREATE INDEX account_remark_counts_value ON leaderboard.account_remark_counts USING btree (value);
CREATE INDEX farmer_vote_and_block_total_counts_rank ON leaderboard.farmer_vote_and_block_total_counts USING btree (rank);
CREATE INDEX account_extrinsic_failed_total_counts_rank ON leaderboard.account_extrinsic_failed_total_counts USING btree (rank);
CREATE INDEX farmer_block_total_values_value ON leaderboard.farmer_block_total_values USING btree (value);
CREATE INDEX nominator_withdrawals_total_counts_value ON leaderboard.nominator_withdrawals_total_counts USING btree (value);
CREATE INDEX account_transfer_receiver_total_values_value ON leaderboard.account_transfer_receiver_total_values USING btree (value);
CREATE INDEX farmer_vote_and_block_total_values_value ON leaderboard.farmer_vote_and_block_total_values USING btree (value);
CREATE INDEX account_transaction_fee_paid_total_value_histories_id ON leaderboard.account_transaction_fee_paid_total_value_histories USING btree (id);
CREATE INDEX account_transaction_fee_paid_total_value_histories_account_id ON leaderboard.account_transaction_fee_paid_total_value_histories USING btree (account_id);
CREATE INDEX operator_deposits_total_value_histories_id ON leaderboard.operator_deposits_total_value_histories USING btree (id);
CREATE INDEX operator_deposits_total_value_histories_account_id ON leaderboard.operator_deposits_total_value_histories USING btree (account_id);
CREATE INDEX farmer_block_total_count_histories_id ON leaderboard.farmer_block_total_count_histories USING btree (id);
CREATE INDEX farmer_block_total_count_histories_account_id ON leaderboard.farmer_block_total_count_histories USING btree (account_id);
CREATE INDEX account_transfer_sender_total_count_histories_id ON leaderboard.account_transfer_sender_total_count_histories USING btree (id);
CREATE INDEX account_transfer_sender_total_count_histories_account_id ON leaderboard.account_transfer_sender_total_count_histories USING btree (account_id);
CREATE INDEX account_transfer_receiver_total_value_histories_id ON leaderboard.account_transfer_receiver_total_value_histories USING btree (id);
CREATE INDEX account_transfer_receiver_total_value_histories_account_id ON leaderboard.account_transfer_receiver_total_value_histories USING btree (account_id);
CREATE INDEX nominator_deposits_total_count_histories_id ON leaderboard.nominator_deposits_total_count_histories USING btree (id);
CREATE INDEX nominator_deposits_total_count_histories_account_id ON leaderboard.nominator_deposits_total_count_histories USING btree (account_id);
CREATE INDEX farmer_block_total_values_rank ON leaderboard.farmer_block_total_values USING btree (rank);
CREATE INDEX account_transfer_sender_total_counts_value ON leaderboard.account_transfer_sender_total_counts USING btree (value);
CREATE INDEX operator_withdrawals_total_counts_value ON leaderboard.operator_withdrawals_total_counts USING btree (value);
CREATE INDEX account_transfer_receiver_total_count_histories_id ON leaderboard.account_transfer_receiver_total_count_histories USING btree (id);
CREATE INDEX account_transfer_receiver_total_count_histories_account_id ON leaderboard.account_transfer_receiver_total_count_histories USING btree (account_id);
CREATE INDEX account_extrinsic_total_count_histories_id ON leaderboard.account_extrinsic_total_count_histories USING btree (id);
CREATE INDEX account_extrinsic_total_count_histories_account_id ON leaderboard.account_extrinsic_total_count_histories USING btree (account_id);
CREATE INDEX farmer_vote_and_block_total_count_histories_id ON leaderboard.farmer_vote_and_block_total_count_histories USING btree (id);
CREATE INDEX farmer_vote_and_block_total_count_histories_account_id ON leaderboard.farmer_vote_and_block_total_count_histories USING btree (account_id);
CREATE INDEX nominator_deposits_total_counts_value ON leaderboard.nominator_deposits_total_counts USING btree (value);
CREATE INDEX nominator_deposits_total_values_value ON leaderboard.nominator_deposits_total_values USING btree (value);
CREATE INDEX farmer_vote_total_values_value ON leaderboard.farmer_vote_total_values USING btree (value);
CREATE INDEX account_transfer_receiver_total_counts_value ON leaderboard.account_transfer_receiver_total_counts USING btree (value);
CREATE INDEX operator_total_rewards_collecteds_rank ON leaderboard.operator_total_rewards_collecteds USING btree (rank);
CREATE INDEX account_remark_count_histories_id ON leaderboard.account_remark_count_histories USING btree (id);
CREATE INDEX account_remark_count_histories_account_id ON leaderboard.account_remark_count_histories USING btree (account_id);
CREATE INDEX account_transfer_sender_total_values_rank ON leaderboard.account_transfer_sender_total_values USING btree (rank);
CREATE INDEX farmer_vote_and_block_total_values_rank ON leaderboard.farmer_vote_and_block_total_values USING btree (rank);
CREATE INDEX nominator_withdrawals_total_counts_rank ON leaderboard.nominator_withdrawals_total_counts USING btree (rank);
CREATE INDEX operator_total_tax_collecteds_value ON leaderboard.operator_total_tax_collecteds USING btree (value);
CREATE INDEX account_extrinsic_success_total_counts_rank ON leaderboard.account_extrinsic_success_total_counts USING btree (rank);
CREATE INDEX account_extrinsic_success_total_counts_value ON leaderboard.account_extrinsic_success_total_counts USING btree (value);
CREATE INDEX account_extrinsic_total_counts_rank ON leaderboard.account_extrinsic_total_counts USING btree (rank);
CREATE INDEX nominator_withdrawals_total_count_histories_id ON leaderboard.nominator_withdrawals_total_count_histories USING btree (id);
CREATE INDEX nominator_withdrawals_total_count_histories_account_id ON leaderboard.nominator_withdrawals_total_count_histories USING btree (account_id);
CREATE INDEX nominator_deposits_total_value_histories_id ON leaderboard.nominator_deposits_total_value_histories USING btree (id);
CREATE INDEX nominator_deposits_total_value_histories_account_id ON leaderboard.nominator_deposits_total_value_histories USING btree (account_id);
CREATE INDEX operator_deposits_total_counts_rank ON leaderboard.operator_deposits_total_counts USING btree (rank);
CREATE INDEX farmer_vote_and_block_total_value_histories_id ON leaderboard.farmer_vote_and_block_total_value_histories USING btree (id);
CREATE INDEX farmer_vote_and_block_total_value_histories_account_id ON leaderboard.farmer_vote_and_block_total_value_histories USING btree (account_id);
CREATE INDEX farmer_vote_and_block_total_counts_value ON leaderboard.farmer_vote_and_block_total_counts USING btree (value);
CREATE INDEX operator_bundle_total_count_histories_id ON leaderboard.operator_bundle_total_count_histories USING btree (id);
CREATE INDEX operator_bundle_total_count_histories_account_id ON leaderboard.operator_bundle_total_count_histories USING btree (account_id);
CREATE INDEX operator_deposits_total_values_rank ON leaderboard.operator_deposits_total_values USING btree (rank);
CREATE INDEX account_transaction_fee_paid_total_values_rank ON leaderboard.account_transaction_fee_paid_total_values USING btree (rank);
CREATE INDEX account_extrinsic_failed_total_counts_value ON leaderboard.account_extrinsic_failed_total_counts USING btree (value);
CREATE INDEX operator_total_tax_collected_histories_id ON leaderboard.operator_total_tax_collected_histories USING btree (id);
CREATE INDEX operator_total_tax_collected_histories_account_id ON leaderboard.operator_total_tax_collected_histories USING btree (account_id);
CREATE INDEX account_extrinsic_total_counts_value ON leaderboard.account_extrinsic_total_counts USING btree (value);
CREATE INDEX account_extrinsic_success_total_count_histories_id ON leaderboard.account_extrinsic_success_total_count_histories USING btree (id);
CREATE INDEX account_extrinsic_success_total_count_histories_account_id ON leaderboard.account_extrinsic_success_total_count_histories USING btree (account_id);
CREATE INDEX account_transfer_sender_total_value_histories_id ON leaderboard.account_transfer_sender_total_value_histories USING btree (id);
CREATE INDEX account_transfer_sender_total_value_histories_account_id ON leaderboard.account_transfer_sender_total_value_histories USING btree (account_id);
CREATE INDEX account_transfer_sender_total_counts_rank ON leaderboard.account_transfer_sender_total_counts USING btree (rank);
CREATE INDEX account_transfer_receiver_total_counts_rank ON leaderboard.account_transfer_receiver_total_counts USING btree (rank);
CREATE INDEX account_extrinsic_failed_total_count_histories_id ON leaderboard.account_extrinsic_failed_total_count_histories USING btree (id);
CREATE INDEX account_extrinsic_failed_total_count_histories_account_id ON leaderboard.account_extrinsic_failed_total_count_histories USING btree (account_id);
CREATE INDEX account_remark_counts_rank ON leaderboard.account_remark_counts USING btree (rank);