CREATE SCHEMA staking;
ALTER SCHEMA staking OWNER TO postgres;

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

-- _metadata
CREATE TABLE staking._metadata (
    key character varying(255) NOT NULL,
    value jsonb,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
ALTER TABLE staking._metadata OWNER TO postgres;

-- bundle_submissions
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

-- nominator_deposits
CREATE TABLE staking.nominator_deposits (
    id text NOT NULL,
    account_id text NOT NULL,
    operator_id text NOT NULL,
    domain_id text NOT NULL,
    known_shares numeric NOT NULL,
    known_storage_fee_deposit numeric NOT NULL,
    pending_amount numeric NOT NULL,
    pending_storage_fee_deposit numeric NOT NULL,
    pending_effective_domain_epoch numeric NOT NULL,
    extrinsic_ids text NOT NULL,
    event_ids text NOT NULL,
    timestamp timestamp with time zone NOT NULL,
    block_heights text NOT NULL,
    block_height numeric NOT NULL,
    processed boolean NOT NULL DEFAULT false,
    _id uuid NOT NULL,
    _block_range int8range NOT NULL
);
ALTER TABLE staking.nominator_deposits OWNER TO postgres;


-- domain_block_histories
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



-- domain_instantiations
CREATE TABLE staking.domain_instantiations (
    id text NOT NULL,
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

-- domain_staking_histories
CREATE TABLE staking.domain_staking_histories (
    id text NOT NULL,
    domain_id text NOT NULL,
    current_epoch_index integer NOT NULL,
    current_total_stake numeric NOT NULL,
    timestamp timestamp with time zone NOT NULL,
    block_height numeric NOT NULL,
    _id uuid NOT NULL,
    _block_range int8range NOT NULL
);
ALTER TABLE staking.domain_staking_histories OWNER TO postgres;



-- domains schema  - this schema doesn't exist in graphql schema
CREATE TABLE staking.domains (
    id text NOT NULL,
    account_id text NOT NULL,
    name text NOT NULL,
    runtime_id text NOT NULL,
    runtime text NOT NULL,
    runtime_info text NOT NULL,
    total_deposits numeric NOT NULL,
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
    accumulated_epoch_storage_fee_deposit numeric NOT NULL,
    accumulated_epoch_rewards numeric NOT NULL,
    accumulated_epoch_shares numeric NOT NULL,
    reward_count numeric NOT NULL,
    extrinsic_id text NOT NULL,
    created_at numeric NOT NULL,
    updated_at numeric NOT NULL
);
ALTER TABLE staking.domains OWNER TO postgres;



-- nominator schema  - this schema doesn't exist in graphql schema
CREATE TABLE staking.nominators (
    id text NOT NULL,
    account_id text NOT NULL,
    domain_id text NOT NULL,
    operator_id text NOT NULL,
    total_deposits numeric NOT NULL,
    total_withdrawals numeric NOT NULL,
    known_shares numeric NOT NULL,
    known_storage_fee_deposit numeric NOT NULL,
    total_withdrawal_amounts numeric NOT NULL,
    total_storage_fee_refund numeric NOT NULL,
    total_deposits_count numeric NOT NULL,
    total_withdrawals_count numeric NOT NULL,
    unlock_at_confirmed_domain_block_number jsonb NOT NULL,
    status text NOT NULL,
    created_at numeric NOT NULL,
    updated_at numeric NOT NULL
);
ALTER TABLE staking.nominators OWNER TO postgres;



-- operator schema
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

-- operator_rewards
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

-- operator_staking_histories
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

-- operator_tax_collections
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




-- operators  - this schema doesn't exist in graphql schema
CREATE TABLE staking.operators (
    id text NOT NULL,
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




-- runtime_creations
CREATE TABLE staking.runtime_creations (
    id text NOT NULL,
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


-- unlocked_events
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


-- nominators_unlocked_events
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


-- withdraw_events
CREATE TABLE staking.withdraw_events (
    id text NOT NULL,
    account_id text NOT NULL,
    domain_id text NOT NULL,
    operator_id text NOT NULL,
    nominator_id text NOT NULL,
    "timestamp" timestamp with time zone NOT NULL,
    block_height numeric NOT NULL,
    extrinsic_id text NOT NULL,
    event_id text NOT NULL,
    _id uuid NOT NULL,
    _block_range int8range NOT NULL
);
ALTER TABLE staking.withdraw_events OWNER TO postgres;


-- withdrawals - this schema doesn't exist in graphql schema
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
    ADD CONSTRAINT bundle_submissions_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY staking.nominator_deposits
    ADD CONSTRAINT nominator_deposits_pkey PRIMARY KEY (_id);

    
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



-- unlocked_events
CREATE INDEX "0x095f76af1e0896c7" ON staking.unlocked_events USING btree (id);

-- operator_deregistrations
CREATE INDEX "0x17ee75861ab4beba" ON staking.operator_deregistrations USING btree (id);

-- operator_rewards
CREATE INDEX "0x386761c4d1c44502" ON staking.operator_rewards USING btree (id);

-- operator_tax_collections
CREATE INDEX "0x3a7ed99d2776ff11" ON staking.operator_tax_collections USING btree (id);


-- domain_block_histories
CREATE INDEX "0x59e52a1d9c35dee5" ON staking.domain_block_histories USING btree (id);
CREATE INDEX "staking_domain_block_histories_domain_id" ON staking.domain_block_histories USING btree (domain_id);
CREATE INDEX "staking_domain_block_histories_domain_block_height" ON staking.domain_block_histories USING btree (domain_id, block_height DESC);

-- domain_instantiations
CREATE INDEX "0x6414082d1dcaa951" ON staking.domain_instantiations USING btree (id);

-- withdraw_events
CREATE INDEX "0x72774937664e8211" ON staking.withdraw_events USING btree (id);
CREATE INDEX "staking_withdraw_events_domain_id" ON staking.withdraw_events USING btree (domain_id);
CREATE INDEX "staking_withdraw_events_operator_id" ON staking.withdraw_events USING btree (operator_id);
CREATE INDEX "staking_withdraw_events_nominator_id" ON staking.withdraw_events USING btree (nominator_id);


-- nominator_deposits
CREATE INDEX "0x9addf36a4bded44f" ON staking.nominator_deposits USING btree (id);
CREATE INDEX "staking_nominator_deposits_domain_id" ON staking.nominator_deposits USING btree (domain_id);
CREATE INDEX "staking_nominator_deposits_operator_id" ON staking.nominator_deposits USING btree (operator_id);
CREATE INDEX "staking_nominator_deposits_nominator_id" ON staking.nominator_deposits USING btree (nominator_id);


-- operator_registrations
CREATE INDEX "0xa3309c82ddfd9389" ON staking.operator_registrations USING btree (id);

-- operator_staking_histories
CREATE INDEX "0xb23efd2ff4b502c0" ON staking.operator_staking_histories USING btree (id);

-- bundle_submissions
CREATE INDEX "0xb4799973a65fa29b" ON staking.bundle_submissions USING btree (id);

-- domain_staking_histories
CREATE INDEX "0xb67017dc1891f52d" ON staking.domain_staking_histories USING btree (id);

-- runtime_creations
CREATE INDEX "0xd831d19987080dd5" ON staking.runtime_creations USING btree (id);


-- domains
CREATE INDEX "staking_domains_id" ON staking.domains USING btree (id);

-- domains
CREATE INDEX "staking_domains_id_last_domain_block_number" ON staking.domains (id, last_domain_block_number);

-- nominators
CREATE INDEX "staking_nominators_id" ON staking.nominators USING btree (id);
CREATE INDEX "staking_nominators_domain_id" ON staking.nominators USING btree (domain_id);
CREATE INDEX "staking_nominators_operator_id" ON staking.nominators USING btree (operator_id);
CREATE INDEX "staking_nominators_status" ON staking.nominators USING btree ("status");

-- operators
CREATE INDEX "staking_operators_id" ON staking.operators USING btree (id);
CREATE INDEX "staking_operators_domain_id" ON staking.operators USING btree (domain_id);
CREATE INDEX "staking_operators_status" ON staking.operators USING btree ("status");

-- withdrawals
CREATE INDEX "staking_withdrawals_id" ON staking.withdrawals USING btree (id);
CREATE INDEX "staking_withdrawals_domain_id" ON staking.withdrawals USING btree (domain_id);
CREATE INDEX "staking_withdrawals_operator_id" ON staking.withdrawals USING btree (operator_id);
CREATE INDEX "staking_withdrawals_nominator_id" ON staking.withdrawals USING btree (nominator_id);
CREATE INDEX "staking_withdrawals_status" ON staking.withdrawals USING btree ("status");
CREATE INDEX "staking_withdrawals_status_domain_block_number_withdrawal_requested_at" ON staking.withdrawals (status, domain_block_number_withdrawal_requested_at);

CREATE TRIGGER "0x36531371aced88b2" AFTER UPDATE ON staking._metadata FOR EACH ROW WHEN (((new.key)::text = 'schemaMigrationCount'::text)) EXECUTE FUNCTION staking.schema_notification();
