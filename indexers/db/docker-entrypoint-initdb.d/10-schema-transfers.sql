CREATE SCHEMA transfers;
ALTER SCHEMA transfers OWNER TO postgres;

CREATE TABLE transfers.transfers (
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
ALTER TABLE transfers.transfers OWNER TO postgres;

ALTER TABLE ONLY transfers.transfers
    ADD CONSTRAINT transfers_pkey PRIMARY KEY (_id);

CREATE INDEX "transfers_transfers_id" ON transfers.transfers USING btree (id);
CREATE INDEX "transfers_transfers_from" ON transfers.transfers USING btree ("from");
CREATE INDEX "transfers_transfers_to" ON transfers.transfers USING btree ("to");
CREATE INDEX "transfers_transfers_type" ON transfers.transfers USING btree (type);

-- GIST indexes for SubQuery _block_range queries
-- These are critical for performance as SubQuery uses WHERE _block_range @> current_block
CREATE INDEX transfers_transfers_block_range_gist ON transfers.transfers USING gist (_block_range);