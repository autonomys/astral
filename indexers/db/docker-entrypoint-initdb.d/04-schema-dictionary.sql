CREATE SCHEMA dictionary;
ALTER SCHEMA dictionary OWNER TO postgres;

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

CREATE TABLE dictionary._metadata (
    key character varying(255) NOT NULL,
    value jsonb,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
ALTER TABLE dictionary._metadata OWNER TO postgres;

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

ALTER TABLE ONLY dictionary._metadata
    ADD CONSTRAINT _metadata_pkey PRIMARY KEY (key);

ALTER TABLE ONLY dictionary.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);

ALTER TABLE ONLY dictionary.extrinsics
    ADD CONSTRAINT extrinsics_pkey PRIMARY KEY (id);

ALTER TABLE ONLY dictionary.spec_versions
    ADD CONSTRAINT spec_versions_pkey PRIMARY KEY (id);

CREATE INDEX "0x288575ef7a7aaf75" ON dictionary.extrinsics USING btree (module);
CREATE INDEX "0x46e7a495bb4c21d1" ON dictionary.events USING btree (event);
CREATE INDEX "0x57c58da22539b57d" ON dictionary.extrinsics USING btree (block_height);
CREATE INDEX "0x5b57ecd94445ad2e" ON dictionary.extrinsics USING btree (call);
CREATE INDEX "0x62b8f3181611d490" ON dictionary.events USING btree (module);
CREATE INDEX "0xc0c9768d1987b60f" ON dictionary.events USING btree (block_height);

CREATE TRIGGER "0xda8a29b0fa478533" AFTER UPDATE ON dictionary._metadata FOR EACH ROW WHEN (((new.key)::text = 'schemaMigrationCount'::text)) EXECUTE FUNCTION dictionary.schema_notification();
