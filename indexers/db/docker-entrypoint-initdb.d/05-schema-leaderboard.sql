CREATE SCHEMA leaderboard;
ALTER SCHEMA leaderboard OWNER TO postgres;

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

CREATE TRIGGER "0xf3241711d3af6c36" AFTER UPDATE ON leaderboard._metadata FOR EACH ROW WHEN (((new.key)::text = 'schemaMigrationCount'::text)) EXECUTE FUNCTION leaderboard.schema_notification();
