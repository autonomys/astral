CREATE SCHEMA files;
ALTER SCHEMA files OWNER TO postgres;

CREATE TABLE files.chunks (
    id TEXT NOT NULL,
    chunk_cid TEXT NOT NULL,
    block_id TEXT NOT NULL,
    block_height NUMERIC NOT NULL,
    block_hash TEXT NOT NULL,
    type TEXT NOT NULL,
    link_depth INTEGER NOT NULL,
    size NUMERIC,
    name TEXT,
    data TEXT,
    upload_options TEXT
);
ALTER TABLE files.chunks OWNER TO postgres;

CREATE TABLE files.cids (
    id TEXT NOT NULL,
    cid TEXT NOT NULL,
    block_id TEXT NOT NULL,
    block_height NUMERIC NOT NULL,
    block_hash TEXT NOT NULL,
    extrinsic_id TEXT NOT NULL,
    extrinsic_hash TEXT NOT NULL,
    index_in_block INTEGER NOT NULL,
    links JSONB NOT NULL,
    blake3_hash TEXT NOT NULL,
    is_archived BOOLEAN NOT NULL,
    "timestamp" TIMESTAMP WITHOUT TIME ZONE NOT NULL
);
ALTER TABLE files.cids OWNER TO postgres;

CREATE TABLE files.errors (
    id TEXT NOT NULL,
    block_id TEXT NOT NULL,
    block_height NUMERIC NOT NULL,
    block_hash TEXT NOT NULL,
    extrinsic_id TEXT NOT NULL,
    extrinsic_hash TEXT NOT NULL,
    index_in_block INTEGER NOT NULL,
    error TEXT NOT NULL,
    "timestamp" TIMESTAMP WITHOUT TIME ZONE NOT NULL
);
ALTER TABLE files.errors OWNER TO postgres;

CREATE TABLE files.file_cids (
    id TEXT NOT NULL,
    block_id TEXT NOT NULL,
    parent_cid TEXT NOT NULL,
    child_cid TEXT NOT NULL
);
ALTER TABLE files.file_cids OWNER TO postgres;

CREATE TABLE files.files (
    id TEXT NOT NULL,
    sort_id TEXT NOT NULL,
    file_cid TEXT NOT NULL,
    block_id TEXT NOT NULL,
    block_height NUMERIC NOT NULL,
    block_hash TEXT NOT NULL,
    extrinsic_id TEXT NOT NULL,
    size NUMERIC NOT NULL,
    name TEXT,
    "timestamp" TIMESTAMP WITHOUT TIME ZONE NOT NULL
);
ALTER TABLE files.files OWNER TO postgres;

CREATE TABLE files.folder_cids (
    id TEXT NOT NULL,
    block_id TEXT NOT NULL,
    parent_cid TEXT NOT NULL,
    child_cid TEXT NOT NULL
);
ALTER TABLE files.folder_cids OWNER TO postgres;

CREATE TABLE files.folders (
    id TEXT NOT NULL,
    sort_id TEXT NOT NULL,
    folder_cid TEXT NOT NULL,
    block_id TEXT NOT NULL,
    block_height NUMERIC NOT NULL,
    block_hash TEXT NOT NULL,
    extrinsic_id TEXT NOT NULL,
    size NUMERIC NOT NULL,
    name TEXT,
    "timestamp" TIMESTAMP WITHOUT TIME ZONE NOT NULL
);
ALTER TABLE files.folders OWNER TO postgres;

CREATE TABLE files.metadata (
    id TEXT NOT NULL,
    sort_id TEXT NOT NULL,
    metadata_cid TEXT NOT NULL,
    block_id TEXT NOT NULL,
    block_height NUMERIC NOT NULL,
    block_hash TEXT NOT NULL,
    extrinsic_id TEXT NOT NULL,
    size NUMERIC NOT NULL,
    name TEXT,
    "timestamp" TIMESTAMP WITHOUT TIME ZONE NOT NULL
);
ALTER TABLE files.metadata OWNER TO postgres;

CREATE TABLE files.metadata_cids (
    id TEXT NOT NULL,
    block_id TEXT NOT NULL,
    parent_cid TEXT NOT NULL,
    child_cid TEXT NOT NULL
);
ALTER TABLE files.metadata_cids OWNER TO postgres;

ALTER TABLE ONLY files._metadata
    ADD CONSTRAINT _metadata_pkey PRIMARY KEY (key);

ALTER TABLE ONLY files.chunks
    ADD CONSTRAINT chunks_pkey PRIMARY KEY (id);

ALTER TABLE ONLY files.cids
    ADD CONSTRAINT cids_pkey PRIMARY KEY (id);

ALTER TABLE ONLY files.errors
    ADD CONSTRAINT errors_pkey PRIMARY KEY (id);

ALTER TABLE ONLY files.file_cids
    ADD CONSTRAINT file_cids_pkey PRIMARY KEY (id);

ALTER TABLE ONLY files.files
    ADD CONSTRAINT files_pkey PRIMARY KEY (id);

ALTER TABLE ONLY files.folder_cids
    ADD CONSTRAINT folder_cids_pkey PRIMARY KEY (id);

ALTER TABLE ONLY files.folders
    ADD CONSTRAINT folders_pkey PRIMARY KEY (id);

ALTER TABLE ONLY files.metadata_cids
    ADD CONSTRAINT metadata_cids_pkey PRIMARY KEY (id);

ALTER TABLE ONLY files.metadata
    ADD CONSTRAINT metadata_pkey PRIMARY KEY (id);

CREATE INDEX files_folders_id ON files.folders USING btree (id);
CREATE INDEX files_folders_folder_cid ON files.folders USING btree (folder_cid);
CREATE INDEX files_folders_block_id ON files.folders USING btree (block_id);
CREATE INDEX files_folders_block_height ON files.folders USING btree (block_height);
CREATE INDEX files_folders_sort_id ON files.folders USING btree (sort_id DESC);
CREATE INDEX files_errors_id ON files.errors USING btree (id);
CREATE INDEX files_files_id ON files.files USING btree (id);
CREATE INDEX files_files_file_cid ON files.files USING btree (file_cid);
CREATE INDEX files_files_block_id ON files.files USING btree (block_id);
CREATE INDEX files_files_block_height ON files.files USING btree (block_height);
CREATE INDEX files_files_sort_id ON files.files USING btree (sort_id DESC);
CREATE INDEX files_metadata_id ON files.metadata USING btree (id);
CREATE INDEX files_metadata_metadata_cid ON files.metadata USING btree (metadata_cid);
CREATE INDEX files_metadata_block_id ON files.metadata USING btree (block_id);
CREATE INDEX files_metadata_block_height ON files.metadata USING btree (block_height);
CREATE INDEX files_metadata_sort_id ON files.metadata USING btree (sort_id DESC);
CREATE INDEX files_file_cids_id ON files.file_cids USING btree (id);
CREATE INDEX files_file_cids_parent_cid ON files.file_cids USING btree (parent_cid);
CREATE INDEX files_metadata_cids_id ON files.metadata_cids USING btree (id);
CREATE INDEX files_metadata_cids_parent_cid ON files.metadata_cids USING btree (parent_cid);
CREATE INDEX files_cids_id ON files.cids USING btree (id);
CREATE INDEX files_cids_cid ON files.cids USING btree (cid);
CREATE INDEX files_cids_block_id ON files.cids USING btree (block_id);
CREATE INDEX files_cids_timestamp ON files.cids USING btree ("timestamp" DESC);
CREATE INDEX files_chunks_id ON files.chunks USING btree (id);
CREATE INDEX files_chunks_chunk_cid ON files.chunks USING btree (chunk_cid);
CREATE INDEX files_chunks_block_id ON files.chunks USING btree (block_id);
CREATE INDEX files_folder_cids_id ON files.folder_cids USING btree (id);
CREATE INDEX files_folder_cids_parent_cid ON files.folder_cids USING btree (parent_cid);