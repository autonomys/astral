CREATE SCHEMA transfers;
ALTER SCHEMA transfers OWNER TO postgres;

CREATE TABLE transfers.transfers (
    id TEXT NOT NULL,
    block_id TEXT NOT NULL,
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
    "timestamp" TIMESTAMP WITHOUT TIME ZONE NOT NULL
);
ALTER TABLE transfers.transfers OWNER TO postgres;

ALTER TABLE ONLY transfers.transfers
    ADD CONSTRAINT transfers_pkey PRIMARY KEY (id);

CREATE INDEX "transfers_transfers_id" ON transfers.transfers USING btree (id);
CREATE INDEX "transfers_transfers_from" ON transfers.transfers USING btree ("from");
CREATE INDEX "transfers_transfers_to" ON transfers.transfers USING btree ("to");
CREATE INDEX "transfers_transfers_type" ON transfers.transfers USING btree (type);