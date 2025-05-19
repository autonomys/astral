-- Create the consensus__metadata table that the application is looking for
CREATE TABLE IF NOT EXISTS consensus__metadata (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL DEFAULT '{}'
);

-- Insert the lastProcessedHeight record that's being queried
INSERT INTO consensus__metadata (key, value) 
VALUES ('lastProcessedHeight', '"100"')
ON CONFLICT (key) DO UPDATE SET value = '"100"';

-- Track the new table in Hasura
-- Run this after executing SQL:
-- curl -d'{"type":"pg_track_table","args":{"source":"default","table":{"schema":"public","name":"consensus__metadata"}}}' \
--   http://localhost:8080/v1/metadata -H "Content-Type: application/json" -H "X-Hasura-Admin-Secret: helloworld" 