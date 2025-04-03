CREATE SCHEMA domain_auto_evm;
ALTER SCHEMA domain_auto_evm OWNER TO postgres;

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

CREATE TABLE domain_auto_evm._metadata (
    key character varying(255) NOT NULL,
    value jsonb,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
ALTER TABLE domain_auto_evm._metadata OWNER TO postgres;

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

CREATE TRIGGER "0x8741811e70475b76" AFTER UPDATE ON domain_auto_evm._metadata FOR EACH ROW WHEN (((new.key)::text = 'schemaMigrationCount'::text)) EXECUTE FUNCTION domain_auto_evm.schema_notification();