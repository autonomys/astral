CREATE SCHEMA files;
ALTER SCHEMA files OWNER TO postgres;

CREATE FUNCTION files.schema_notification() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
  BEGIN
    PERFORM pg_notify(
            '0xb1598cb16f4da9c8',
            'schema_updated');
    RETURN NULL;
  END;
  $$;
ALTER FUNCTION files.schema_notification() OWNER TO postgres;

CREATE TABLE files._metadata (
    key character varying(255) NOT NULL,
    value jsonb,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
ALTER TABLE files._metadata OWNER TO postgres;

CREATE TABLE files.chunks (
    id TEXT NOT NULL,
    type TEXT NOT NULL,
    link_depth INTEGER NOT NULL,
    size NUMERIC,
    name TEXT,
    data TEXT,
    upload_options TEXT,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE files.chunks OWNER TO postgres;

CREATE TABLE files.cids (
    id TEXT NOT NULL,
    block_height NUMERIC NOT NULL,
    block_hash TEXT NOT NULL,
    extrinsic_id TEXT NOT NULL,
    extrinsic_hash TEXT NOT NULL,
    index_in_block INTEGER NOT NULL,
    links JSONB NOT NULL,
    blake3_hash TEXT NOT NULL,
    is_archived BOOLEAN NOT NULL,
    "timestamp" TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE files.cids OWNER TO postgres;

CREATE TABLE files.errors (
    id TEXT NOT NULL,
    block_height NUMERIC NOT NULL,
    block_hash TEXT NOT NULL,
    extrinsic_id TEXT NOT NULL,
    extrinsic_hash TEXT NOT NULL,
    index_in_block INTEGER NOT NULL,
    error TEXT NOT NULL,
    "timestamp" TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE files.errors OWNER TO postgres;

CREATE TABLE files.file_cids (
    id TEXT NOT NULL,
    parent_cid TEXT NOT NULL,
    child_cid TEXT NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE files.file_cids OWNER TO postgres;

CREATE TABLE files.files (
    id TEXT NOT NULL,
    sort_id TEXT NOT NULL,
    size NUMERIC NOT NULL,
    name TEXT,
    block_height NUMERIC NOT NULL,
    extrinsic_id TEXT NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE files.files OWNER TO postgres;

CREATE TABLE files.folder_cids (
    id TEXT NOT NULL,
    parent_cid TEXT NOT NULL,
    child_cid TEXT NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE files.folder_cids OWNER TO postgres;

CREATE TABLE files.folders (
    id TEXT NOT NULL,
    sort_id TEXT NOT NULL,
    size NUMERIC NOT NULL,
    name TEXT,
    block_height NUMERIC NOT NULL,
    extrinsic_id TEXT NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE files.folders OWNER TO postgres;

CREATE TABLE files.metadata (
    id TEXT NOT NULL,
    sort_id TEXT NOT NULL,
    size NUMERIC NOT NULL,
    name TEXT,
    block_height NUMERIC NOT NULL,
    extrinsic_id TEXT NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE files.metadata OWNER TO postgres;

CREATE TABLE files.metadata_cids (
    id TEXT NOT NULL,
    parent_cid TEXT NOT NULL,
    child_cid TEXT NOT NULL,
    _id UUID NOT NULL,
    _block_range INT8RANGE NOT NULL
);
ALTER TABLE files.metadata_cids OWNER TO postgres;

ALTER TABLE ONLY files._metadata
    ADD CONSTRAINT _metadata_pkey PRIMARY KEY (key);

ALTER TABLE ONLY files.chunks
    ADD CONSTRAINT chunks_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY files.cids
    ADD CONSTRAINT cids_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY files.errors
    ADD CONSTRAINT errors_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY files.file_cids
    ADD CONSTRAINT file_cids_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY files.files
    ADD CONSTRAINT files_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY files.folder_cids
    ADD CONSTRAINT folder_cids_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY files.folders
    ADD CONSTRAINT folders_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY files.metadata_cids
    ADD CONSTRAINT metadata_cids_pkey PRIMARY KEY (_id);

ALTER TABLE ONLY files.metadata
    ADD CONSTRAINT metadata_pkey PRIMARY KEY (_id);

CREATE INDEX "0x1186578888875727" ON files.folders USING btree (id);
CREATE INDEX "files_folders_block_height" ON files.folders USING btree (block_height);
CREATE INDEX "files_folders_sort_id" ON files.folders USING btree (sort_id DESC);
CREATE INDEX "0x68de2b24ed2b1879" ON files.errors USING btree (id);
CREATE INDEX "0x9831414911f0da25" ON files.files USING btree (id);
CREATE INDEX "files_files_block_height" ON files.files USING btree (block_height);
CREATE INDEX "files_files_sort_id" ON files.files USING btree (sort_id DESC);
CREATE INDEX "0xa00ebe7be447c522" ON files.metadata USING btree (id);
CREATE INDEX "files_metadata_block_height" ON files.metadata USING btree (block_height);
CREATE INDEX "files_metadata_sort_id" ON files.metadata USING btree (sort_id DESC);
CREATE INDEX "0xc48b083269566769" ON files.file_cids USING btree (id);
CREATE INDEX "files_file_cids_parent_cid" ON files.file_cids USING btree (parent_cid);
CREATE INDEX "0xc822e1f44430d2bc" ON files.metadata_cids USING btree (id);
CREATE INDEX "files_metadata_cids_parent_cid" ON files.metadata_cids USING btree (parent_cid);
CREATE INDEX "0xd098303e427172ef" ON files.cids USING btree (id);
CREATE INDEX "files_cids_timestamp" ON files.cids USING btree ("timestamp" DESC);
CREATE INDEX "0xd5509466634aea27" ON files.chunks USING btree (id);
CREATE INDEX "0xd9be8718ef6c7984" ON files.folder_cids USING btree (id);
CREATE INDEX "files_folder_cids_parent_cid" ON files.folder_cids USING btree (parent_cid);

CREATE TRIGGER "0x22152f0c663c5f9e" AFTER UPDATE ON files._metadata FOR EACH ROW WHEN (((new.key)::text = 'schemaMigrationCount'::text)) EXECUTE FUNCTION files.schema_notification();

-- GIST indexes for SubQuery _block_range queries
-- These are critical for performance as SubQuery uses WHERE _block_range @> current_block
CREATE INDEX files_chunks_block_range_gist ON files.chunks USING gist (_block_range);
CREATE INDEX files_cids_block_range_gist ON files.cids USING gist (_block_range);
CREATE INDEX files_errors_block_range_gist ON files.errors USING gist (_block_range);
CREATE INDEX files_file_cids_block_range_gist ON files.file_cids USING gist (_block_range);
CREATE INDEX files_files_block_range_gist ON files.files USING gist (_block_range);
CREATE INDEX files_folder_cids_block_range_gist ON files.folder_cids USING gist (_block_range);
CREATE INDEX files_folders_block_range_gist ON files.folders USING gist (_block_range);
CREATE INDEX files_metadata_block_range_gist ON files.metadata USING gist (_block_range);
CREATE INDEX files_metadata_cids_block_range_gist ON files.metadata_cids USING gist (_block_range);
